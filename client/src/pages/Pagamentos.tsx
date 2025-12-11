import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const mockPayments = [
  {
    id: 1,
    orderId: "PED-001",
    customer: "Empresa ABC",
    amount: 5000,
    date: "2025-01-15",
    status: "sucesso",
    method: "Cartão de Crédito",
  },
  {
    id: 2,
    orderId: "PED-002",
    customer: "Loja XYZ",
    amount: 3200,
    date: "2025-01-14",
    status: "sucesso",
    method: "Transferência Bancária",
  },
  {
    id: 3,
    orderId: "PED-003",
    customer: "Comércio 123",
    amount: 1500,
    date: "2025-01-13",
    status: "pendente",
    method: "Cartão de Crédito",
  },
];

export default function Pagamentos() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    orderId: "",
    amount: "",
    customerEmail: "",
  });

  const handleCreatePayment = async () => {
    // Mock payment creation
    alert(
      `Pagamento de R$ ${paymentData.amount} criado com sucesso!\nID: pi_${Math.random().toString(36).substr(2, 9)}`
    );
    setPaymentData({ orderId: "", amount: "", customerEmail: "" });
    setShowPaymentForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Pagamentos</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de pagamentos com integração Stripe
          </p>
        </div>
        <Button
          onClick={() => setShowPaymentForm(!showPaymentForm)}
          className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold"
        >
          <Plus size={20} className="mr-2" />
          Novo Pagamento
        </Button>
      </div>

      {/* Payment Form */}
      {showPaymentForm && (
        <Card className="p-6 bg-[#f9f7f4] border-2 border-[#ffcc00]">
          <h3 className="text-lg font-semibold text-[#240046] mb-4">
            Criar Novo Pagamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label className="text-[#240046] font-semibold">Pedido</Label>
              <Input
                placeholder="PED-001"
                value={paymentData.orderId}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, orderId: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-[#240046] font-semibold">Valor (R$)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={paymentData.amount}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, amount: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-[#240046] font-semibold">Email do Cliente</Label>
              <Input
                type="email"
                placeholder="cliente@example.com"
                value={paymentData.customerEmail}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, customerEmail: e.target.value })
                }
                className="mt-2"
              />
            </div>
          </div>

          {/* Stripe Integration Info */}
          <div className="bg-white p-4 rounded-lg border border-[#f2f2f2] mb-6">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} className="text-[#ffcc00]" />
              <p className="font-semibold text-[#240046]">Integração Stripe</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Este formulário criará uma intent de pagamento Stripe. O cliente receberá
              um link para completar o pagamento de forma segura.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCreatePayment}
              className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold"
            >
              Criar Intent de Pagamento
            </Button>
            <Button
              onClick={() => setShowPaymentForm(false)}
              variant="outline"
            >
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Pagamentos Processados</p>
              <p className="text-3xl font-bold text-green-900 mt-2">R$ 125.400</p>
            </div>
            <div className="bg-green-200 p-3 rounded-lg">
              <CheckCircle size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">Pendentes</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">R$ 1.500</p>
            </div>
            <div className="bg-yellow-200 p-3 rounded-lg">
              <AlertCircle size={24} className="text-yellow-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Taxa de Sucesso</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">98.5%</p>
            </div>
            <div className="bg-blue-200 p-3 rounded-lg">
              <CreditCard size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f9f7f4]">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="success">Sucesso</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
          </TabsList>

          {/* All Payments */}
          <TabsContent value="all" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.orderId}</TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell>
                        R$ {payment.amount.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.status === "sucesso"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status === "sucesso" ? "Sucesso" : "Pendente"}
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

          {/* Success Payments */}
          <TabsContent value="success" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Método</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayments
                    .filter((p) => p.status === "sucesso")
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.orderId}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>
                          R$ {payment.amount.toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Pending Payments */}
          <TabsContent value="pending" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayments
                    .filter((p) => p.status === "pendente")
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.orderId}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>
                          R$ {payment.amount.toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046]">
                            Enviar Link
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
