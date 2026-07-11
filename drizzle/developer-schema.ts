import {
  int,
  varchar,
  text,
  timestamp,
  json,
  boolean,
  mysqlTable,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

/**
 * Developer Panel Schema
 * Manages themes, fonts, pages, sections, and navigation
 */

// Themes Table
export const themes = mysqlTable('themes', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  
  // Color Palette
  primaryColor: varchar('primary_color', { length: 7 }).notNull().default('#22c55e'), // Green
  secondaryColor: varchar('secondary_color', { length: 7 }).notNull().default('#16a34a'),
  accentColor: varchar('accent_color', { length: 7 }).notNull().default('#84cc16'),
  backgroundColor: varchar('background_color', { length: 7 }).notNull().default('#1a1a1a'),
  foregroundColor: varchar('foreground_color', { length: 7 }).notNull().default('#ffffff'),
  mutedColor: varchar('muted_color', { length: 7 }).notNull().default('#666666'),
  
  // Theme Settings
  isDark: boolean('is_dark').default(true).notNull(),
  isActive: boolean('is_active').default(false).notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
  
  // Metadata
  createdBy: int('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type Theme = typeof themes.$inferSelect;
export type InsertTheme = typeof themes.$inferInsert;

// Fonts Table
export const fonts = mysqlTable('fonts', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  fontFamily: varchar('font_family', { length: 255 }).notNull(),
  fontUrl: text('font_url'), // Google Fonts or custom URL
  
  // Font Sizes
  headingSize: varchar('heading_size', { length: 10 }).default('32px'),
  bodySize: varchar('body_size', { length: 10 }).default('16px'),
  smallSize: varchar('small_size', { length: 10 }).default('14px'),
  
  // Font Weights
  headingWeight: varchar('heading_weight', { length: 10 }).default('700'),
  bodyWeight: varchar('body_weight', { length: 10 }).default('400'),
  
  isActive: boolean('is_active').default(false).notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
  
  createdBy: int('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type Font = typeof fonts.$inferSelect;
export type InsertFont = typeof fonts.$inferInsert;

// Store Sections Table
export const storeSections = mysqlTable('store_sections', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  nameAr: varchar('name_ar', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  
  // Section Configuration
  type: mysqlEnum('type', [
    'hero',
    'categories',
    'featured-products',
    'testimonials',
    'newsletter',
    'custom',
  ]).notNull(),
  
  order: int('order').default(0).notNull(),
  isVisible: boolean('is_visible').default(true).notNull(),
  
  // Content
  title: varchar('title', { length: 255 }),
  titleAr: varchar('title_ar', { length: 255 }),
  description: text('description'),
  descriptionAr: text('description_ar'),
  
  // Styling
  backgroundColor: varchar('background_color', { length: 7 }),
  textColor: varchar('text_color', { length: 7 }),
  customCSS: text('custom_css'),
  
  // Metadata
  config: json('config'), // JSON configuration for section
  
  createdBy: int('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type StoreSection = typeof storeSections.$inferSelect;
export type InsertStoreSection = typeof storeSections.$inferInsert;

// Pages Table
export const pages = mysqlTable('pages', {
  id: int('id').autoincrement().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  titleAr: varchar('title_ar', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  
  // Content
  content: text('content').notNull(),
  contentAr: text('content_ar').notNull(),
  
  // SEO
  metaDescription: varchar('meta_description', { length: 255 }),
  metaKeywords: varchar('meta_keywords', { length: 255 }),
  
  // Status
  isPublished: boolean('is_published').default(false).notNull(),
  isVisible: boolean('is_visible').default(true).notNull(),
  
  // Metadata
  createdBy: int('created_by').notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type Page = typeof pages.$inferSelect;
export type InsertPage = typeof pages.$inferInsert;

// Navigation Menu Items Table
export const navigationItems = mysqlTable('navigation_items', {
  id: int('id').autoincrement().primaryKey(),
  label: varchar('label', { length: 255 }).notNull(),
  labelAr: varchar('label_ar', { length: 255 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  
  // Navigation Settings
  order: int('order').default(0).notNull(),
  isVisible: boolean('is_visible').default(true).notNull(),
  icon: varchar('icon', { length: 100 }), // Icon name from lucide-react
  
  // Target
  target: mysqlEnum('target', ['_self', '_blank']).default('_self'),
  
  // Parent (for nested menus)
  parentId: int('parent_id'),
  
  createdBy: int('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type NavigationItem = typeof navigationItems.$inferSelect;
export type InsertNavigationItem = typeof navigationItems.$inferInsert;

// Developer Activity Log Table
export const developerLogs = mysqlTable('developer_logs', {
  id: int('id').autoincrement().primaryKey(),
  developerId: int('developer_id').notNull(),
  
  // Action Details
  action: mysqlEnum('action', [
    'create',
    'update',
    'delete',
    'publish',
    'unpublish',
    'activate',
    'deactivate',
  ]).notNull(),
  
  entityType: mysqlEnum('entity_type', [
    'theme',
    'font',
    'section',
    'page',
    'navigation',
  ]).notNull(),
  
  entityId: int('entity_id'),
  entityName: varchar('entity_name', { length: 255 }),
  
  // Changes
  changes: json('changes'), // JSON of what changed
  oldValues: json('old_values'),
  newValues: json('new_values'),
  
  // Metadata
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DeveloperLog = typeof developerLogs.$inferSelect;
export type InsertDeveloperLog = typeof developerLogs.$inferInsert;

// Developer Settings Table
export const developerSettings = mysqlTable('developer_settings', {
  id: int('id').autoincrement().primaryKey(),
  developerId: int('developer_id').notNull().unique(),
  
  // Preferences
  theme: varchar('theme', { length: 255 }),
  language: varchar('language', { length: 10 }).default('ar'),
  
  // Notifications
  emailNotifications: boolean('email_notifications').default(true),
  activityAlerts: boolean('activity_alerts').default(true),
  
  // API Keys
  apiKey: varchar('api_key', { length: 255 }).unique(),
  apiSecret: varchar('api_secret', { length: 255 }),
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type DeveloperSettings = typeof developerSettings.$inferSelect;
export type InsertDeveloperSettings = typeof developerSettings.$inferInsert;
