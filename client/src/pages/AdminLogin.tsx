import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [email, setEmail] = useState("deltastars777@gmail.com");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email === "deltastars777@gmail.com" && password === "12345") {
        // Store auth token
        localStorage.setItem("adminToken", "admin_token_" + Date.now());
        localStorage.setItem("adminEmail", email);
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard";
      } else {
        setError(
          isArabic
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : "Invalid email or password"
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center py-12 px-4 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logos/delta-stars-logo.jpg"
            alt="Delta Stars"
            className="h-16 w-auto mx-auto mb-4 rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold text-foreground">
            {isArabic ? "لوحة التحكم" : "Admin Panel"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isArabic ? "نجوم دلتا للتجارة" : "Delta Stars Trading"}
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? "تسجيل الدخول للمدير" : "Admin Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={20} className="text-red-600" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3 text-muted-foreground"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isArabic ? "كلمة المرور" : "Password"}
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-3 text-muted-foreground"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={isArabic ? "كلمة المرور" : "Password"}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {isArabic
                    ? "البريد: deltastars777@gmail.com | كلمة المرور: 12345"
                    : "Email: deltastars777@gmail.com | Password: 12345"}
                </p>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                  {isArabic ? "تذكرني" : "Remember me"}
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? isArabic
                    ? "جاري التحميل..."
                    : "Loading..."
                  : isArabic
                  ? "تسجيل الدخول"
                  : "Login"}
              </Button>

              {/* Info Message */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-600">
                  {isArabic
                    ? "يمكنك تغيير كلمة المرور بعد أول دخول"
                    : "You can change your password after first login"}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          {isArabic
            ? "هذه منصة آمنة محمية بـ HTTPS"
            : "This is a secure platform protected with HTTPS"}
        </p>
      </div>
    </div>
  );
}
