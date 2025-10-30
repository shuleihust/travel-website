# 🌍 环球旅行 - 旅行套餐销售网站

这是一个使用 Next.js 15、Supabase 和 Stripe 构建的旅行套餐销售网站。用户可以注册、登录并购买旅行套餐，支付由 Stripe 处理，用户和订单数据存储在 Supabase 数据库中。

## ✨ 功能特性

- 🔐 用户注册和登录（JWT 认证）
- 🛒 三种旅行套餐选择
  - North American - $1,999
  - Romantic Europe - $2,999
  - Wild Africa - $3,999
- 💳 Stripe 支付集成（沙盒环境）
- 💾 Supabase 数据库存储用户和订单信息
- 📱 响应式设计，支持移动端和桌面端
- 🎨 现代化的 UI 设计（使用 Tailwind CSS）

## 🚀 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **支付**: Stripe
- **认证**: JWT + bcrypt

## 📋 前置要求

在开始之前，请确保您已经：

1. 安装了 Node.js 18+ 和 npm/pnpm/yarn
2. 创建了 [Supabase](https://supabase.com/) 账户和项目
3. 创建了 [Stripe](https://stripe.com/) 账户（测试模式）

## 🔧 安装步骤

### 1. 克隆或进入项目目录

```bash
cd travel-website
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 3. 配置 Supabase 数据库

1. 登录您的 Supabase 控制台
2. 进入 SQL 编辑器
3. 执行 `supabase-schema.sql` 中的 SQL 语句来创建所需的表和触发器

该脚本会创建：
- `users` 表：存储用户信息
- `orders` 表：存储订单信息
- 自动更新时间戳的触发器

### 4. 配置环境变量

复制 `.env.example` 文件为 `.env`：

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，填入您的实际配置：

```env
# Supabase 配置
# 从 Supabase 项目设置 > API 中获取
NEXT_PUBLIC_SUPABASE_URL=你的_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_supabase_anon_key

# Stripe 配置
# 从 Stripe Dashboard > 开发者 > API 密钥中获取（使用测试密钥）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=你的_stripe_publishable_key
STRIPE_SECRET_KEY=你的_stripe_secret_key

# JWT Secret（用于用户认证）
# 可以是任意随机字符串，建议至少 32 位
JWT_SECRET=你的_jwt_secret_密钥_请更改这个值
```

#### 获取 Supabase 配置：

1. 访问 [Supabase Dashboard](https://app.supabase.com/)
2. 选择您的项目
3. 点击左侧菜单的 "Settings" > "API"
4. 复制 "Project URL" 到 `NEXT_PUBLIC_SUPABASE_URL`
5. 复制 "Project API keys" 下的 "anon public" 密钥到 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 获取 Stripe 配置：

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 点击右上角切换到 "测试模式"
3. 点击 "开发者" > "API 密钥"
4. 复制 "可发布密钥" 到 `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. 复制 "密钥" 到 `STRIPE_SECRET_KEY`（需要点击 "显示实时密钥" 按钮）

### 5. 运行开发服务器

```bash
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 📱 使用说明

### 用户注册和登录

1. 访问首页，点击"立即注册"
2. 填写邮箱、密码和姓名（可选）
3. 注册成功后会自动跳转到套餐页面
4. 已注册用户可以直接点击"登录"

### 购买套餐

1. 登录后会自动进入套餐页面
2. 浏览三种不同的旅行套餐
3. 点击"立即购买"按钮
4. 系统会跳转到 Stripe Checkout 页面

### 测试支付

在 Stripe 沙盒环境中，使用以下测试卡号：

- **卡号**: `4242 4242 4242 4242`
- **过期日期**: 任意未来日期（如 `12/34`）
- **CVC**: 任意 3 位数字（如 `123`）
- **邮编**: 任意邮编

支付成功后会跳转到成功页面，订单信息会自动保存到 Supabase 数据库。

## 🗄️ 数据库结构

### users 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| email | VARCHAR(255) | 用户邮箱（唯一） |
| password_hash | VARCHAR(255) | 加密后的密码 |
| full_name | VARCHAR(255) | 用户姓名 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### orders 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户ID（外键） |
| package_name | VARCHAR(255) | 套餐名称 |
| amount | DECIMAL(10,2) | 金额 |
| currency | VARCHAR(3) | 货币类型 |
| stripe_payment_id | VARCHAR(255) | Stripe 支付ID |
| stripe_session_id | VARCHAR(255) | Stripe 会话ID |
| status | VARCHAR(50) | 订单状态 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 🏗️ 项目结构

```
travel-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts    # 注册 API
│   │   │   │   └── login/route.ts       # 登录 API
│   │   │   ├── create-checkout-session/route.ts  # 创建支付会话
│   │   │   └── webhook/route.ts         # Stripe Webhook
│   │   ├── login/page.tsx               # 登录页面
│   │   ├── register/page.tsx            # 注册页面
│   │   ├── packages/page.tsx            # 套餐购买页面
│   │   ├── success/page.tsx             # 支付成功页面
│   │   ├── layout.tsx                   # 根布局
│   │   ├── page.tsx                     # 首页
│   │   └── globals.css                  # 全局样式
│   └── lib/
│       ├── supabase.ts                  # Supabase 客户端
│       ├── stripe.ts                    # Stripe 配置
│       └── auth.ts                      # 认证工具函数
├── supabase-schema.sql                  # 数据库 Schema
├── .env.example                         # 环境变量示例
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🔒 安全注意事项

1. **JWT Secret**: 在生产环境中，请使用强随机字符串作为 `JWT_SECRET`
2. **环境变量**: 永远不要将 `.env` 文件提交到版本控制系统
3. **密码策略**: 建议在生产环境中实施更严格的密码策略
4. **HTTPS**: 在生产环境中务必使用 HTTPS
5. **Stripe Webhook**: 在生产环境中应配置 Stripe Webhook 密钥验证

## 🚢 部署

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量（与 `.env` 文件中的相同）
4. 部署

### Stripe Webhook 配置（生产环境）

1. 在 Stripe Dashboard 中配置 Webhook
2. 设置 Webhook URL: `https://your-domain.com/api/webhook`
3. 选择监听 `checkout.session.completed` 事件
4. 将 Webhook 签名密钥添加到环境变量 `STRIPE_WEBHOOK_SECRET`
5. 取消 `src/app/api/webhook/route.ts` 中的注释代码以启用签名验证

## 🐛 故障排除

### 数据库连接失败

- 检查 Supabase URL 和 API Key 是否正确
- 确认 Supabase 项目状态正常
- 检查网络连接

### Stripe 支付失败

- 确认使用的是测试模式的 API 密钥
- 检查 Stripe Dashboard 中的日志
- 确认测试卡号输入正确

### JWT 认证失败

- 检查 `JWT_SECRET` 环境变量是否设置
- 清除浏览器 localStorage 并重新登录
- 检查 token 是否过期

## 📝 待改进功能

- [ ] 用户个人中心（查看订单历史）
- [ ] 邮件通知系统
- [ ] 密码重置功能
- [ ] 订单详情页面
- [ ] 管理员后台
- [ ] 多语言支持
- [ ] 社交媒体登录

## 📄 许可证

本项目仅供学习和演示使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

如有任何问题，请随时联系我们。祝您使用愉快！🎉

