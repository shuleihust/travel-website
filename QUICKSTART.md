# 🚀 快速启动指南

## 1. 安装依赖

```bash
npm install
```

## 2. 配置 Supabase

### 创建 Supabase 项目
1. 访问 https://supabase.com 并登录
2. 点击 "New Project"
3. 填写项目名称、数据库密码等信息

### 执行 SQL Schema
1. 在 Supabase Dashboard 左侧菜单中，点击 "SQL Editor"
2. 点击 "New Query"
3. 复制并粘贴 `supabase-schema.sql` 中的所有内容
4. 点击 "Run" 执行

### 获取 API 密钥
1. 点击左侧菜单 "Settings" > "API"
2. 复制 "Project URL" 和 "anon public" 密钥

## 3. 配置 Stripe

### 创建 Stripe 账户
1. 访问 https://stripe.com 并注册
2. 登录后，确保在 "测试模式" 下

### 获取 API 密钥
1. 点击 "开发者" > "API 密钥"
2. 复制 "可发布密钥" 和 "密钥"

## 4. 创建 .env 文件

在项目根目录创建 `.env` 文件：

```env
# Supabase（从步骤2获取）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe（从步骤3获取）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# JWT Secret（随机生成一个安全的字符串）
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
```

## 5. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 6. 测试流程

### 注册新用户
1. 访问首页，点击 "立即注册"
2. 填写：
   - 姓名：测试用户
   - 邮箱：test@example.com
   - 密码：123456

### 购买套餐
1. 注册成功后会自动跳转到套餐页面
2. 选择任一套餐，点击 "立即购买"

### 测试支付
在 Stripe 支付页面输入：
- 卡号：`4242 4242 4242 4242`
- 过期日期：`12/34`
- CVC：`123`
- 邮编：`12345`

点击 "支付" 完成测试购买

## 7. 验证数据

### 检查用户表
```sql
SELECT * FROM users;
```

### 检查订单表
```sql
SELECT * FROM orders;
```

在 Supabase Dashboard 的 "Table Editor" 中可以直接查看数据。

## 常见问题

**Q: 启动时报错找不到模块？**
A: 删除 `node_modules` 和 `package-lock.json`，重新运行 `npm install`

**Q: Supabase 连接失败？**
A: 检查 `.env` 文件中的 URL 和密钥是否正确，确保没有多余的空格

**Q: Stripe 支付失败？**
A: 确保使用的是测试模式的 API 密钥（以 `pk_test_` 和 `sk_test_` 开头）

**Q: 页面样式显示不正常？**
A: 清除浏览器缓存，重启开发服务器

---

需要帮助？查看完整的 [README.md](./README.md) 文档。

