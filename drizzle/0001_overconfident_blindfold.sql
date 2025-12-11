CREATE TABLE `accountsPayable` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`supplierId` int,
	`description` varchar(255) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`dueDate` datetime NOT NULL,
	`status` enum('pendente','pago','vencido','cancelado') DEFAULT 'pendente',
	`paymentDate` datetime,
	`paymentMethod` varchar(50),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accountsPayable_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `accountsReceivable` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`customerId` int NOT NULL,
	`invoiceId` int,
	`description` varchar(255) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`dueDate` datetime NOT NULL,
	`status` enum('pendente','pago','vencido','cancelado') DEFAULT 'pendente',
	`paymentDate` datetime,
	`paymentMethod` varchar(50),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accountsReceivable_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`userId` int NOT NULL,
	`customerId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`startTime` datetime NOT NULL,
	`endTime` datetime,
	`location` varchar(255),
	`type` enum('compromisso','tarefa','reuniao','ligacao') DEFAULT 'compromisso',
	`status` enum('agendado','concluido','cancelado') DEFAULT 'agendado',
	`reminderMinutes` int DEFAULT 15,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`cnpj` varchar(20),
	`email` varchar(320),
	`phone` varchar(20),
	`address` text,
	`city` varchar(100),
	`state` varchar(2),
	`zipCode` varchar(10),
	`website` varchar(255),
	`primaryColor` varchar(7) DEFAULT '#ffcc00',
	`secondaryColor` varchar(7) DEFAULT '#240046',
	`logoUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`cpfCnpj` varchar(20),
	`address` text,
	`city` varchar(100),
	`state` varchar(2),
	`zipCode` varchar(10),
	`status` enum('active','inactive','suspended') DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `departments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `departments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`userId` int,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`cpf` varchar(20),
	`position` varchar(100),
	`departmentId` int,
	`hireDate` date,
	`salary` decimal(10,2),
	`status` enum('ativo','inativo','afastado') DEFAULT 'ativo',
	`performanceScore` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`orderId` int,
	`invoiceNumber` varchar(50) NOT NULL,
	`customerId` int NOT NULL,
	`status` enum('rascunho','emitida','cancelada') DEFAULT 'rascunho',
	`totalAmount` decimal(12,2) NOT NULL,
	`issueDate` datetime NOT NULL,
	`dueDate` datetime,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `llmAnalysis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`analysisType` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`insights` text,
	`recommendations` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `llmAnalysis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`userId` int,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`type` enum('venda','estoque','financeiro','agenda','sistema') NOT NULL,
	`isRead` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`productId` int NOT NULL,
	`quantity` int NOT NULL,
	`unitPrice` decimal(10,2) NOT NULL,
	`subtotal` decimal(12,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`customerId` int NOT NULL,
	`orderNumber` varchar(50) NOT NULL,
	`status` enum('rascunho','confirmado','enviado','entregue','cancelado') DEFAULT 'rascunho',
	`totalAmount` decimal(12,2) NOT NULL,
	`discountAmount` decimal(10,2) DEFAULT '0',
	`taxAmount` decimal(10,2) DEFAULT '0',
	`shippingAmount` decimal(10,2) DEFAULT '0',
	`notes` text,
	`orderDate` datetime NOT NULL,
	`dueDate` datetime,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`module` varchar(100) NOT NULL,
	`action` varchar(100) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `productCategories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `productCategories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`sku` varchar(100) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`categoryId` int,
	`price` decimal(10,2) NOT NULL,
	`cost` decimal(10,2),
	`quantity` int DEFAULT 0,
	`minimumQuantity` int DEFAULT 10,
	`unit` varchar(20) DEFAULT 'UN',
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rolePermissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roleId` int NOT NULL,
	`permissionId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rolePermissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stockMovements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`productId` int NOT NULL,
	`type` enum('entrada','saida','ajuste') NOT NULL,
	`quantity` int NOT NULL,
	`reason` varchar(255),
	`reference` varchar(100),
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stockMovements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stripePayments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`orderId` int,
	`invoiceId` int,
	`stripePaymentIntentId` varchar(255) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'BRL',
	`status` enum('pendente','sucesso','falha','cancelado') DEFAULT 'pendente',
	`customerEmail` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripePayments_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripePayments_stripePaymentIntentId_unique` UNIQUE(`stripePaymentIntentId`)
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`cnpj` varchar(20),
	`address` text,
	`city` varchar(100),
	`state` varchar(2),
	`zipCode` varchar(10),
	`status` enum('ativo','inativo') DEFAULT 'ativo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `suppliers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`type` enum('receita','despesa') NOT NULL,
	`category` varchar(100) NOT NULL,
	`description` varchar(255) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`transactionDate` datetime NOT NULL,
	`status` enum('pendente','concluido','cancelado') DEFAULT 'pendente',
	`paymentMethod` varchar(50),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `companyId` int;--> statement-breakpoint
ALTER TABLE `users` ADD `departmentId` int;--> statement-breakpoint
ALTER TABLE `users` ADD `isActive` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `orderItems` ADD CONSTRAINT `orderItems_orderId_orders_id_fk` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderItems` ADD CONSTRAINT `orderItems_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stockMovements` ADD CONSTRAINT `stockMovements_companyId_companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stockMovements` ADD CONSTRAINT `stockMovements_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;