#!/bin/bash

# EdgeOne Pages 部署脚本
# 用于旅行网站项目

echo "🌍 环球旅行网站 - EdgeOne Pages 部署脚本"
echo "=========================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "📦 步骤 1/4: 安装依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi
echo "✅ 依赖安装完成"
echo ""

echo "🔨 步骤 2/4: 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi
echo "✅ 构建完成"
echo ""

echo "📋 步骤 3/4: 检查构建输出..."
if [ -d ".next" ]; then
    echo "✅ .next 目录存在"
    echo "   构建文件大小："
    du -sh .next
else
    echo "❌ .next 目录不存在"
    exit 1
fi
echo ""

echo "🚀 步骤 4/4: 准备部署..."
echo ""
echo "项目已准备就绪！"
echo ""
echo "📊 部署信息："
echo "  - 构建输出: .next/"
echo "  - 项目类型: Next.js 全栈应用"
echo "  - Node 版本: $(node -v)"
echo ""

echo "🎯 下一步操作："
echo ""
echo "选项 1: 使用 EdgeOne Pages MCP（推荐）"
echo "  - 系统会自动打开浏览器进行授权"
echo "  - 授权完成后会自动部署"
echo ""
echo "选项 2: 手动部署"
echo "  1. 初始化 git: git init"
echo "  2. 提交代码: git add . && git commit -m 'Ready for deployment'"
echo "  3. 推送到 GitHub"
echo "  4. 在 EdgeOne Pages 控制台从 Git 导入项目"
echo ""
echo "选项 3: 使用 Vercel 部署"
echo "  运行: npx vercel"
echo ""

echo "📖 详细部署指南请查看: DEPLOY_GUIDE.md"
echo ""
echo "⚠️  重要提醒："
echo "  1. 部署前请配置环境变量（Supabase、Stripe、JWT Secret）"
echo "  2. 确保已在 Supabase 执行数据库 schema"
echo "  3. 部署后需要配置 Stripe Webhook"
echo ""
echo "✨ 项目准备完成！祝部署顺利！"

