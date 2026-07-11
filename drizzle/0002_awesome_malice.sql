CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`message` text NOT NULL,
	`response` text,
	`isAI` boolean DEFAULT false,
	`type` enum('product_inquiry','order_status','support','feedback','general') DEFAULT 'general',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customerAccounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`phone` varchar(20) NOT NULL,
	`totalPurchases` decimal(12,2) DEFAULT '0',
	`totalPoints` int DEFAULT 0,
	`tier` enum('bronze','silver','gold','platinum') DEFAULT 'bronze',
	`isVerified` boolean DEFAULT false,
	`verificationCode` varchar(6),
	`password` varchar(255),
	`biometricData` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customerAccounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `customerAccounts_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `developerAccounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`password` varchar(255) NOT NULL,
	`biometricData` text,
	`apiKey` varchar(255),
	`isActive` boolean DEFAULT true,
	`lastLogin` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `developerAccounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `developerAccounts_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `developerAccounts_email_unique` UNIQUE(`email`),
	CONSTRAINT `developerAccounts_apiKey_unique` UNIQUE(`apiKey`)
);
--> statement-breakpoint
CREATE TABLE `gpsLocations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shipmentId` int NOT NULL,
	`latitude` decimal(10,8) NOT NULL,
	`longitude` decimal(11,8) NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gpsLocations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`titleAr` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`messageAr` text NOT NULL,
	`messageEn` text NOT NULL,
	`type` enum('order','payment','shipment','promotion','system') DEFAULT 'system',
	`channel` enum('in_app','email','whatsapp','sms') DEFAULT 'in_app',
	`isRead` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offerProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`offerId` int NOT NULL,
	`productId` int NOT NULL,
	CONSTRAINT `offerProducts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameAr` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`descriptionAr` text,
	`descriptionEn` text,
	`discountPercent` decimal(5,2) NOT NULL,
	`discountAmount` decimal(10,2),
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`type` enum('seasonal','holiday','flash_sale','new_product','vip') DEFAULT 'seasonal',
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `productReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`userId` int NOT NULL,
	`rating` int NOT NULL,
	`titleAr` varchar(255),
	`titleEn` varchar(255),
	`reviewAr` text,
	`reviewEn` text,
	`isVerifiedPurchase` boolean DEFAULT false,
	`helpful` int DEFAULT 0,
	`status` enum('pending','approved','rejected') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `productReviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recentlyViewed` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` int NOT NULL,
	`viewedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `recentlyViewed_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shipments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`trackingNumber` varchar(100),
	`status` enum('pending','picked_up','in_transit','out_for_delivery','delivered','failed') DEFAULT 'pending',
	`driverId` int,
	`estimatedDelivery` timestamp,
	`actualDelivery` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shipments_id` PRIMARY KEY(`id`),
	CONSTRAINT `shipments_trackingNumber_unique` UNIQUE(`trackingNumber`)
);
--> statement-breakpoint
CREATE TABLE `wishlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` int NOT NULL,
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wishlist_id` PRIMARY KEY(`id`)
);
