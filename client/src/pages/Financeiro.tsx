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
import { DollarSign, TrendingUp, TrendingDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockAccountsReceivable = [
  {
    id: 1,
    customer: "Empresa ABC",
    amount: 5000,
    dueDate: "2025-01-15",
    status: "pendente",
  },
  {
    id: 2,
    customer: "Loja XYZ",
    amount: 3200,
    dueDate: "2025-01-20",
    status: "pendente",
  },
  {
    id: 3,
    customer: "Comércio 123",
    amount: 1500,
    dueDate: "2024-12-25",
    status: "vencido",
  },
];

const mockAccountsPayable = [
  {
    id: 1,
    supplier: "Fornecedor A",
    amount: 8000,
    dueDate: "2025-01-10",
    status: "pendente",
  },
  {
    id: 2,
    supplier: "Fornecedor B",
    amount: 4500,
    dueDate: "2025-01-25",
    status: "pendente",
  },
  {
    id: 3,
    supplier: "Fornecedor C",
    amount: 2000,
    dueDate: "2024-12-20",
    status: "pago",
  },
];

export default function Financeiro() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "receita",
    description: "",
    amount: "",
    dueDate: "",
    party: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.dueDate || !formData.party) {
      toast.error("Preencha todos os campos!");
      return;
    }

    toast.success(`Transação de ${formData.type} adicionada com sucesso!`);
    setIsDialogOpen(false);
    setFormData({
      type: "receita",
      description: "",
      amount: "",
      dueDate: "",
      party: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Módulo Financeiro</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de contas a pagar, contas a receber e fluxo de caixa
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
              <Plus size={20} className="mr-2" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[#240046]">Nova Transação</DialogTitle>
              <DialogDescription>
                Adicione uma nova transação financeira ao sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Transação</Label>
                <Select value={formData.type} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Conta a Receber</SelectItem>
                    <SelectItem value="despesa">Conta a Pagar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="party">
                  {formData.type === "receita" ? "Cliente" : "Fornecedor"}
                </Label>
                <Input
                  id="party"
                  name="party"
                  placeholder={formData.type === "receita" ? "Nome do cliente" : "Nome do fornecedor"}
                  value={formData.party}
                  onChange={handleInputChange}
                  className="border-[#f2f2f2]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Descrição da transação"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border-[#f2f2f2]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0,00"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="border-[#f2f2f2]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="border-[#f2f2f2]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold flex-1"
                >
                  Adicionar Transação
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Receitas Totais</p>
              <p className="text-3xl font-bold text-green-900 mt-2">R$ 125.400</p>
            </div>
            <div className="bg-green-200 p-3 rounded-lg">
              <TrendingUp size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Despesas Totais</p>
              <p className="text-3xl font-bold text-red-900 mt-2">R$ 45.200</p>
            </div>
            <div className="bg-red-200 p-3 rounded-lg">
              <TrendingDown size={24} className="text-red-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Saldo Líquido</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">R$ 80.200</p>
            </div>
            <div className="bg-blue-200 p-3 rounded-lg">
              <DollarSign size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="receivable" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f9f7f4]">
            <TabsTrigger value="receivable">Contas a Receber</TabsTrigger>
            <TabsTrigger value="payable">Contas a Pagar</TabsTrigger>
            <TabsTrigger value="cashflow">Fluxo de Caixa</TabsTrigger>
          </TabsList>

          {/* Accounts Receivable */}
          <TabsContent value="receivable" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAccountsReceivable.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.customer}</TableCell>
                      <TableCell>
                        R$ {item.amount.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "pendente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status === "pendente" ? "Pendente" : "Vencido"}
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

          {/* Accounts Payable */}
          <TabsContent value="payable" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAccountsPayable.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.supplier}</TableCell>
                      <TableCell>
                        R$ {item.amount.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "pendente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status === "pendente" ? "Pendente" : "Pago"}
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

          {/* Cash Flow */}
          <TabsContent value="cashflow" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Relatório de fluxo de caixa em desenvolvimento
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
