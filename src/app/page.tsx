import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            🌍 环球旅行
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            探索世界之美，体验不同文化的魅力。我们为您精心准备了多条经典旅行路线。
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              立即注册
            </Link>
            <Link
              href="/login"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              登录
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🗽</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">North American</h3>
              <p className="text-gray-600 mb-4">探索北美洲的壮丽景观</p>
              <p className="text-3xl font-bold text-indigo-600">$1,999</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🗼</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Romantic Europe</h3>
              <p className="text-gray-600 mb-4">漫步浪漫欧洲古城</p>
              <p className="text-3xl font-bold text-indigo-600">$2,999</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🦁</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Wild Africa</h3>
              <p className="text-gray-600 mb-4">狂野非洲探险之旅</p>
              <p className="text-3xl font-bold text-indigo-600">$3,999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

