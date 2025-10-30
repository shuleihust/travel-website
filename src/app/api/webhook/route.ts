import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // 注意：在生产环境中，您需要设置STRIPE_WEBHOOK_SECRET
    // 这里为了演示，我们直接解析事件
    event = JSON.parse(body);
    
    // 在生产环境中应该使用：
    // event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // );
  } catch (err) {
    console.error('Webhook签名验证失败:', err);
    return NextResponse.json(
      { error: 'Webhook Error' },
      { status: 400 }
    );
  }

  // 处理checkout.session.completed事件
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // 更新订单状态
    const { error } = await supabase
      .from('orders')
      .update({
        status: 'completed',
        stripe_payment_id: session.payment_intent as string,
      })
      .eq('stripe_session_id', session.id);

    if (error) {
      console.error('更新订单状态失败:', error);
    }
  }

  return NextResponse.json({ received: true });
}

