import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  date,
  datetime,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  companyId: int("companyId"),
  departmentId: int("departmentId"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Companies table
 */
export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 20 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 2 }),
  zipCode: varchar("zipCode", { length: 10 }),
  website: varchar("website", { length: 255 }),
  primaryColor: varchar("primaryColor", { length: 7 }).default("#ffcc00"),
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#240046"),
  logoUrl: varchar("logoUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

/**
 * Departments table
 */
export const departments = mysqlTable("departments", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = typeof departments.$inferInsert;

/**
 * Roles and Permissions
 */
export const roles = mysqlTable("roles", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Role = typeof roles.$inferSelect;
export type InsertRole = typeof roles.$inferInsert;

export const permissions = mysqlTable("permissions", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  module: varchar("module", { length: 100 }).notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Permission = typeof permissions.$inferSelect;
export type InsertPermission = typeof permissions.$inferInsert;

export const rolePermissions = mysqlTable("rolePermissions", {
  id: int("id").autoincrement().primaryKey(),
  roleId: int("roleId").notNull(),
  permissionId: int("permissionId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Customers table
 */
export const customers = mysqlTable("customers", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  cpfCnpj: varchar("cpfCnpj", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 2 }),
  zipCode: varchar("zipCode", { length: 10 }),
  status: mysqlEnum("status", ["active", "inactive", "suspended"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Products table
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  sku: varchar("sku", { length: 100 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: int("categoryId"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  quantity: int("quantity").default(0),
  minimumQuantity: int("minimumQuantity").default(10),
  unit: varchar("unit", { length: 20 }).default("UN"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Product Categories
 */
export const productCategories = mysqlTable("productCategories", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProductCategory = typeof productCategories.$inferSelect;
export type InsertProductCategory = typeof productCategories.$inferInsert;

/**
 * Stock Movements
 */
export const stockMovements = mysqlTable("stockMovements", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull().references(() => companies.id),
  productId: int("productId").notNull().references(() => products.id),
  type: mysqlEnum("type", ["entrada", "saida", "ajuste"]).notNull(),
  quantity: int("quantity").notNull(),
  reason: varchar("reason", { length: 255 }),
  reference: varchar("reference", { length: 100 }),
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StockMovement = typeof stockMovements.$inferSelect;
export type InsertStockMovement = typeof stockMovements.$inferInsert;

/**
 * Orders (Pedidos)
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  customerId: int("customerId").notNull(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["rascunho", "confirmado", "enviado", "entregue", "cancelado"]).default("rascunho"),
  totalAmount: decimal("totalAmount", { precision: 12, scale: 2 }).notNull(),
  discountAmount: decimal("discountAmount", { precision: 10, scale: 2 }).default("0"),
  taxAmount: decimal("taxAmount", { precision: 10, scale: 2 }).default("0"),
  shippingAmount: decimal("shippingAmount", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  orderDate: datetime("orderDate").notNull(),
  dueDate: datetime("dueDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order Items
 */
export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().references(() => orders.id),
  productId: int("productId").notNull().references(() => products.id),
  quantity: int("quantity").notNull(),
  unitPrice: decimal("unitPrice", { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Invoices (Notas Fiscais)
 */
export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  orderId: int("orderId"),
  invoiceNumber: varchar("invoiceNumber", { length: 50 }).notNull(),
  customerId: int("customerId").notNull(),
  status: mysqlEnum("status", ["rascunho", "emitida", "cancelada"]).default("rascunho"),
  totalAmount: decimal("totalAmount", { precision: 12, scale: 2 }).notNull(),
  issueDate: datetime("issueDate").notNull(),
  dueDate: datetime("dueDate"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

/**
 * Accounts Payable (Contas a Pagar)
 */
export const accountsPayable = mysqlTable("accountsPayable", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  supplierId: int("supplierId"),
  description: varchar("description", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  dueDate: datetime("dueDate").notNull(),
  status: mysqlEnum("status", ["pendente", "pago", "vencido", "cancelado"]).default("pendente"),
  paymentDate: datetime("paymentDate"),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AccountPayable = typeof accountsPayable.$inferSelect;
export type InsertAccountPayable = typeof accountsPayable.$inferInsert;

/**
 * Accounts Receivable (Contas a Receber)
 */
export const accountsReceivable = mysqlTable("accountsReceivable", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  customerId: int("customerId").notNull(),
  invoiceId: int("invoiceId"),
  description: varchar("description", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  dueDate: datetime("dueDate").notNull(),
  status: mysqlEnum("status", ["pendente", "pago", "vencido", "cancelado"]).default("pendente"),
  paymentDate: datetime("paymentDate"),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AccountReceivable = typeof accountsReceivable.$inferSelect;
export type InsertAccountReceivable = typeof accountsReceivable.$inferInsert;

/**
 * Financial Transactions (Fluxo de Caixa)
 */
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  type: mysqlEnum("type", ["receita", "despesa"]).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  transactionDate: datetime("transactionDate").notNull(),
  status: mysqlEnum("status", ["pendente", "concluido", "cancelado"]).default("pendente"),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

/**
 * Agenda (Appointments)
 */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  userId: int("userId").notNull(),
  customerId: int("customerId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startTime: datetime("startTime").notNull(),
  endTime: datetime("endTime"),
  location: varchar("location", { length: 255 }),
  type: mysqlEnum("type", ["compromisso", "tarefa", "reuniao", "ligacao"]).default("compromisso"),
  status: mysqlEnum("status", ["agendado", "concluido", "cancelado"]).default("agendado"),
  reminderMinutes: int("reminderMinutes").default(15),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * Employees (Colaboradores)
 */
export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  userId: int("userId"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  cpf: varchar("cpf", { length: 20 }),
  position: varchar("position", { length: 100 }),
  departmentId: int("departmentId"),
  hireDate: date("hireDate"),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  status: mysqlEnum("status", ["ativo", "inativo", "afastado"]).default("ativo"),
  performanceScore: int("performanceScore").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = typeof employees.$inferInsert;

/**
 * Suppliers
 */
export const suppliers = mysqlTable("suppliers", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  cnpj: varchar("cnpj", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 2 }),
  zipCode: varchar("zipCode", { length: 10 }),
  status: mysqlEnum("status", ["ativo", "inativo"]).default("ativo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = typeof suppliers.$inferInsert;

/**
 * Stripe Payments
 */
export const stripePayments = mysqlTable("stripePayments", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  orderId: int("orderId"),
  invoiceId: int("invoiceId"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }).notNull().unique(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("BRL"),
  status: mysqlEnum("status", ["pendente", "sucesso", "falha", "cancelado"]).default("pendente"),
  customerEmail: varchar("customerEmail", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripePayment = typeof stripePayments.$inferSelect;
export type InsertStripePayment = typeof stripePayments.$inferInsert;

/**
 * Notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  userId: int("userId"),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  type: mysqlEnum("type", ["venda", "estoque", "financeiro", "agenda", "sistema"]).notNull(),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * LLM Analysis Results
 */
export const llmAnalysis = mysqlTable("llmAnalysis", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  analysisType: varchar("analysisType", { length: 100 }).notNull(),
  content: text("content").notNull(),
  insights: text("insights"),
  recommendations: text("recommendations"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LLMAnalysis = typeof llmAnalysis.$inferSelect;
export type InsertLLMAnalysis = typeof llmAnalysis.$inferInsert;
