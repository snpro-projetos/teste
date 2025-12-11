import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Financeiro from "./pages/Financeiro";
import Vendas from "./pages/Vendas";
import Estoque from "./pages/Estoque";
import Agenda from "./pages/Agenda";
import Colaboradores from "./pages/Colaboradores";
import Pagamentos from "./pages/Pagamentos";
import Analises from "./pages/Analises";
import Configuracoes from "./pages/Configuracoes";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard">
        {() => (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        )}
      </Route>

      {/* Financeiro Routes */}
      <Route path="/financeiro">
        {() => (
          <DashboardLayout>
            <Financeiro />
          </DashboardLayout>
        )}
      </Route>

      {/* Vendas Routes */}
      <Route path="/vendas">
        {() => (
          <DashboardLayout>
            <Vendas />
          </DashboardLayout>
        )}
      </Route>

      {/* Estoque Routes */}
      <Route path="/estoque">
        {() => (
          <DashboardLayout>
            <Estoque />
          </DashboardLayout>
        )}
      </Route>

      {/* Agenda Routes */}
      <Route path="/agenda">
        {() => (
          <DashboardLayout>
            <Agenda />
          </DashboardLayout>
        )}
      </Route>

      {/* Colaboradores Routes */}
      <Route path="/colaboradores">
        {() => (
          <DashboardLayout>
            <Colaboradores />
          </DashboardLayout>
        )}
      </Route>

      {/* Pagamentos Routes */}
      <Route path="/pagamentos">
        {() => (
          <DashboardLayout>
            <Pagamentos />
          </DashboardLayout>
        )}
      </Route>

      {/* Análises Routes */}
      <Route path="/analises">
        {() => (
          <DashboardLayout>
            <Analises />
          </DashboardLayout>
        )}
      </Route>

      {/* Configurações Routes */}
      <Route path="/configuracoes">
        {() => (
          <DashboardLayout>
            <Configuracoes />
          </DashboardLayout>
        )}
      </Route>

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
