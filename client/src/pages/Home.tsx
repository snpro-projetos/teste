import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  Settings,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#240046] via-[#1a0033] to-[#0d001a]">
      {/* Navigation */}
      <nav className="bg-[#240046]/80 backdrop-blur-md border-b border-[#ffcc00]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#ffcc00] rounded-lg flex items-center justify-center">
              <span className="text-[#240046] font-bold text-lg">Y</span>
            </div>
            <span className="text-2xl font-bold text-[#ffcc00]">Yoov ERP</span>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold"
          >
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Gestão Integrada do Seu
            <span className="block text-[#ffcc00]">Negócio em Um Só Lugar</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Yoov ERP é a solução completa para gerenciar vendas, financeiro, estoque,
            agenda e colaboradores com elegância e eficiência.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
              size="lg"
              className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold text-lg px-8"
            >
              Começar Agora
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10 font-bold text-lg px-8"
            >
              Conhecer Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Módulos Principais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <BarChart3 size={32} />,
              title: "Dashboard",
              description: "Visão geral completa com métricas em tempo real",
            },
            {
              icon: <DollarSign size={32} />,
              title: "Financeiro",
              description: "Contas a pagar/receber e fluxo de caixa",
            },
            {
              icon: <ShoppingCart size={32} />,
              title: "Vendas",
              description: "Gestão de clientes, pedidos e notas fiscais",
            },
            {
              icon: <Package size={32} />,
              title: "Estoque",
              description: "Controle de produtos e movimentações",
            },
            {
              icon: <Calendar size={32} />,
              title: "Agenda",
              description: "Compromissos, tarefas e calendário",
            },
            {
              icon: <Users size={32} />,
              title: "Colaboradores",
              description: "Gestão de funcionários e desempenho",
            },
            {
              icon: <Settings size={32} />,
              title: "Configurações",
              description: "Personalização e controle de acesso",
            },
            {
              icon: <CheckCircle size={32} />,
              title: "Notificações",
              description: "Alertas em tempo real para eventos críticos",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 bg-[#1a0033]/50 border-[#ffcc00]/20 hover:border-[#ffcc00]/50 hover:shadow-lg hover:shadow-[#ffcc00]/20 transition-all group cursor-pointer"
            >
              <div className="text-[#ffcc00] mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Por que escolher Yoov ERP?
            </h2>
            <div className="space-y-4">
              {[
                "Interface elegante e intuitiva",
                "Integração completa de módulos",
                "Dados em tempo real",
                "Relatórios e análises automáticas",
                "Segurança de dados garantida",
                "Suporte técnico dedicado",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-[#ffcc00]" />
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-8 bg-gradient-to-br from-[#ffcc00]/10 to-[#240046]/20 border-[#ffcc00]/30">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-5xl font-bold text-[#ffcc00]">100%</p>
                <p className="text-gray-300 mt-2">Funcional e Interativo</p>
              </div>
              <div className="space-y-2 text-center text-gray-300">
                <p>✓ Todos os módulos integrados</p>
                <p>✓ Mock de dados realistas</p>
                <p>✓ Pronto para produção</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Card className="p-12 bg-gradient-to-r from-[#ffcc00]/20 to-[#240046]/20 border-[#ffcc00]/30">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Comece agora com Yoov ERP e tenha controle total sobre todos os aspectos
            do seu negócio em uma única plataforma elegante.
          </p>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold text-lg px-8"
          >
            Acessar o Sistema
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d001a] border-t border-[#ffcc00]/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2025 Yoov ERP. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
