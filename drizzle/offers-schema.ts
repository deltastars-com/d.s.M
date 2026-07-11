import {
  int,
  varchar,
  text,
  timestamp,
  boolean,
  decimal,
  mysqlTable,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

/**
 * Offers and Promotions Schema
 * Manages all promotional offers, discounts, and special deals
 */

export const offers = mysqlTable('offers', {
  id: int('id').autoincrement().primaryKey(),
  nameAr: varchar('nameAr', { length: 255 }).notNull(),
  nameEn: varchar('nameEn', { length: 255 }).notNull(),
  descriptionAr: text('descriptionAr'),
  descriptionEn: text('descriptionEn'),
  type: mysqlEnum('type', [
    'percentage',
    'fixed',
    'bogo', // Buy One Get One
    'seasonal',
    'flash',
    'loyalty',
  ]).default('percentage').notNull(),
  discountValue: decimal('discountValue', { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  applicableToAll: boolean('applicableToAll').default(false).notNull(),
  minPurchaseAmount: decimal('minPurchaseAmount', { precision: 10, scale: 2 }),
  maxDiscountAmount: decimal('maxDiscountAmount', { precision: 10, scale: 2 }),
  usageLimit: int('usageLimit'),
  usageCount: int('usageCount').default(0).notNull(),
  couponCode: varchar('couponCode', { length: 50 }).unique(),
  icon: varchar('icon', { length: 255 }),
  bannerImage: varchar('bannerImage', { length: 255 }),
  priority: int('priority').default(0).notNull(), // Higher priority shows first
  createdBy: int('createdBy').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = typeof offers.$inferInsert;

/**
 * Offer Products
 * Maps products to specific offers (if not applicable to all)
 */
export const offerProducts = mysqlTable('offerProducts', {
  id: int('id').autoincrement().primaryKey(),
  offerId: int('offerId').notNull(),
  productId: int('productId').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type OfferProduct = typeof offerProducts.$inferSelect;
export type InsertOfferProduct = typeof offerProducts.$inferInsert;

/**
 * Seasonal Offers
 * Special offers for seasons and occasions
 */
export const seasonalOffers = mysqlTable('seasonalOffers', {
  id: int('id').autoincrement().primaryKey(),
  nameAr: varchar('nameAr', { length: 255 }).notNull(),
  nameEn: varchar('nameEn', { length: 255 }).notNull(),
  season: mysqlEnum('season', [
    'ramadan',
    'eid_fitr',
    'eid_adha',
    'new_year',
    'national_day',
    'summer',
    'winter',
    'spring',
    'fall',
    'custom',
  ]).notNull(),
  descriptionAr: text('descriptionAr'),
  descriptionEn: text('descriptionEn'),
  bannerImage: varchar('bannerImage', { length: 255 }),
  backgroundColor: varchar('backgroundColor', { length: 7 }).default('#22c55e'),
  textColor: varchar('textColor', { length: 7 }).default('#ffffff'),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  offerId: int('offerId'),
  createdBy: int('createdBy').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type SeasonalOffer = typeof seasonalOffers.$inferSelect;
export type InsertSeasonalOffer = typeof seasonalOffers.$inferInsert;

/**
 * Featured Products
 * Products highlighted in the showroom
 */
export const featuredProducts = mysqlTable('featuredProducts', {
  id: int('id').autoincrement().primaryKey(),
  productId: int('productId').notNull(),
  order: int('order').default(0).notNull(),
  section: mysqlEnum('section', [
    'hero',
    'trending',
    'bestsellers',
    'new_arrivals',
    'special_offers',
    'seasonal',
  ]).notNull(),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  backgroundColor: varchar('backgroundColor', { length: 7 }),
  textColor: varchar('textColor', { length: 7 }),
  createdBy: int('createdBy').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type FeaturedProduct = typeof featuredProducts.$inferSelect;
export type InsertFeaturedProduct = typeof featuredProducts.$inferInsert;

/**
 * Rewards and Loyalty Points
 * Manages customer loyalty program
 */
export const rewards = mysqlTable('rewards', {
  id: int('id').autoincrement().primaryKey(),
  nameAr: varchar('nameAr', { length: 255 }).notNull(),
  nameEn: varchar('nameEn', { length: 255 }).notNull(),
  descriptionAr: text('descriptionAr'),
  descriptionEn: text('descriptionEn'),
  pointsRequired: int('pointsRequired').notNull(),
  rewardValue: decimal('rewardValue', { precision: 10, scale: 2 }).notNull(),
  rewardType: mysqlEnum('rewardType', [
    'discount',
    'free_product',
    'free_shipping',
    'gift_card',
    'points_multiplier',
  ]).notNull(),
  icon: varchar('icon', { length: 255 }),
  image: varchar('image', { length: 255 }),
  isActive: boolean('isActive').default(true).notNull(),
  availableCount: int('availableCount'),
  claimedCount: int('claimedCount').default(0).notNull(),
  createdBy: int('createdBy').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type Reward = typeof rewards.$inferSelect;
export type InsertReward = typeof rewards.$inferInsert;

/**
 * Customer Loyalty Points
 * Tracks loyalty points for each customer
 */
export const customerLoyaltyPoints = mysqlTable('customerLoyaltyPoints', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  totalPoints: int('totalPoints').default(0).notNull(),
  availablePoints: int('availablePoints').default(0).notNull(),
  usedPoints: int('usedPoints').default(0).notNull(),
  lastEarnedAt: timestamp('lastEarnedAt'),
  lastRedeemedAt: timestamp('lastRedeemedAt'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type CustomerLoyaltyPoints = typeof customerLoyaltyPoints.$inferSelect;
export type InsertCustomerLoyaltyPoints = typeof customerLoyaltyPoints.$inferInsert;

/**
 * Loyalty Points Transactions
 * Logs all loyalty points transactions
 */
export const loyaltyPointsTransactions = mysqlTable('loyaltyPointsTransactions', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  points: int('points').notNull(),
  type: mysqlEnum('type', ['earned', 'redeemed', 'expired', 'adjusted']).notNull(),
  reason: varchar('reason', { length: 255 }),
  orderId: int('orderId'),
  rewardId: int('rewardId'),
  balanceBefore: int('balanceBefore').notNull(),
  balanceAfter: int('balanceAfter').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type LoyaltyPointsTransaction = typeof loyaltyPointsTransactions.$inferSelect;
export type InsertLoyaltyPointsTransaction = typeof loyaltyPointsTransactions.$inferInsert;
