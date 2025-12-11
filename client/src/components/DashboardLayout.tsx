import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  DollarSign,
  ShoppingCart,
  Package,
  Calendar,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { getLoginUrl } from "@/const";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  { label: "Financeiro", icon: <DollarSign size={20} />, href: "/financeiro" },
  { label: "Vendas", icon: <ShoppingCart size={20} />, href: "/vendas" },
  { label: "Estoque", icon: <Package size={20} />, href: "/estoque" },
  { label: "Agenda", icon: <Calendar size={20} />, href: "/agenda" },
  { label: "Colaboradores", icon: <Users size={20} />, href: "/colaboradores" },
  { label: "Pagamentos", icon: <DollarSign size={20} />, href: "/pagamentos" },
  { label: "Análises", icon: <LayoutDashboard size={20} />, href: "/analises" },
  { label: "Configurações", icon: <Settings size={20} />, href: "/configuracoes" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [, setLocation] = useLocation();
  const { user, logout, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#240046] to-[#1a0033]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ffcc00]/20 border-t-[#ffcc00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#240046] to-[#1a0033]">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold text-[#ffcc00]">Yoov ERP</h1>
            <p className="text-sm text-gray-300 text-center">
              Gestão integrada do seu negócio. Faça login para continuar.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="w-full bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold shadow-lg"
          >
            Entrar no Sistema
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-[#240046] to-[#1a0033] text-white transition-all duration-300 flex flex-col border-r border-[#ffcc00]/20 shadow-lg`}
      >
        {/* Logo/Header */}
        <div className="p-4 border-b border-[#ffcc00]/20 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-[#ffcc00]">Yoov ERP</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#ffcc00]/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => setLocation(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#ffcc00]/10 transition-colors text-left group"
            >
              <span className="text-[#ffcc00] group-hover:text-[#ffff33]">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-[#ffcc00] text-[#240046] text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#ffcc00]/20">
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-[#ffcc00]">{user?.name || "Usuário"}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize mt-1">{user?.role === "admin" ? "Administrador" : "Usuário"}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full text-xs bg-transparent border-[#ffcc00]/30 hover:bg-[#ffcc00]/10"
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-2 hover:bg-[#ffcc00]/10 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut size={20} className="text-[#ffcc00]" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Bem-vindo ao Yoov ERP</h2>
            <p className="text-sm text-muted-foreground">Gestão integrada do seu negócio</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role === "admin" ? "Administrador" : "Usuário"}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-[#f9f7f4]">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
