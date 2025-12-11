import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, Plus, TrendingUp } from "lucide-react";

const mockOrders = [
  {
    id: 1,
    orderNumber: "PED-001",
    customer: "Empresa ABC",
    amount: 5000,
    date: "2025-01-10",
    status: "entregue",
  },
  {
    id: 2,
    orderNumber: "PED-002",
    customer: "Loja XYZ",
    amount: 3200,
    date: "2025-01-12",
    status: "enviado",
  },
  {
    id: 3,
    orderNumber: "PED-003",
    customer: "Comércio 123",
    amount: 1500,
    date: "2025-01-15",
    status: "confirmado",
  },
];

const mockCustomers = [
  {
    id: 1,
    name: "Empresa ABC",
    email: "contato@abc.com",
    phone: "(11) 3000-0000",
    status: "ativo",
  },
  {
    id: 2,
    name: "Loja XYZ",
    email: "vendas@xyz.com",
    phone: "(21) 3000-0000",
    status: "ativo",
  },
  {
    id: 3,
    name: "Comércio 123",
    email: "info@comercio123.com",
    phone: "(31) 3000-0000",
    status: "inativo",
  },
];

export default function Vendas() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Módulo de Vendas</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de clientes, pedidos, orçamentos e notas fiscais
          </p>
        </div>
        <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
          <Plus size={20} className="mr-2" />
          Novo Pedido
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-[#ffcc00]/10 to-[#ffcc00]/5 border-[#ffcc00]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#240046]">Pedidos Este Mês</p>
              <p className="text-3xl font-bold text-[#240046] mt-2">24</p>
            </div>
            <div className="bg-[#ffcc00]/20 p-3 rounded-lg">
              <ShoppingCart size={24} className="text-[#ffcc00]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Faturamento</p>
              <p className="text-3xl font-bold text-green-900 mt-2">R$ 125.400</p>
            </div>
            <div className="bg-green-200 p-3 rounded-lg">
              <TrendingUp size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Clientes Ativos</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">45</p>
            </div>
            <div className="bg-blue-200 p-3 rounded-lg">
              <ShoppingCart size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f9f7f4]">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        R$ {order.amount.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "entregue"
                              ? "bg-green-100 text-green-800"
                              : order.status === "enviado"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status === "entregue"
                            ? "Entregue"
                            : order.status === "enviado"
                            ? "Enviado"
                            : "Confirmado"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Customers */}
          <TabsContent value="customers" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            customer.status === "ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.status === "ativo" ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Pipeline */}
          <TabsContent value="pipeline" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["Prospecção", "Qualificação", "Proposta", "Fechamento"].map(
                (stage, idx) => (
                  <Card key={idx} className="p-4 bg-[#f9f7f4]">
                    <h4 className="font-semibold text-[#240046] mb-3">{stage}</h4>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="p-3 bg-white rounded-lg border border-[#f2f2f2] hover:shadow-md transition-shadow cursor-move"
                        >
                          <p className="text-sm font-medium text-[#240046]">
                            Oportunidade {idx * 2 + i}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            R$ 5.000
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
