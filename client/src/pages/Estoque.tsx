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
import { Package, Plus, AlertTriangle, TrendingUp } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    sku: "PROD-001",
    name: "Produto A",
    category: "Eletrônicos",
    quantity: 150,
    minimum: 50,
    price: 299.99,
    status: "ok",
  },
  {
    id: 2,
    sku: "PROD-002",
    name: "Produto B",
    category: "Alimentos",
    quantity: 25,
    minimum: 50,
    price: 49.99,
    status: "baixo",
  },
  {
    id: 3,
    sku: "PROD-003",
    name: "Produto C",
    category: "Vestuário",
    quantity: 5,
    minimum: 20,
    price: 89.99,
    status: "crítico",
  },
];

const mockMovements = [
  {
    id: 1,
    product: "Produto A",
    type: "entrada",
    quantity: 50,
    date: "2025-01-15",
    reason: "Compra",
  },
  {
    id: 2,
    product: "Produto B",
    type: "saida",
    quantity: 10,
    date: "2025-01-14",
    reason: "Venda",
  },
  {
    id: 3,
    product: "Produto C",
    type: "ajuste",
    quantity: -5,
    date: "2025-01-13",
    reason: "Dano",
  },
];

export default function Estoque() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Módulo de Estoque</h1>
          <p className="text-muted-foreground mt-1">
            Controle de produtos, movimentações e níveis mínimos
          </p>
        </div>
        <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
          <Plus size={20} className="mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-[#ffcc00]/10 to-[#ffcc00]/5 border-[#ffcc00]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#240046]">Total de Produtos</p>
              <p className="text-3xl font-bold text-[#240046] mt-2">342</p>
            </div>
            <div className="bg-[#ffcc00]/20 p-3 rounded-lg">
              <Package size={24} className="text-[#ffcc00]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Valor Total</p>
              <p className="text-3xl font-bold text-green-900 mt-2">R$ 85.400</p>
            </div>
            <div className="bg-green-200 p-3 rounded-lg">
              <TrendingUp size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700">Estoque Baixo</p>
              <p className="text-3xl font-bold text-orange-900 mt-2">12</p>
            </div>
            <div className="bg-orange-200 p-3 rounded-lg">
              <AlertTriangle size={24} className="text-orange-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Crítico</p>
              <p className="text-3xl font-bold text-red-900 mt-2">3</p>
            </div>
            <div className="bg-red-200 p-3 rounded-lg">
              <AlertTriangle size={24} className="text-red-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f9f7f4]">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="movements">Movimentações</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
          </TabsList>

          {/* Products */}
          <TabsContent value="products" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>SKU</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Mínimo</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.sku}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.minimum}</TableCell>
                      <TableCell>
                        R$ {product.price.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.status === "ok"
                              ? "bg-green-100 text-green-800"
                              : product.status === "baixo"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status === "ok"
                            ? "OK"
                            : product.status === "baixo"
                            ? "Baixo"
                            : "Crítico"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Movements */}
          <TabsContent value="movements" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Produto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">
                        {movement.product}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            movement.type === "entrada"
                              ? "bg-green-100 text-green-800"
                              : movement.type === "saida"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {movement.type === "entrada"
                            ? "Entrada"
                            : movement.type === "saida"
                            ? "Saída"
                            : "Ajuste"}
                        </span>
                      </TableCell>
                      <TableCell>{movement.quantity}</TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell>{movement.reason}</TableCell>
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

          {/* Categories */}
          <TabsContent value="categories" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Eletrônicos", "Alimentos", "Vestuário", "Livros", "Cosméticos", "Outros"].map(
                (category, idx) => (
                  <Card
                    key={idx}
                    className="p-4 bg-[#f9f7f4] hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <h4 className="font-semibold text-[#240046]">{category}</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.floor(Math.random() * 50) + 10} produtos
                    </p>
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
