import { invokeLLM } from "./_core/llm";

export interface DashboardData {
  totalSales: number;
  totalRevenue: number;
  pendingReceivables: number;
  pendingPayables: number;
  lowStockProducts: number;
  topCustomer: { name: string; revenue: number };
  topProduct: { name: string; sold: number };
}

export async function generateDynamicInsights(data: DashboardData) {
  try {
    const prompt = `
Você é um analista de negócios especializado em ERP. Analise os seguintes dados de negócio e gere 3 insights estratégicos e acionáveis:

**Dados do Negócio:**
- Vendas Totais: R$ ${data.totalSales.toLocaleString("pt-BR")}
- Receitas Totais: R$ ${data.totalRevenue.toLocaleString("pt-BR")}
- Contas a Receber Pendentes: R$ ${data.pendingReceivables.toLocaleString("pt-BR")}
- Contas a Pagar Pendentes: R$ ${data.pendingPayables.toLocaleString("pt-BR")}
- Produtos em Estoque Baixo: ${data.lowStockProducts}
- Cliente Topo: ${data.topCustomer.name} (R$ ${data.topCustomer.revenue.toLocaleString("pt-BR")})
- Produto Mais Vendido: ${data.topProduct.name} (${data.topProduct.sold} unidades)

Gere exatamente 3 insights no formato JSON com a seguinte estrutura:
{
  "insights": [
    {
      "title": "Título do Insight",
      "description": "Descrição detalhada com recomendação acionável",
      "icon": "emoji apropriado",
      "color": "from-green-50 to-green-100 ou similar",
      "type": "growth|warning|opportunity"
    },
    ...
  ]
}

Certifique-se de que os insights sejam:
1. Baseados nos dados fornecidos
2. Acionáveis e específicos
3. Relevantes para a gestão do negócio
4. Variados em tipo (crescimento, alerta, oportunidade)

Responda APENAS com o JSON válido, sem explicações adicionais.
    `;

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um analista de negócios especializado em ERP. Responda sempre em JSON válido.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract JSON from response
    const responseText =
      typeof response.choices[0].message.content === "string"
        ? response.choices[0].message.content
        : "";

    // Try to parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in LLM response");
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);
    return parsedResponse.insights || [];
  } catch (error) {
    console.error("Error generating LLM insights:", error);
    // Return fallback insights if LLM fails
    return getFallbackInsights();
  }
}

function getFallbackInsights() {
  return [
    {
      title: "Oportunidade de Crescimento",
      description:
        "Suas vendas cresceram este mês. Recomendamos aumentar o investimento em marketing digital para capitalizar este momentum.",
      icon: "📈",
      color: "from-green-50 to-green-100",
      type: "growth",
    },
    {
      title: "Atenção: Estoque Crítico",
      description:
        "Alguns produtos estão abaixo do nível mínimo. Recomendamos reposição urgente para evitar perda de vendas.",
      icon: "⚠️",
      color: "from-orange-50 to-orange-100",
      type: "warning",
    },
    {
      title: "Análise de Clientes",
      description:
        "Identifique seus clientes de alto valor e crie programas de fidelização personalizados.",
      icon: "💡",
      color: "from-blue-50 to-blue-100",
      type: "opportunity",
    },
  ];
}
