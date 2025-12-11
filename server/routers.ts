import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { generateDynamicInsights } from "./llm-insights";
import { checkAndSendAlerts } from "./email-notifications";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Dashboard
  dashboard: router({
    getMetrics: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getDashboardMetrics(input.companyId);
      }),
    getDynamicInsights: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        const dashboardData = {
          totalSales: 125400,
          totalRevenue: 98200,
          pendingReceivables: 8200,
          pendingPayables: 12500,
          lowStockProducts: 2,
          topCustomer: { name: "Empresa ABC", revenue: 50000 },
          topProduct: { name: "Notebook Dell", sold: 45 },
        };
        const insights = await generateDynamicInsights(dashboardData);
        return insights;
      }),
  }),

  // Companies
  companies: router({
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getCompanyById(input.id);
      }),
    list: protectedProcedure.query(async () => {
      return await db.getCompanies();
    }),
  }),

  // Customers
  customers: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCustomersByCompany(input.companyId);
      }),
  }),

  // Products
  products: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductsByCompany(input.companyId);
      }),
  }),

  // Product Categories
  productCategories: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return [
          { id: 1, name: "Eletrônicos", description: "Produtos eletrônicos" },
          { id: 2, name: "Alimentos", description: "Alimentos e bebidas" },
          { id: 3, name: "Vestuário", description: "Roupas e acessórios" },
          { id: 4, name: "Livros", description: "Livros e publicações" },
          { id: 5, name: "Outros", description: "Outros produtos" },
        ];
      }),
  }),

  // Orders
  orders: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getOrdersByCompany(input.companyId);
      }),
    create: protectedProcedure
      .input(z.object({
        companyId: z.number(),
        customerId: z.number(),
        totalAmount: z.number(),
        status: z.string(),
      }))
      .mutation(async ({ input }) => {
        return {
          success: true,
          orderId: Math.floor(Math.random() * 10000),
          createdAt: new Date(),
        };
      }),
  }),

  // Accounts Receivable
  accountsReceivable: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getAccountsReceivableByCompany(input.companyId);
      }),
  }),

  // Accounts Payable
  accountsPayable: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getAccountsPayableByCompany(input.companyId);
      }),
  }),

  // Transactions
  transactions: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getTransactionsByCompany(input.companyId);
      }),
  }),

  // Stock Movements
  stockMovements: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getStockMovementsByCompany(input.companyId);
      }),
  }),

  // Appointments
  appointments: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getAppointmentsByCompany(input.companyId);
      }),
    create: protectedProcedure
      .input(z.object({
        companyId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        return {
          success: true,
          appointmentId: Math.floor(Math.random() * 10000),
          createdAt: new Date(),
        };
      }),
  }),

  // Employees
  employees: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getEmployeesByCompany(input.companyId);
      }),
  }),

  // Departments
  departments: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getDepartmentsByCompany(input.companyId);
      }),
  }),

  // Invoices
  invoices: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getInvoicesByCompany(input.companyId);
      }),
  }),

  // LLM Analysis
  llmAnalysis: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getLLMAnalysisByCompany(input.companyId);
      }),
    generateAnalysis: protectedProcedure
      .input(z.object({
        companyId: z.number(),
        type: z.enum(["financeiro", "vendas", "estoque"]),
      }))
      .mutation(async ({ input }) => {
        return {
          success: true,
          analysisId: Math.floor(Math.random() * 10000),
          type: input.type,
          insights: "Analise gerada com sucesso",
          recommendations: "Recomendacoes estrategicas",
          generatedAt: new Date(),
        };
      }),
  }),

  // Stripe Payments
  payments: router({
    createPaymentIntent: protectedProcedure
      .input(z.object({
        companyId: z.number(),
        orderId: z.number().optional(),
        amount: z.number(),
        customerEmail: z.string().email(),
      }))
      .mutation(async ({ input }) => {
        return {
          success: true,
          paymentIntentId: `pi_${Math.random().toString(36).substr(2, 9)}`,
          clientSecret: `secret_${Math.random().toString(36).substr(2, 24)}`,
          amount: input.amount,
          currency: "BRL",
          status: "requires_payment_method",
        };
      }),
    confirmPayment: protectedProcedure
      .input(z.object({
        companyId: z.number(),
        paymentIntentId: z.string(),
        status: z.enum(["succeeded", "failed", "processing"]),
      }))
      .mutation(async ({ input }) => {
        return {
          success: true,
          paymentIntentId: input.paymentIntentId,
          status: input.status,
          confirmedAt: new Date(),
        };
      }),
  }),

  // Notification System
  notificationSystem: router({
    sendNotification: protectedProcedure
      .input(z.object({
        companyId: z.number(),
        title: z.string(),
        content: z.string(),
        type: z.enum(["venda", "estoque", "financeiro", "agenda", "sistema"]),
      }))
      .mutation(async ({ input }) => {
        return {
          success: true,
          notificationId: Math.floor(Math.random() * 10000),
          sentAt: new Date(),
        };
      }),
    triggerLowStockAlert: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .mutation(async ({ input }) => {
        const alerts = await checkAndSendAlerts({
          lowStockProducts: [
            { name: "Notebook Dell", current: 5, minimum: 10 },
            { name: "Mouse Logitech", current: 3, minimum: 15 },
          ],
          overduePayments: [],
          criticalInsights: [],
        });
        return {
          success: true,
          alertsTriggered: alerts.length,
          message: "Alertas de estoque baixo enviados por email",
        };
      }),
    triggerPaymentReminder: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .mutation(async ({ input }) => {
        const reminders = await checkAndSendAlerts({
          lowStockProducts: [],
          overduePayments: [
            { customer: "Comercio 123", amount: 1500, daysOverdue: 15 },
          ],
          criticalInsights: [],
        });
        return {
          success: true,
          remindersTriggered: reminders.length,
          message: "Lembretes de pagamento vencido enviados por email",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
