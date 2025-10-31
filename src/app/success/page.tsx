'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 检查用户是否登录
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // 如果没有session_id，可能是直接访问，重定向到首页
    if (!sessionId) {
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* 成功图标 */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">支付成功！</h1>

        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-4">
            感谢您的购买{user ? `，${user.fullName || user.email}` : ''}！
          </p>
          <p className="text-gray-600">
            您的订单已成功提交，我们已将订单信息保存到数据库。
          </p>
          {sessionId && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">订单会话ID：</p>
              <p className="text-xs text-gray-600 font-mono break-all">{sessionId}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
            <h2 className="font-semibold text-gray-800 mb-3">接下来的步骤：</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <span>我们的旅行顾问将在24小时内通过邮件联系您</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span>请查收确认邮件，其中包含详细的行程安排</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span>如有任何问题，请随时联系我们的客服团队</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/packages"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              继续浏览套餐
            </Link>
            <Link
              href="/"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            期待与您一起开启精彩的旅程！🌍✈️
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
