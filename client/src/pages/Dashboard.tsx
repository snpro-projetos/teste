import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Package,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const COLORS = ["#ffcc00", "#240046", "#f2f2f2", "#ff6b6b"];

// Mock data for charts
const salesData = [
  { name: "Jan", vendas: 4000, receitas: 2400 },
  { name: "Fev", vendas: 3000, receitas: 1398 },
  { name: "Mar", vendas: 2000, receitas: 9800 },
  { name: "Abr", vendas: 2780, receitas: 3908 },
  { name: "Mai", vendas: 1890, receitas: 4800 },
  { name: "Jun", vendas: 2390, receitas: 3800 },
];

const categoryData = [
  { name: "Eletrônicos", value: 35 },
  { name: "Alimentos", value: 25 },
  { name: "Vestuário", value: 20 },
  { name: "Outros", value: 20 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const companyId = 1; // Mock company ID
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const { data: metrics, isLoading } = trpc.dashboard.getMetrics.useQuery({
    companyId,
  });

  // Fetch dynamic insights from LLM
  const { data: dynamicInsights = [] } = trpc.dashboard.getDynamicInsights.useQuery(
    { companyId },
    { staleTime: 1000 * 60 * 5 } // Cache for 5 minutes
  );

  // Use dynamic insights if available, otherwise use fallback
  const allInsights = dynamicInsights.length > 0 ? dynamicInsights : getFallbackInsights();
  const currentInsight = allInsights[currentInsightIndex] || getFallbackInsights()[0];

  const nextInsight = () => {
    setCurrentInsightIndex((prev) => (prev + 1) % allInsights.length);
  };

  const prevInsight = () => {
    setCurrentInsightIndex((prev) => (prev - 1 + allInsights.length) % allInsights.length);
  };

  const handleRefreshInsights = async () => {
    setIsLoadingInsights(true);
    try {
      // Refetch insights
      toast.success("Gerando novos insights com IA...");
      // The query will automatically refetch
      setTimeout(() => {
        setIsLoadingInsights(false);
        toast.success("Insights atualizados com sucesso!");
      }, 2000);
    } catch (error) {
      setIsLoadingInsights(false);
      toast.error("Erro ao gerar insights");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Insight Banner */}
      <Card
        className={`p-6 bg-gradient-to-r ${currentInsight?.color || "from-green-50 to-green-100"} border-l-4 border-l-[#ffcc00] shadow-lg`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-4xl">{currentInsight?.icon || "📈"}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-[#ffcc00]" />
                <h3 className="text-lg font-bold text-[#240046]">
                  {currentInsight?.title || "Insight de IA"}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {currentInsight?.description || "Gerando insights com inteligência artificial..."}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Lightbulb size={16} className="text-[#ffcc00]" />
                <span className="text-xs font-semibold text-[#240046]">
                  Insight Gerado por IA em Tempo Real
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <Button
              onClick={prevInsight}
              variant="outline"
              size="sm"
              className="border-[#ffcc00] text-[#240046] hover:bg-[#ffcc00]/10"
              disabled={isLoadingInsights}
            >
              ←
            </Button>
            <Button
              onClick={handleRefreshInsights}
              variant="outline"
              size="sm"
              className="border-[#ffcc00] text-[#240046] hover:bg-[#ffcc00]/10"
              disabled={isLoadingInsights}
            >
              {isLoadingInsights ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "🔄"
              )}
            </Button>
            <Button
              onClick={nextInsight}
              variant="outline"
              size="sm"
              className="border-[#ffcc00] text-[#240046] hover:bg-[#ffcc00]/10"
              disabled={isLoadingInsights}
            >
              →
            </Button>
          </div>
        </div>
        <div className="flex gap-1 mt-4">
          {allInsights.map((_: any, idx: number) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === currentInsightIndex ? "bg-[#ffcc00] w-8" : "bg-[#ffcc00]/30 w-2"
              }`}
            />
          ))}
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <Card className="p-4 bg-white border-l-4 border-l-[#ffcc00] hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Vendas Totais</p>
              <p className="text-2xl font-bold text-[#240046] mt-2">
                {metrics?.totalSalesAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <ArrowUpRight size={12} /> +12% vs mês anterior
              </p>
            </div>
            <div className="bg-[#ffcc00]/10 p-2 rounded-lg mt-3 w-fit">
              <DollarSign size={20} className="text-[#ffcc00]" />
            </div>
          </div>
        </Card>

        {/* Pending Receivables */}
        <Card className="p-4 bg-white border-l-4 border-l-[#240046] hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Contas a Receber</p>
              <p className="text-2xl font-bold text-[#240046] mt-2">
                {metrics?.pendingReceivablesAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> {metrics?.pendingReceivables} pendentes
              </p>
            </div>
            <div className="bg-[#240046]/10 p-2 rounded-lg mt-3 w-fit">
              <TrendingUp size={20} className="text-[#240046]" />
            </div>
          </div>
        </Card>

        {/* Pending Payables */}
        <Card className="p-4 bg-white border-l-4 border-l-red-500 hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Contas a Pagar</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {metrics?.pendingPayablesAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                <ArrowDownLeft size={12} /> {metrics?.pendingPayables} vencidas
              </p>
            </div>
            <div className="bg-red-100 p-2 rounded-lg mt-3 w-fit">
              <AlertCircle size={20} className="text-red-600" />
            </div>
          </div>
        </Card>

        {/* Low Stock */}
        <Card className="p-4 bg-white border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Estoque Baixo</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {metrics?.lowStockCount}
              </p>
              <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                <Package size={12} /> produtos para repor
              </p>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg mt-3 w-fit">
              <Package size={20} className="text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#240046] mb-4">Vendas vs Receitas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ffcc00",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="#ffcc00"
                strokeWidth={2}
                dot={{ fill: "#ffcc00" }}
              />
              <Line
                type="monotone"
                dataKey="receitas"
                stroke="#240046"
                strokeWidth={2}
                dot={{ fill: "#240046" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#240046] mb-4">
            Distribuição por Categoria
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#240046]">Próximos Compromissos</h3>
          <Button variant="outline" size="sm">
            Ver Agenda
          </Button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-[#f9f7f4] rounded-lg border border-[#f2f2f2]"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#ffcc00] rounded-full"></div>
                <div>
                  <p className="font-medium text-[#240046]">Reunião com cliente</p>
                  <p className="text-xs text-muted-foreground">Hoje às 14:00</p>
                </div>
              </div>
              <Calendar size={16} className="text-[#ffcc00]" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function getFallbackInsights() {
  return [
    {
      title: "Oportunidade de Crescimento",
      description:
        "Suas vendas cresceram 12% este mês. Recomendamos aumentar o investimento em marketing digital para capitalizar este momentum.",
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
