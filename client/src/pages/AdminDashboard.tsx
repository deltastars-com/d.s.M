import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Settings,
  LogOut,
  Package,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  lowStockProducts: number;
}

const mockStats: DashboardStats = {
  totalOrders: 156,
  totalRevenue: 45230,
  totalCustomers: 89,
  totalProducts: 91,
  pendingOrders: 12,
  lowStockProducts: 5,
};

export default function AdminDashboard() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [stats, setStats] = useState(mockStats);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      window.location.href = "/admin/login";
    } else {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    window.location.href = "/admin/login";
  };

  if (!isAuthorized) {
    return null;
  }

  const adminEmail = localStorage.getItem("adminEmail") || "Admin";

  const statCards = [
    {
      title: isArabic ? "إجمالي الطلبات" : "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: isArabic ? "الإيرادات" : "Revenue",
      value: `${stats.totalRevenue} SAR`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: isArabic ? "العملاء" : "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: isArabic ? "المنتجات" : "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className={`min-h-screen bg-background ${isArabic ? "rtl" : "ltr"}`}>
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isArabic ? "لوحة التحكم" : "Admin Dashboard"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isArabic ? "مرحباً بك" : "Welcome"}, {adminEmail}
            </p>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut size={18} />
            {isArabic ? "تسجيل الخروج" : "Logout"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alerts */}
        {(stats.pendingOrders > 0 || stats.lowStockProducts > 0) && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    {isArabic ? "تنبيهات مهمة" : "Important Alerts"}
                  </h3>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    {stats.pendingOrders > 0 && (
                      <li>
                        {isArabic
                          ? `لديك ${stats.pendingOrders} طلبات قيد الانتظار`
                          : `You have ${stats.pendingOrders} pending orders`}
                      </li>
                    )}
                    {stats.lowStockProducts > 0 && (
                      <li>
                        {isArabic
                          ? `${stats.lowStockProducts} منتجات بمخزون منخفض`
                          : `${stats.lowStockProducts} products with low stock`}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orders Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart size={20} />
                {isArabic ? "إدارة الطلبات" : "Orders Management"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                {isArabic ? "عرض جميع الطلبات" : "View All Orders"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "الطلبات المعلقة" : "Pending Orders"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "تقارير المبيعات" : "Sales Reports"}
              </Button>
            </CardContent>
          </Card>

          {/* Products Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={20} />
                {isArabic ? "إدارة المنتجات" : "Products Management"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                {isArabic ? "عرض المنتجات" : "View Products"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "إضافة منتج جديد" : "Add New Product"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "إدارة المخزون" : "Manage Inventory"}
              </Button>
            </CardContent>
          </Card>

          {/* Customers Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                {isArabic ? "إدارة العملاء" : "Customers Management"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                {isArabic ? "عرض العملاء" : "View Customers"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "العملاء VIP" : "VIP Customers"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "تقارير العملاء" : "Customer Reports"}
              </Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                {isArabic ? "الإعدادات" : "Settings"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                {isArabic ? "إعدادات النظام" : "System Settings"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "إدارة المستخدمين" : "User Management"}
              </Button>
              <Button className="w-full" variant="outline">
                {isArabic ? "السجلات" : "Audit Logs"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
