# 🚀 EdgeOne Pages 部署指南

## 当前状态

✅ **项目已成功构建！**
- 构建输出位置：`.next/` 目录
- 项目类型：Next.js 15 全栈应用（fullstack）
- 所有页面和 API 路由已编译完成

## 方式一：使用 EdgeOne Pages MCP 部署（推荐）

### 授权步骤

由于 EdgeOne Pages MCP 需要授权，您需要：

1. **在浏览器中完成授权**
   - 系统会自动打开浏览器窗口
   - 使用您的 EdgeOne Pages 账号登录
   - 授权 MCP 访问您的项目

2. **授权完成后重试部署**
   ```bash
   # 授权完成后，系统会自动部署
   ```

### 当前部署配置

```
构建文件夹: /Users/shulei/git/chatbox/travel-website/.next
工作空间: /Users/shulei/git/chatbox/travel-website
项目类型: fullstack (Next.js 全栈应用)
```

## 方式二：手动通过 EdgeOne Pages 控制台部署

### 步骤 1: 准备代码仓库

```bash
cd /Users/shulei/git/chatbox/travel-website

# 初始化 git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - Travel website ready for deployment"

# 推送到 GitHub（替换为您的仓库地址）
git remote add origin https://github.com/your-username/travel-website.git
git branch -M main
git push -u origin main
```

### 步骤 2: 在 EdgeOne Pages 创建项目

1. 访问 [EdgeOne Pages](https://edgeone.ai/zh/products/pages)
2. 点击 "创建项目"
3. 选择 "从 Git 导入"
4. 授权并选择您的 GitHub 仓库
5. 配置构建设置：

```yaml
框架: Next.js
构建命令: npm run build
输出目录: .next
Node 版本: 20.18.0
安装命令: npm install
```

### 步骤 3: 配置环境变量

在 EdgeOne Pages 项目设置中添加以下环境变量：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=你的_supabase_项目_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_supabase_anon_密钥

# Stripe 配置（生产环境请使用 live 密钥）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_你的密钥
STRIPE_SECRET_KEY=sk_test_你的密钥

# JWT Secret（生产环境请使用强随机字符串）
JWT_SECRET=生产环境_强随机字符串_至少32位

# Stripe Webhook Secret（稍后配置）
STRIPE_WEBHOOK_SECRET=whsec_你的webhook密钥
```

### 步骤 4: 部署

点击 "部署" 按钮，EdgeOne Pages 会自动：
1. 克隆您的代码
2. 安装依赖
3. 运行构建
4. 部署到全球边缘网络

## 方式三：使用 Vercel 部署（备选）

如果 EdgeOne Pages 遇到问题，也可以使用 Vercel：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 按照提示操作，选择项目设置
# 添加环境变量（同上）
```

## 部署后配置

### 配置 Stripe Webhook

部署成功后，您需要配置 Stripe Webhook：

1. 获取您的部署 URL（例如：`https://your-project.edgeone.app`）

2. 在 Stripe Dashboard 中：
   - 进入 "开发者" > "Webhooks"
   - 点击 "添加端点"
   - URL: `https://your-project.edgeone.app/api/webhook`
   - 选择事件: `checkout.session.completed`
   - 保存并复制 "签名密钥"

3. 将 Webhook 签名密钥添加到环境变量：
   - 在 EdgeOne Pages 项目设置中添加 `STRIPE_WEBHOOK_SECRET`
   - 重新部署

### 验证部署

访问您的部署 URL：
- ✅ 主页应该正常显示
- ✅ 可以注册新用户
- ✅ 可以登录
- ✅ 可以浏览套餐
- ✅ 可以完成支付（使用测试卡号 4242 4242 4242 4242）

## 环境变量说明

### Supabase 配置

从 Supabase Dashboard 获取：
1. 登录 https://supabase.com
2. 选择项目
3. Settings > API
4. 复制 Project URL 和 anon public key

### Stripe 配置

从 Stripe Dashboard 获取：
1. 登录 https://dashboard.stripe.com
2. 开发者 > API 密钥
3. **测试环境**：使用以 `pk_test_` 和 `sk_test_` 开头的密钥
4. **生产环境**：使用以 `pk_live_` 和 `sk_live_` 开头的密钥

### JWT Secret

生成强随机字符串：
```bash
# 使用 Node.js 生成
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 或使用 OpenSSL
openssl rand -hex 32
```

## 故障排除

### 构建失败

如果构建失败，检查：
- ✅ 所有环境变量是否正确设置
- ✅ Node 版本是否为 20.18.0 或更高
- ✅ package.json 中的依赖版本是否正确

### API 路由 404

如果 API 路由返回 404：
- ✅ 确认项目类型设置为 "fullstack"
- ✅ 检查 EdgeOne Pages 是否支持 Next.js API Routes

### 支付失败

如果支付流程失败：
- ✅ 检查 Stripe 密钥是否正确
- ✅ 确认使用测试模式密钥
- ✅ 查看 Stripe Dashboard 的日志

### 数据库连接失败

如果无法连接 Supabase：
- ✅ 检查 Supabase URL 和密钥是否正确
- ✅ 确认 Supabase 项目状态正常
- ✅ 检查数据库表是否已创建（运行 supabase-schema.sql）

## 生产环境检查清单

部署到生产环境前，请确保：

- [ ] 使用 Stripe **生产模式**密钥（`pk_live_` 和 `sk_live_`）
- [ ] JWT_SECRET 使用强随机字符串（至少 32 位）
- [ ] 配置了 Stripe Webhook 并设置了 STRIPE_WEBHOOK_SECRET
- [ ] Supabase 数据库已执行 schema 脚本
- [ ] 所有环境变量都已正确设置
- [ ] 测试了完整的用户注册、登录、购买流程
- [ ] 配置了自定义域名（可选）
- [ ] 启用了 HTTPS（EdgeOne Pages 自动提供）

## 监控和维护

### 查看日志

在 EdgeOne Pages 控制台：
- 部署日志：查看构建和部署过程
- 运行时日志：查看 API 请求和错误

### 性能监控

- 使用 EdgeOne Pages 内置的性能监控
- 检查页面加载时间
- 监控 API 响应时间

### 定期维护

- 定期更新依赖包：`npm update`
- 检查安全漏洞：`npm audit`
- 备份数据库
- 监控 Stripe 交易

## 获取帮助

如果遇到问题：
1. 查看 EdgeOne Pages 文档
2. 查看项目的 README.md 和 QUICKSTART.md
3. 检查 Stripe 和 Supabase 的文档
4. 查看构建日志和错误信息

---

**当前项目已完成构建，随时可以部署！** 🎉

选择上述任一部署方式，按照步骤操作即可。

