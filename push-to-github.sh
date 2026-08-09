#!/bin/bash
# ================================================================
# 🚀 رفع مشروع نجوم دلتا على GitHub آلياً
# شغّل هذا السكريبت مرة واحدة من جهازك
# ================================================================
set -e

REPO_URL="https://github.com/deltastars-com/D.S1.git"
BRANCH="main"

echo ""
echo "🌟 ========================================"
echo "   نجوم دلتا — رفع على GitHub"
echo "========================================="
echo ""

# Check git installed
if ! command -v git &> /dev/null; then
  echo "❌ git غير مثبّت. ثبّته أولاً: https://git-scm.com"
  exit 1
fi

# Check node installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js غير مثبّت. ثبّته من: https://nodejs.org (v20+)"
  exit 1
fi

echo "📁 المجلد الحالي: $(pwd)"
echo ""

# Initialize git if needed
if [ ! -d ".git" ]; then
  echo "🔧 تهيئة git..."
  git init
  git branch -M $BRANCH
fi

# Configure git identity (required)
git config user.email "INFO@DELTASTARS-KSA.COM"
git config user.name "Delta Stars Trading"

# Add remote if not already set
if ! git remote get-url origin &>/dev/null; then
  git remote add origin "$REPO_URL"
  echo "✅ تم إضافة remote: $REPO_URL"
else
  git remote set-url origin "$REPO_URL"
  echo "✅ Remote محدَّث: $REPO_URL"
fi

# Create .gitignore if missing
if [ ! -f ".gitignore" ]; then
cat > .gitignore << 'GITIGNEOF'
node_modules/
dist/
.env
.env.local
env.local
*.jks
*.p12
*.pem
android/
ios/
.capacitor/
*.log
.DS_Store
GITIGNEOF
fi

# Stage everything
echo ""
echo "📦 إضافة الملفات..."
git add -A

# Check if there's anything to commit
if git diff --staged --quiet; then
  echo "⚠️  لا توجد تغييرات جديدة"
else
  echo ""
  echo "📝 إنشاء commit..."
  git commit -m "feat: نجوم دلتا v1.0.0 — إطلاق المتجر الإلكتروني

✅ React 18 + TypeScript + Vite + Tailwind v4
✅ Supabase + Firebase + Gemini AI
✅ Moyasar payment gateway
✅ Authentica.sa OTP/SMS
✅ Google Maps + Capacitor
✅ Netlify Functions (8 serverless functions)
✅ PWA + Service Worker
✅ CodeMagic CI/CD (Android AAB + iOS IPA)
✅ RTL Arabic + i18n support
✅ 67 React components

شركة نجوم دلتا للتجارة | deltastars.store"
fi

echo ""
echo "🚀 رفع على GitHub..."
echo "سيُطلب منك اسم المستخدم وكلمة المرور (أو Personal Access Token)"
echo ""

git push -u origin $BRANCH --force

echo ""
echo "✅ ========================================"
echo "   تم الرفع بنجاح!"
echo "   🔗 $REPO_URL"
echo "========================================="
echo ""
echo "الخطوات التالية:"
echo "1. افتح CodeMagic وابدأ البناء"
echo "2. أضف Variables من ملف signing/CODEMAGIC_ENV_VARS.md"
echo "3. اضغط Start Build"
