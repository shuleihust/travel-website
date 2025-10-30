import { NextRequest, NextResponse } from 'next/server';
import { stripe, packages } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: '无效的token' },
        { status: 401 }
      );
    }

    const { packageId } = await request.json();

    // 查找套餐
    const selectedPackage = packages.find((pkg) => pkg.id === packageId);

    if (!selectedPackage) {
      return NextResponse.json(
        { error: '套餐不存在' },
        { status: 404 }
      );
    }

    // 创建订单记录
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: decoded.userId,
          package_name: selectedPackage.name,
          amount: selectedPackage.price,
          currency: selectedPackage.currency,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error('创建订单失败:', orderError);
      return NextResponse.json(
        { error: '创建订单失败' },
        { status: 500 }
      );
    }

    // 创建Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: selectedPackage.currency,
            product_data: {
              name: selectedPackage.name,
              description: selectedPackage.description,
            },
            unit_amount: selectedPackage.price * 100, // Stripe使用分为单位
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/packages`,
      client_reference_id: order.id,
      customer_email: decoded.email,
      metadata: {
        orderId: order.id,
        userId: decoded.userId,
      },
    });

    // 更新订单的session_id
    await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('创建checkout session错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

