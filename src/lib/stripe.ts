import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export const packages = [
  {
    id: 'north-american',
    name: 'North American',
    price: 1999,
    currency: 'usd',
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
    currency: 'usd',
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
    currency: 'usd',
    description: '狂野非洲探险之旅，与大自然零距离接触',
    features: [
      '12天Safari之旅',
      '肯尼亚、坦桑尼亚国家公园',
      '豪华帐篷酒店',
      '专业野生动物向导',
    ],
  },
];

