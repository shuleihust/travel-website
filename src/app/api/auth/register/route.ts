import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码为必填项' },
        { status: 400 }
      );
    }

    // 检查用户是否已存在
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 哈希密码
    const passwordHash = await hashPassword(password);

    // 创建用户
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          full_name: fullName || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('创建用户失败:', error);
      return NextResponse.json(
        { error: '注册失败，请稍后重试' },
        { status: 500 }
      );
    }

    // 生成JWT token
    const token = generateToken(newUser.id, newUser.email);

    return NextResponse.json({
      message: '注册成功',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.full_name,
      },
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

