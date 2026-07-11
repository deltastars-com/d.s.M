import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Crown,
  Search,
  Filter,
} from "lucide-react";

interface VIPCustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  totalPurchases: number;
  points: number;
  joinDate: string;
  lastPurchase: string;
  isVerified: boolean;
}

const mockVIPCustomers: VIPCustomer[] = [
  {
    id: 1,
    name: "أحمد محمد",
    phone: "+966501234567",
    email: "ahmed@example.com",
    tier: "platinum",
    totalPurchases: 15000,
    points: 1500,
    joinDate: "2024-01-15",
    lastPurchase: "2025-01-10",
    isVerified: true,
  },
  {
    id: 2,
    name: "فاطمة علي",
    phone: "+966502345678",
    email: "fatima@example.com",
    tier: "gold",
    totalPurchases: 8500,
    points: 850,
    joinDate: "2024-03-20",
    lastPurchase: "2025-01-08",
    isVerified: true,
  },
  {
    id: 3,
    name: "محمد سالم",
    phone: "+966503456789",
    email: "mohammad@example.com",
    tier: "silver",
    totalPurchases: 4200,
    points: 420,
    joinDate: "2024-06-10",
    lastPurchase: "2025-01-05",
    isVerified: false,
  },
];

const tierColors: Record<string, string> = {
  bronze: "bg-amber-100 text-amber-800",
  silver: "bg-gray-100 text-gray-800",
  gold: "bg-yellow-100 text-yellow-800",
  platinum: "bg-purple-100 text-purple-800",
};

const tierLabels: Record<string, Record<string, string>> = {
  bronze: { ar: "برونزي", en: "Bronze" },
  silver: { ar: "فضي", en: "Silver" },
  gold: { ar: "ذهبي", en: "Gold" },
  platinum: { ar: "بلاتيني", en: "Platinum" },
};

export default function VIPCustomers() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [customers, setCustomers] = useState(mockVIPCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchTerm) ||
      customer.phone.includes(searchTerm) ||
      customer.email.includes(searchTerm);
    const matchesTier = !selectedTier || customer.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Crown size={40} className="text-yellow-500" />
              {isArabic ? "العملاء VIP" : "VIP Customers"}
            </h1>
            <p className="text-muted-foreground">
              {isArabic
                ? "إدارة حسابات العملاء المميزين"
                : "Manage premium customer accounts"}
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="gap-2"
          >
            <Plus size={20} />
            {isArabic ? "إضافة عميل" : "Add Customer"}
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder={isArabic ? "ابحث عن العميل..." : "Search customer..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Filter by Tier */}
              <div className="flex gap-2">
                <Filter size={18} className="text-muted-foreground mt-2" />
                <select
                  value={selectedTier || ""}
                  onChange={(e) => setSelectedTier(e.target.value || null)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">
                    {isArabic ? "جميع المستويات" : "All Tiers"}
                  </option>
                  {Object.entries(tierLabels).map(([key, labels]) => (
                    <option key={key} value={key}>
                      {isArabic ? labels.ar : labels.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Form (if shown) */}
        {showForm && (
          <Card className="mb-6 border-primary">
            <CardHeader>
              <CardTitle>
                {isArabic ? "إضافة عميل VIP جديد" : "Add New VIP Customer"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={isArabic ? "الاسم" : "Name"}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <input
                  type="tel"
                  placeholder={isArabic ? "رقم الهاتف" : "Phone"}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <input
                  type="email"
                  placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                  {Object.entries(tierLabels).map(([key, labels]) => (
                    <option key={key} value={key}>
                      {isArabic ? labels.ar : labels.en}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  {isArabic ? "حفظ" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  {isArabic ? "إلغاء" : "Cancel"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customers Table */}
        <Card>
          <CardContent className="p-6">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {isArabic ? "لا توجد عملاء" : "No customers found"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">
                        {isArabic ? "الاسم" : "Name"}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        {isArabic ? "الهاتف" : "Phone"}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        {isArabic ? "المستوى" : "Tier"}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        {isArabic ? "المشتريات" : "Purchases"}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        {isArabic ? "النقاط" : "Points"}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        {isArabic ? "الإجراءات" : "Actions"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b border-border hover:bg-muted/50 transition"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-foreground">
                              {customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {customer.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-muted-foreground" />
                            {customer.phone}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              tierColors[customer.tier]
                            }`}
                          >
                            {isArabic
                              ? tierLabels[customer.tier].ar
                              : tierLabels[customer.tier].en}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-primary">
                            {customer.totalPurchases} SAR
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold">{customer.points}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(customer.id)}
                              className="gap-1"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-2">
                {isArabic ? "إجمالي العملاء" : "Total Customers"}
              </p>
              <p className="text-3xl font-bold text-primary">
                {customers.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-2">
                {isArabic ? "إجمالي المشتريات" : "Total Purchases"}
              </p>
              <p className="text-3xl font-bold text-primary">
                {customers
                  .reduce((sum, c) => sum + c.totalPurchases, 0)
                  .toLocaleString()}{" "}
                SAR
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-2">
                {isArabic ? "إجمالي النقاط" : "Total Points"}
              </p>
              <p className="text-3xl font-bold text-primary">
                {customers.reduce((sum, c) => sum + c.points, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-2">
                {isArabic ? "العملاء المتحققين" : "Verified"}
              </p>
              <p className="text-3xl font-bold text-primary">
                {customers.filter((c) => c.isVerified).length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
