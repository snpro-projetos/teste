import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const mockAnalyses = {
  financeiro: {
    title: "Análise Financeira",
    content:
      "Análise financeira do período: Receitas aumentaram 15% em relação ao mês anterior, com destaque para o crescimento em vendas online.",
    insights: [
      "Padrão identificado: Maior volume de vendas nos fins de semana",
      "Ticket médio aumentou de R$ 250 para R$ 320",
      "Taxa de inadimplência em queda: 2.3% (era 3.1% mês anterior)",
    ],
    recommendations: [
      "Aumentar investimento em marketing digital nos fins de semana",
      "Oferecer promoções em produtos de maior margem",
      "Implementar programa de fidelização para clientes recorrentes",
    ],
  },
  vendas: {
    title: "Análise de Vendas",
    content:
      "Análise de vendas: 24 pedidos processados este mês com faturamento total de R$ 125.400. Taxa de conversão de 18%.",
    insights: [
      "Clientes mais frequentes: Empresa ABC (5 pedidos), Loja XYZ (4 pedidos)",
      "Produto mais vendido: Produto A (45 unidades)",
      "Sazonalidade detectada: Picos de venda em terças e quintas",
    ],
    recommendations: [
      "Criar programa VIP para clientes de alto valor",
      "Oferecer desconto progressivo por volume",
      "Realizar follow-up com clientes inativos há 30+ dias",
    ],
  },
  estoque: {
    title: "Análise de Estoque",
    content:
      "Análise de estoque: 342 produtos cadastrados com valor total de R$ 85.400. 3 produtos em nível crítico.",
    insights: [
      "Rotatividade média: 2.5x ao mês",
      "Produtos com menor movimento: Categoria Livros (5 unidades/mês)",
      "Previsão: Estoque crítico em 2 produtos em 7 dias",
    ],
    recommendations: [
      "Reposição urgente de 3 produtos críticos",
      "Revisar preços de produtos com baixa rotatividade",
      "Implementar sistema de previsão de demanda com IA",
    ],
  },
};

export default function Analises() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<keyof typeof mockAnalyses>("financeiro");
  const [isGenerating, setIsGenerating] = useState(false);

  const analysis = mockAnalyses[selectedAnalysis];

  const handleGenerateAnalysis = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Análises Inteligentes</h1>
          <p className="text-muted-foreground mt-1">
            Insights automáticos gerados por IA para auxiliar na tomada de decisões
          </p>
        </div>
        <Button
          onClick={handleGenerateAnalysis}
          disabled={isGenerating}
          className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold"
        >
          <Sparkles size={20} className="mr-2" />
          {isGenerating ? "Gerando..." : "Gerar Análise"}
        </Button>
      </div>

      {/* Analysis Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(mockAnalyses).map(([key, value]) => (
          <Card
            key={key}
            onClick={() => setSelectedAnalysis(key as keyof typeof mockAnalyses)}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selectedAnalysis === key
                ? "border-[#ffcc00] bg-[#ffcc00]/5"
                : "border-transparent hover:border-[#ffcc00]/30"
            }`}
          >
            <h3 className="font-semibold text-[#240046]">{value.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Clique para visualizar análise completa
            </p>
          </Card>
        ))}
      </div>

      {/* Analysis Details */}
      <Card className="p-8 bg-white">
        <div className="space-y-8">
          {/* Summary */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={24} className="text-[#ffcc00]" />
              <h2 className="text-2xl font-bold text-[#240046]">{analysis.title}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">{analysis.content}</p>
          </div>

          {/* Insights */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={24} className="text-green-600" />
              <h3 className="text-xl font-semibold text-[#240046]">Insights Identificados</h3>
            </div>
            <div className="space-y-3">
              {analysis.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-green-50 border-l-4 border-l-green-500 rounded-lg"
                >
                  <p className="text-gray-800 flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={24} className="text-[#240046]" />
              <h3 className="text-xl font-semibold text-[#240046]">Recomendações Estratégicas</h3>
            </div>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#ffcc00]/10 border-l-4 border-l-[#ffcc00] rounded-lg"
                >
                  <p className="text-gray-800 flex items-start gap-3">
                    <span className="font-bold text-[#240046] flex-shrink-0">{idx + 1}.</span>
                    <span>{rec}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Generated At */}
          <div className="text-sm text-muted-foreground border-t pt-4">
            Análise gerada em: {new Date().toLocaleString("pt-BR")}
          </div>
        </div>
      </Card>

      {/* Historical Analyses */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#240046] mb-4">Análises Anteriores</h3>
        <div className="space-y-3">
          {[
            { date: "2025-01-10", type: "Financeiro", status: "Concluída" },
            { date: "2025-01-08", type: "Vendas", status: "Concluída" },
            { date: "2025-01-05", type: "Estoque", status: "Concluída" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-[#f9f7f4] rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div>
                <p className="font-medium text-[#240046]">Análise de {item.type}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
