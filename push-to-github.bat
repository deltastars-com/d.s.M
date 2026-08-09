@echo off
chcp 65001 >nul
:: ================================================================
:: رفع مشروع نجوم دلتا على GitHub - Windows
:: ================================================================

set REPO_URL=https://github.com/deltastars-com/D.S1.git
set BRANCH=main

echo.
echo  ==========================================
echo    نجوم دلتا - رفع على GitHub
echo  ==========================================
echo.

git config user.email "INFO@DELTASTARS-KSA.COM"
git config user.name "Delta Stars Trading"

if not exist ".git" (
  git init
  git branch -M %BRANCH%
)

git remote remove origin 2>nul
git remote add origin %REPO_URL%

git add -A
git commit -m "feat: Delta Stars v1.0.0 - Production Ready"
git push -u origin %BRANCH% --force

echo.
echo  ✅ تم الرفع بنجاح!
echo  %REPO_URL%
echo.
pause
