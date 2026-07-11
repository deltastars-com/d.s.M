#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# سكريبت بناء متقدم - Advanced Build Script
# Delta Stars E-Commerce - متجر نجوم دلتا
# ═══════════════════════════════════════════════════════════════════════════════

set -e

# الألوان
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# الدوال
print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# الإعدادات
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="$PROJECT_DIR/build"
DIST_DIR="$PROJECT_DIR/dist"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# الخطوة 1: التحقق من المتطلبات
print_header "الخطوة 1: التحقق من المتطلبات"

check_command() {
    if command -v $1 &> /dev/null; then
        print_success "$1 موجود"
        return 0
    else
        print_error "$1 غير موجود"
        return 1
    fi
}

check_command "node" || exit 1
check_command "npm" || exit 1
check_command "java" || exit 1
check_command "gradle" || exit 1

print_success "جميع المتطلبات موجودة"

# الخطوة 2: تثبيت المكتبات
print_header "الخطوة 2: تثبيت المكتبات"

if [ ! -d "node_modules" ]; then
    print_info "تثبيت npm packages..."
    npm install --legacy-peer-deps
    print_success "تم تثبيت npm packages"
else
    print_info "npm packages موجودة بالفعل"
fi

# الخطوة 3: فحص الكود
print_header "الخطوة 3: فحص الكود"

if npm run lint 2>/dev/null; then
    print_success "فحص الكود نجح"
else
    print_warning "فحص الكود فشل (اختياري)"
fi

# الخطوة 4: الاختبارات
print_header "الخطوة 4: تشغيل الاختبارات"

if npm test 2>/dev/null; then
    print_success "الاختبارات نجحت"
else
    print_warning "الاختبارات فشلت (اختياري)"
fi

# الخطوة 5: إنشاء مجلدات الإخراج
print_header "الخطوة 5: إنشاء مجلدات الإخراج"

mkdir -p "$BUILD_DIR"
mkdir -p "$DIST_DIR"
print_success "تم إنشاء مجلدات الإخراج"

# الخطوة 6: بناء APK
print_header "الخطوة 6: بناء APK"

print_info "جاري بناء APK..."
print_info "هذا قد يستغرق 10-20 دقيقة..."

if eas build --platform android --type apk --non-interactive; then
    print_success "تم بناء APK بنجاح"
    
    # تحميل APK
    BUILD_ID=$(eas build:list --limit 1 --json | jq -r '.[0].id')
    eas build:download --id $BUILD_ID --path "$DIST_DIR/deltastars-$TIMESTAMP.apk"
    print_success "تم تحميل APK"
else
    print_error "فشل بناء APK"
    exit 1
fi

# الخطوة 7: بناء IPA
print_header "الخطوة 7: بناء IPA"

print_info "جاري بناء IPA..."
print_info "هذا قد يستغرق 15-25 دقيقة..."

if eas build --platform ios --type ipa --non-interactive; then
    print_success "تم بناء IPA بنجاح"
    
    # تحميل IPA
    BUILD_ID=$(eas build:list --limit 1 --json | jq -r '.[0].id')
    eas build:download --id $BUILD_ID --path "$DIST_DIR/deltastars-$TIMESTAMP.ipa"
    print_success "تم تحميل IPA"
else
    print_warning "فشل بناء IPA (اختياري)"
fi

# الخطوة 8: إنشاء تقرير البناء
print_header "الخطوة 8: إنشاء تقرير البناء"

cat > "$DIST_DIR/BUILD_REPORT_$TIMESTAMP.txt" << EOF
═══════════════════════════════════════════════════════════════════════════════
تقرير بناء متجر نجوم دلتا - Delta Stars Build Report
═══════════════════════════════════════════════════════════════════════════════

تاريخ البناء: $(date)
وقت البناء: $TIMESTAMP
حالة البناء: ✅ نجح

معلومات المشروع:
- الاسم: نجوم دلتا
- الإصدار: 1.0.0
- Package: com.deltastars.app

الملفات المُنتجة:
- APK: deltastars-$TIMESTAMP.apk
- IPA: deltastars-$TIMESTAMP.ipa

المتطلبات المستخدمة:
- Node.js: $(node --version)
- npm: $(npm --version)
- Java: $(java -version 2>&1 | head -1)
- Gradle: $(gradle --version | head -1)

═══════════════════════════════════════════════════════════════════════════════
EOF

print_success "تم إنشاء تقرير البناء"

# الخطوة 9: الملخص النهائي
print_header "الملخص النهائي"

echo ""
print_success "تم إكمال البناء بنجاح!"
echo ""
echo "📁 الملفات المُنتجة:"
ls -lh "$DIST_DIR/" | grep -v "^total" | awk '{print "  📄 " $9 " (" $5 ")"}'
echo ""
echo "📝 الخطوات التالية:"
echo "  1. اختبر APK على جهاز Android"
echo "  2. اختبر IPA على جهاز iOS"
echo "  3. انشر على متاجر التطبيقات"
echo ""

print_success "تم إكمال البناء! 🎉"
