import { notifyOwner } from "./_core/notification";

export interface EmailNotification {
  to: string;
  subject: string;
  title: string;
  content: string;
  type: "critical" | "warning" | "info";
  actionUrl?: string;
}

/**
 * Enviar notificação por email para alertas críticos
 */
export async function sendCriticalAlert(notification: EmailNotification) {
  try {
    // Usar o sistema de notificações built-in do Manus
    const success = await notifyOwner({
      title: notification.subject,
      content: `
${notification.title}

${notification.content}

${notification.actionUrl ? `Ação: ${notification.actionUrl}` : ""}

---
Esta é uma notificação crítica do Yoov ERP. Acesse o sistema para mais detalhes.
      `,
    });

    if (success) {
      console.log(`[Email] Notificação enviada: ${notification.subject}`);
      return { success: true, message: "Notificação enviada com sucesso" };
    } else {
      console.warn(`[Email] Falha ao enviar notificação: ${notification.subject}`);
      return { success: false, message: "Falha ao enviar notificação" };
    }
  } catch (error) {
    console.error("[Email] Erro ao enviar notificação:", error);
    return { success: false, message: "Erro ao enviar notificação" };
  }
}

/**
 * Enviar alerta de estoque baixo
 */
export async function sendLowStockAlert(
  productName: string,
  currentStock: number,
  minimumStock: number
) {
  return sendCriticalAlert({
    to: "owner@company.com",
    subject: `⚠️ Alerta: Estoque Baixo - ${productName}`,
    title: "Estoque Crítico Detectado",
    content: `O produto "${productName}" está abaixo do nível mínimo de estoque.
    
Estoque Atual: ${currentStock} unidades
Nível Mínimo: ${minimumStock} unidades

Ação Recomendada: Fazer reposição urgente para evitar perda de vendas.`,
    type: "critical",
    actionUrl: "https://seu-erp.com/estoque",
  });
}

/**
 * Enviar alerta de contas vencidas
 */
export async function sendOverduePaymentAlert(
  customerName: string,
  amount: number,
  daysOverdue: number
) {
  return sendCriticalAlert({
    to: "owner@company.com",
    subject: `⚠️ Alerta: Conta Vencida - ${customerName}`,
    title: "Pagamento Vencido",
    content: `Cliente: ${customerName}
Valor: R$ ${amount.toLocaleString("pt-BR")}
Dias Vencido: ${daysOverdue} dias

Ação Recomendada: Entrar em contato com o cliente para cobrar o pagamento.`,
    type: "critical",
    actionUrl: "https://seu-erp.com/financeiro",
  });
}

/**
 * Enviar insight crítico de IA
 */
export async function sendAIInsightAlert(
  title: string,
  description: string,
  recommendation: string
) {
  return sendCriticalAlert({
    to: "owner@company.com",
    subject: `🤖 Insight de IA: ${title}`,
    title: `Insight Inteligente: ${title}`,
    content: `${description}

Recomendação:
${recommendation}

Este insight foi gerado automaticamente pela IA do Yoov ERP baseado na análise de seus dados em tempo real.`,
    type: "info",
    actionUrl: "https://seu-erp.com/analises",
  });
}

/**
 * Enviar relatório de vendas
 */
export async function sendSalesReport(
  totalSales: number,
  newOrders: number,
  topCustomer: string,
  topProduct: string
) {
  return sendCriticalAlert({
    to: "owner@company.com",
    subject: `📊 Relatório de Vendas Diário`,
    title: "Relatório de Vendas",
    content: `
Vendas Totais: R$ ${totalSales.toLocaleString("pt-BR")}
Novos Pedidos: ${newOrders}
Cliente Topo: ${topCustomer}
Produto Mais Vendido: ${topProduct}

Acesse o Dashboard para mais detalhes.`,
    type: "info",
    actionUrl: "https://seu-erp.com/dashboard",
  });
}

/**
 * Enviar alerta de oportunidade de crescimento
 */
export async function sendGrowthOpportunityAlert(
  opportunity: string,
  potentialRevenue: number,
  actionItems: string[]
) {
  return sendCriticalAlert({
    to: "owner@company.com",
    subject: `📈 Oportunidade de Crescimento: ${opportunity}`,
    title: "Oportunidade Identificada",
    content: `
Oportunidade: ${opportunity}
Receita Potencial: R$ ${potentialRevenue.toLocaleString("pt-BR")}

Ações Recomendadas:
${actionItems.map((item, i) => `${i + 1}. ${item}`).join("\n")}

Analise esta oportunidade no módulo de Análises.`,
    type: "info",
    actionUrl: "https://seu-erp.com/analises",
  });
}

/**
 * Verificar e enviar alertas críticos baseado em dados
 */
export async function checkAndSendAlerts(data: {
  lowStockProducts: Array<{ name: string; current: number; minimum: number }>;
  overduePayments: Array<{ customer: string; amount: number; daysOverdue: number }>;
  criticalInsights: Array<{ title: string; description: string; recommendation: string }>;
}) {
  const results = [];

  // Enviar alertas de estoque baixo
  for (const product of data.lowStockProducts) {
    const result = await sendLowStockAlert(product.name, product.current, product.minimum);
    results.push(result);
  }

  // Enviar alertas de pagamentos vencidos
  for (const payment of data.overduePayments) {
    const result = await sendOverduePaymentAlert(
      payment.customer,
      payment.amount,
      payment.daysOverdue
    );
    results.push(result);
  }

  // Enviar insights críticos
  for (const insight of data.criticalInsights) {
    const result = await sendAIInsightAlert(insight.title, insight.description, insight.recommendation);
    results.push(result);
  }

  return results;
}
