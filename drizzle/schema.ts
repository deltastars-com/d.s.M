import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "marketing", "operations", "quality", "accountant", "developer"]).default("user").notNull(),
  companyId: int("companyId"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Categories
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  imageUrl: text("imageUrl"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

// Products
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: int("quantity").default(0),
  imageUrl: text("imageUrl"),
  sku: varchar("sku", { length: 100 }).unique(),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Shopping Cart
export const cartItems = mysqlTable("cartItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").notNull().default(1),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

// Orders
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  orderNumber: varchar("orderNumber", { length: 50 }).unique().notNull(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending"),
  totalAmount: decimal("totalAmount", { precision: 12, scale: 2 }).notNull(),
  taxAmount: decimal("taxAmount", { precision: 10, scale: 2 }).default("0"),
  shippingCost: decimal("shippingCost", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// Order Items
export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").notNull(),
  unitPrice: decimal("unitPrice", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("totalPrice", { precision: 12, scale: 2 }).notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

// Invoices
export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  invoiceNumber: varchar("invoiceNumber", { length: 50 }).unique().notNull(),
  status: mysqlEnum("status", ["draft", "issued", "paid", "overdue", "cancelled"]).default("draft"),
  totalAmount: decimal("totalAmount", { precision: 12, scale: 2 }).notNull(),
  paidAmount: decimal("paidAmount", { precision: 12, scale: 2 }).default("0"),
  dueDate: timestamp("dueDate"),
  issuedAt: timestamp("issuedAt").defaultNow(),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

// Payments
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  invoiceId: int("invoiceId").notNull(),
  orderId: int("orderId"),
  paymentMethod: mysqlEnum("paymentMethod", ["bank_transfer", "cash_on_delivery", "card"]).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending"),
  reference: varchar("reference", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

// Inventory
export const inventory = mysqlTable("inventory", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  warehouseId: int("warehouseId"),
  quantity: int("quantity").default(0),
  reserved: int("reserved").default(0),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow(),
});

export type InventoryItem = typeof inventory.$inferSelect;
export type InsertInventoryItem = typeof inventory.$inferInsert;

// Suppliers
export const suppliers = mysqlTable("suppliers", {
  id: int("id").autoincrement().primaryKey(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }),
  contact: varchar("contact", { length: 100 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = typeof suppliers.$inferInsert;

// Complaints
export const complaints = mysqlTable("complaints", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId"),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["quality", "delivery", "invoice", "other"]).notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium"),
  status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"]).default("open"),
  description: text("description").notNull(),
  resolution: text("resolution"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = typeof complaints.$inferInsert;

// Audit Logs
export const auditLogs = mysqlTable("auditLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  action: varchar("action", { length: 100 }).notNull(),
  targetCollection: varchar("targetCollection", { length: 100 }),
  targetId: int("targetId"),
  details: text("details"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

// Product Reviews & Ratings
export const productReviews = mysqlTable("productReviews", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  userId: int("userId").notNull(),
  rating: int("rating").notNull(), // 1-5
  titleAr: varchar("titleAr", { length: 255 }),
  titleEn: varchar("titleEn", { length: 255 }),
  reviewAr: text("reviewAr"),
  reviewEn: text("reviewEn"),
  isVerifiedPurchase: boolean("isVerifiedPurchase").default(false),
  helpful: int("helpful").default(0),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProductReview = typeof productReviews.$inferSelect;
export type InsertProductReview = typeof productReviews.$inferInsert;

// Recently Viewed Products
export const recentlyViewed = mysqlTable("recentlyViewed", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  viewedAt: timestamp("viewedAt").defaultNow().notNull(),
});

export type RecentlyViewed = typeof recentlyViewed.$inferSelect;
export type InsertRecentlyViewed = typeof recentlyViewed.$inferInsert;

// Wishlist
export const wishlist = mysqlTable("wishlist", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type Wishlist = typeof wishlist.$inferSelect;
export type InsertWishlist = typeof wishlist.$inferInsert;

// Customer Accounts (VIP)
export const customerAccounts = mysqlTable("customerAccounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull(),
  totalPurchases: decimal("totalPurchases", { precision: 12, scale: 2 }).default("0"),
  totalPoints: int("totalPoints").default(0),
  tier: mysqlEnum("tier", ["bronze", "silver", "gold", "platinum"]).default("bronze"),
  isVerified: boolean("isVerified").default(false),
  verificationCode: varchar("verificationCode", { length: 6 }),
  password: varchar("password", { length: 255 }),
  biometricData: text("biometricData"), // Encrypted fingerprint/face data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomerAccount = typeof customerAccounts.$inferSelect;
export type InsertCustomerAccount = typeof customerAccounts.$inferInsert;

// Developer Accounts
export const developerAccounts = mysqlTable("developerAccounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  biometricData: text("biometricData"), // Encrypted fingerprint/face data
  apiKey: varchar("apiKey", { length: 255 }).unique(),
  isActive: boolean("isActive").default(true),
  lastLogin: timestamp("lastLogin"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DeveloperAccount = typeof developerAccounts.$inferSelect;
export type InsertDeveloperAccount = typeof developerAccounts.$inferInsert;

// Shipments & GPS Tracking
export const shipments = mysqlTable("shipments", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  trackingNumber: varchar("trackingNumber", { length: 100 }).unique(),
  status: mysqlEnum("status", ["pending", "picked_up", "in_transit", "out_for_delivery", "delivered", "failed"]).default("pending"),
  driverId: int("driverId"),
  estimatedDelivery: timestamp("estimatedDelivery"),
  actualDelivery: timestamp("actualDelivery"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Shipment = typeof shipments.$inferSelect;
export type InsertShipment = typeof shipments.$inferInsert;

// GPS Locations
export const gpsLocations = mysqlTable("gpsLocations", {
  id: int("id").autoincrement().primaryKey(),
  shipmentId: int("shipmentId").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type GPSLocation = typeof gpsLocations.$inferSelect;
export type InsertGPSLocation = typeof gpsLocations.$inferInsert;

// Chat Messages (Delta Stars AI)
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  message: text("message").notNull(),
  response: text("response"),
  isAI: boolean("isAI").default(false),
  type: mysqlEnum("type", ["product_inquiry", "order_status", "support", "feedback", "general"]).default("general"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// Notifications
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  messageAr: text("messageAr").notNull(),
  messageEn: text("messageEn").notNull(),
  type: mysqlEnum("type", ["order", "payment", "shipment", "promotion", "system"]).default("system"),
  channel: mysqlEnum("channel", ["in_app", "email", "whatsapp", "sms"]).default("in_app"),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// Offers & Promotions
export const offers = mysqlTable("offers", {
  id: int("id").autoincrement().primaryKey(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  discountPercent: decimal("discountPercent", { precision: 5, scale: 2 }).notNull(),
  discountAmount: decimal("discountAmount", { precision: 10, scale: 2 }),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  type: mysqlEnum("type", ["seasonal", "holiday", "flash_sale", "new_product", "vip"]).default("seasonal"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = typeof offers.$inferInsert;

// Offer Products (Many-to-Many)
export const offerProducts = mysqlTable("offerProducts", {
  id: int("id").autoincrement().primaryKey(),
  offerId: int("offerId").notNull(),
  productId: int("productId").notNull(),
});

export type OfferProduct = typeof offerProducts.$inferSelect;
export type InsertOfferProduct = typeof offerProducts.$inferInsert;