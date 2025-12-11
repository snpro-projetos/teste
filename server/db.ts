import { eq, and, desc, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  companies,
  customers,
  products,
  orders,
  orderItems,
  accountsPayable,
  accountsReceivable,
  transactions,
  appointments,
  employees,
  invoices,
  notifications,
  departments,
  suppliers,
  productCategories,
  stockMovements,
  roles,
  permissions,
  rolePermissions,
  llmAnalysis,
  stripePayments,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Company queries
export async function getCompanyById(companyId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(companies).where(eq(companies.id, companyId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCompanies() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(companies);
}

// Dashboard metrics
export async function getDashboardMetrics(companyId: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    // Total sales
    const totalSales = await db
      .select()
      .from(orders)
      .where(and(eq(orders.companyId, companyId), eq(orders.status, "entregue")));

    // Pending receivables
    const pendingReceivables = await db
      .select()
      .from(accountsReceivable)
      .where(and(eq(accountsReceivable.companyId, companyId), eq(accountsReceivable.status, "pendente")));

    // Pending payables
    const pendingPayables = await db
      .select()
      .from(accountsPayable)
      .where(and(eq(accountsPayable.companyId, companyId), eq(accountsPayable.status, "pendente")));

    // Low stock products
    const lowStockProducts = await db
      .select()
      .from(products)
      .where(and(eq(products.companyId, companyId)));

    // Upcoming appointments
    const upcomingAppointments = await db
      .select()
      .from(appointments)
      .where(and(eq(appointments.companyId, companyId), eq(appointments.status, "agendado")))
      .limit(5);

    return {
      totalSales: totalSales.length,
      totalSalesAmount: totalSales.reduce((sum, order) => sum + parseFloat(order.totalAmount.toString()), 0),
      pendingReceivables: pendingReceivables.length,
      pendingReceivablesAmount: pendingReceivables.reduce((sum, ar) => sum + parseFloat(ar.amount.toString()), 0),
      pendingPayables: pendingPayables.length,
      pendingPayablesAmount: pendingPayables.reduce((sum, ap) => sum + parseFloat(ap.amount.toString()), 0),
      lowStockCount: lowStockProducts.filter(p => p.quantity! <= p.minimumQuantity!).length,
      upcomingAppointments: upcomingAppointments.length,
    };
  } catch (error) {
    console.error("[Database] Failed to get dashboard metrics:", error);
    return null;
  }
}

// Customer queries
export async function getCustomersByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(customers).where(eq(customers.companyId, companyId));
}

// Product queries
export async function getProductsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.companyId, companyId));
}

// Order queries
export async function getOrdersByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.companyId, companyId)).orderBy(desc(orders.createdAt));
}

// Financial queries
export async function getAccountsReceivableByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(accountsReceivable).where(eq(accountsReceivable.companyId, companyId));
}

export async function getAccountsPayableByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(accountsPayable).where(eq(accountsPayable.companyId, companyId));
}

export async function getTransactionsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(transactions).where(eq(transactions.companyId, companyId)).orderBy(desc(transactions.createdAt));
}

// Appointment queries
export async function getAppointmentsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(appointments).where(eq(appointments.companyId, companyId)).orderBy(desc(appointments.startTime));
}

// Employee queries
export async function getEmployeesByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(employees).where(eq(employees.companyId, companyId));
}

// Notification queries
export async function getNotificationsByCompany(companyId: number, limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.companyId, companyId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function createNotification(notification: typeof notifications.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(notifications).values(notification);
  return result;
}

// LLM Analysis queries
export async function getLLMAnalysisByCompany(companyId: number, analysisType?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (analysisType) {
    return db
      .select()
      .from(llmAnalysis)
      .where(and(eq(llmAnalysis.companyId, companyId), eq(llmAnalysis.analysisType, analysisType)))
      .orderBy(desc(llmAnalysis.createdAt))
      .limit(1);
  }
  
  return db
    .select()
    .from(llmAnalysis)
    .where(eq(llmAnalysis.companyId, companyId))
    .orderBy(desc(llmAnalysis.createdAt))
    .limit(5);
}

export async function createLLMAnalysis(analysis: typeof llmAnalysis.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(llmAnalysis).values(analysis);
  return result;
}

// Department queries
export async function getDepartmentsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(departments).where(eq(departments.companyId, companyId));
}

// Supplier queries
export async function getSuppliersByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(suppliers).where(eq(suppliers.companyId, companyId));
}

// Invoice queries
export async function getInvoicesByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(invoices).where(eq(invoices.companyId, companyId)).orderBy(desc(invoices.createdAt));
}

// Stock movement queries
export async function getStockMovementsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(stockMovements).where(eq(stockMovements.companyId, companyId)).orderBy(desc(stockMovements.createdAt));
}

// Stripe payment queries
export async function getStripePaymentsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(stripePayments).where(eq(stripePayments.companyId, companyId)).orderBy(desc(stripePayments.createdAt));
}
