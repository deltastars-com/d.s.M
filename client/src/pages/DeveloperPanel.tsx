import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Palette,
  Type,
  Layout,
  FileText,
  Menu,
  Settings,
  Shield,
  LogOut,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
} from 'lucide-react';
import { Link } from 'wouter';

type TabType = 'themes' | 'fonts' | 'sections' | 'pages' | 'navigation' | 'logs' | 'settings';

export default function DeveloperPanel() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('themes');
  const [showForm, setShowForm] = useState(false);

  const tabs = [
    { id: 'themes', label: language === 'ar' ? 'الثيمات' : 'Themes', icon: Palette },
    { id: 'fonts', label: language === 'ar' ? 'الخطوط' : 'Fonts', icon: Type },
    { id: 'sections', label: language === 'ar' ? 'الأقسام' : 'Sections', icon: Layout },
    { id: 'pages', label: language === 'ar' ? 'الصفحات' : 'Pages', icon: FileText },
    { id: 'navigation', label: language === 'ar' ? 'القائمة' : 'Navigation', icon: Menu },
    { id: 'logs', label: language === 'ar' ? 'السجلات' : 'Logs', icon: Shield },
    { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <ArrowLeft className="text-accent cursor-pointer hover:opacity-80 transition" size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {language === 'ar' ? 'لوحة تحكم المطور' : 'Developer Panel'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar'
                  ? 'إدارة شاملة للثيمات والخطوط والصفحات'
                  : 'Complete management of themes, fonts, and pages'}
              </p>
            </div>
          </div>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600/10">
            <LogOut size={20} />
            <span className="hidden sm:inline">{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
          </Button>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-card border border-border rounded-lg mb-8 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-card border border-border rounded-lg p-8">
          {/* Themes Tab */}
          {activeTab === 'themes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {language === 'ar' ? 'إدارة الثيمات' : 'Manage Themes'}
                </h2>
                <Button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'ثيم جديد' : 'New Theme'}
                  </span>
                </Button>
              </div>

              {showForm && (
                <div className="bg-background border border-border rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {language === 'ar' ? 'إنشاء ثيم جديد' : 'Create New Theme'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={language === 'ar' ? 'اسم الثيم' : 'Theme Name'}
                      className="px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                    />
                    <input
                      type="color"
                      className="px-4 py-2 bg-card border border-border rounded-lg cursor-pointer"
                      defaultValue="#22c55e"
                    />
                    <input
                      type="color"
                      className="px-4 py-2 bg-card border border-border rounded-lg cursor-pointer"
                      defaultValue="#16a34a"
                    />
                    <input
                      type="color"
                      className="px-4 py-2 bg-card border border-border rounded-lg cursor-pointer"
                      defaultValue="#84cc16"
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      {language === 'ar' ? 'حفظ' : 'Save'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Themes List */}
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-accent transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500" />
                        <div className="w-8 h-8 rounded-full bg-green-700" />
                        <div className="w-8 h-8 rounded-full bg-lime-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {language === 'ar' ? `الثيم ${i}` : `Theme ${i}`}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'أخضر غامق' : 'Dark Green'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-accent border-accent"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-600"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fonts Tab */}
          {activeTab === 'fonts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {language === 'ar' ? 'إدارة الخطوط' : 'Manage Fonts'}
                </h2>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus size={20} />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'خط جديد' : 'New Font'}
                  </span>
                </Button>
              </div>

              <div className="space-y-3">
                {['Cairo', 'Tajawal', 'Almarai'].map((font) => (
                  <div
                    key={font}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-accent transition"
                  >
                    <div>
                      <h4 style={{ fontFamily: font }} className="text-xl font-semibold text-foreground">
                        {font}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'خط عربي احترافي' : 'Professional Arabic Font'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sections Tab */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {language === 'ar' ? 'إدارة الأقسام' : 'Manage Sections'}
                </h2>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus size={20} />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'قسم جديد' : 'New Section'}
                  </span>
                </Button>
              </div>

              <div className="space-y-3">
                {['Hero', 'Categories', 'Featured Products'].map((section, i) => (
                  <div
                    key={section}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-accent transition"
                  >
                    <div className="flex items-center gap-4">
                      <GripVertical size={20} className="text-muted-foreground cursor-move" />
                      <div>
                        <h4 className="font-semibold text-foreground">{section}</h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'ترتيب: ' : 'Order: '} {i + 1}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pages Tab */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {language === 'ar' ? 'إدارة الصفحات' : 'Manage Pages'}
                </h2>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus size={20} />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'صفحة جديدة' : 'New Page'}
                  </span>
                </Button>
              </div>

              <div className="space-y-3">
                {['About Us', 'Terms & Conditions', 'Privacy Policy'].map((page) => (
                  <div
                    key={page}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-accent transition"
                  >
                    <div>
                      <h4 className="font-semibold text-foreground">{page}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'منشورة' : 'Published'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Tab */}
          {activeTab === 'navigation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {language === 'ar' ? 'إدارة القائمة' : 'Manage Navigation'}
                </h2>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus size={20} />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'عنصر جديد' : 'New Item'}
                  </span>
                </Button>
              </div>

              <div className="space-y-3">
                {['Home', 'Products', 'Track Order', 'Contact'].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-accent transition"
                  >
                    <div className="flex items-center gap-4">
                      <GripVertical size={20} className="text-muted-foreground cursor-move" />
                      <h4 className="font-semibold text-foreground">{item}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                        <Edit size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {language === 'ar' ? 'سجل الأنشطة' : 'Activity Logs'}
              </h2>

              <div className="space-y-2">
                {[
                  { action: 'تم تعديل الثيم', time: '2 ساعة', user: 'المطور' },
                  { action: 'تم إضافة صفحة جديدة', time: '5 ساعات', user: 'المطور' },
                  { action: 'تم تحديث الخطوط', time: 'أمس', user: 'المطور' },
                ].map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-foreground">{log.action}</h4>
                      <p className="text-sm text-muted-foreground">{log.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {language === 'ar' ? 'إعدادات المطور' : 'Developer Settings'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'ar' ? 'مفتاح API' : 'API Key'}
                  </label>
                  <input
                    type="password"
                    value="sk_live_abc123def456"
                    readOnly
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {language === 'ar' ? 'سر API' : 'API Secret'}
                  </label>
                  <input
                    type="password"
                    value="secret_xyz789"
                    readOnly
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {language === 'ar' ? 'نسخ' : 'Copy'}
                  </Button>
                  <Button variant="outline" className="text-yellow-600 border-yellow-600">
                    {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
