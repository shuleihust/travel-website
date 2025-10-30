'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const packages = [
  {
    id: 'north-american',
    name: 'North American',
    price: 1999,
    emoji: '🗽',
    description: '探索北美洲的壮丽景观，体验多元文化的魅力',
    features: [
      '15天深度游',
      '包含纽约、旧金山、洛杉矶',
      '4星级酒店住宿',
      '专业中文导游',
    ],
  },
  {
    id: 'romantic-europe',
    name: 'Romantic Europe',
    price: 2999,
    emoji: '🗼',
    description: '漫步浪漫欧洲，感受千年历史与艺术气息',
    features: [
      '20天经典路线',
      '巴黎、罗马、威尼斯、维也纳',
      '5星级酒店住宿',
      '含所有景点门票',
    ],
  },
  {
    id: 'wild-africa',
    name: 'Wild Africa',
    price: 3999,
    emoji: '🦁',
    description: '狂野非洲探险之旅，与大自然零距离接触',
    features: [
      '12天Safari之旅',
      '肯尼亚、坦桑尼亚国家公园',
      '豪华帐篷酒店',
      '专业野生动物向导',
    ],
  },
];

export default function PackagesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // 检查用户是否登录
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  const handlePurchase = async (packageId: string) => {
    setError('');
    setLoading(packageId);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      // 创建checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ packageId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '创建支付会话失败');
      }

      // 跳转到Stripe Checkout
      const stripe = await stripePromise;
      if (stripe && data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">选择您的旅行套餐</h1>
            <p className="text-gray-600 mt-2">欢迎，{user.fullName || user.email}！</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-gray-700 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            退出登录
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* 套餐列表 */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
                <div className="text-6xl mb-4">{pkg.emoji}</div>
                <h2 className="text-2xl font-bold text-white mb-2">{pkg.name}</h2>
                <div className="text-4xl font-bold text-white">
                  ${pkg.price.toLocaleString()}
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">套餐包含：</h3>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loading === pkg.id}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading === pkg.id ? '处理中...' : '立即购买'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 说明 */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">购买说明</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• 点击"立即购买"后将跳转到安全的Stripe支付页面</li>
            <li>• 我们使用沙盒环境进行测试，您可以使用测试卡号：4242 4242 4242 4242</li>
            <li>• 过期日期：任意未来日期，CVC：任意3位数字</li>
            <li>• 支付成功后，订单信息将自动保存到数据库</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

