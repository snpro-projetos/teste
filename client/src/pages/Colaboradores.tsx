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
import { Users, Plus, Award, TrendingUp } from "lucide-react";

const mockEmployees = [
  {
    id: 1,
    name: "João Silva",
    position: "Gerente de Vendas",
    department: "Vendas",
    email: "joao@company.com",
    phone: "(11) 9000-0000",
    hireDate: "2020-01-15",
    status: "ativo",
  },
  {
    id: 2,
    name: "Maria Santos",
    position: "Analista Financeiro",
    department: "Financeiro",
    email: "maria@company.com",
    phone: "(11) 9000-0001",
    hireDate: "2021-03-20",
    status: "ativo",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    position: "Operador de Estoque",
    department: "Estoque",
    email: "pedro@company.com",
    phone: "(11) 9000-0002",
    hireDate: "2022-06-10",
    status: "ativo",
  },
];

const mockPerformance = [
  {
    rank: 1,
    name: "João Silva",
    position: "Gerente de Vendas",
    score: 95,
    medal: "🥇",
  },
  {
    rank: 2,
    name: "Maria Santos",
    position: "Analista Financeiro",
    score: 88,
    medal: "🥈",
  },
  {
    rank: 3,
    name: "Pedro Oliveira",
    position: "Operador de Estoque",
    score: 82,
    medal: "🥉",
  },
];

export default function Colaboradores() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Colaboradores</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de funcionários, cargos e desempenho
          </p>
        </div>
        <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
          <Plus size={20} className="mr-2" />
          Novo Colaborador
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-[#ffcc00]/10 to-[#ffcc00]/5 border-[#ffcc00]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#240046]">Total de Colaboradores</p>
              <p className="text-3xl font-bold text-[#240046] mt-2">24</p>
            </div>
            <div className="bg-[#ffcc00]/20 p-3 rounded-lg">
              <Users size={24} className="text-[#ffcc00]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Ativos</p>
              <p className="text-3xl font-bold text-green-900 mt-2">23</p>
            </div>
            <div className="bg-green-200 p-3 rounded-lg">
              <TrendingUp size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Departamentos</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">5</p>
            </div>
            <div className="bg-blue-200 p-3 rounded-lg">
              <Users size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="employees" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f9f7f4]">
            <TabsTrigger value="employees">Funcionários</TabsTrigger>
            <TabsTrigger value="performance">Desempenho</TabsTrigger>
            <TabsTrigger value="departments">Departamentos</TabsTrigger>
          </TabsList>

          {/* Employees */}
          <TabsContent value="employees" className="mt-6">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f9f7f4]">
                    <TableHead>Nome</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Data de Admissão</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{employee.hireDate}</TableCell>
                      <TableCell>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Ativo
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

          {/* Performance Ranking */}
          <TabsContent value="performance" className="mt-6">
            <div className="space-y-4">
              {mockPerformance.map((employee) => (
                <Card
                  key={employee.rank}
                  className="p-4 bg-[#f9f7f4] border-l-4 border-l-[#ffcc00] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-[#ffcc00]">
                        {employee.medal}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#240046]">
                          {employee.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {employee.position}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Award size={20} className="text-[#ffcc00]" />
                        <span className="text-2xl font-bold text-[#240046]">
                          {employee.score}%
                        </span>
                      </div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#ffcc00] to-[#240046]"
                          style={{ width: `${employee.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Departments */}
          <TabsContent value="departments" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Vendas", count: 8, manager: "João Silva" },
                { name: "Financeiro", count: 4, manager: "Maria Santos" },
                { name: "Estoque", count: 5, manager: "Pedro Oliveira" },
                { name: "RH", count: 2, manager: "Ana Costa" },
                { name: "TI", count: 3, manager: "Carlos Mendes" },
              ].map((dept, idx) => (
                <Card
                  key={idx}
                  className="p-4 bg-[#f9f7f4] border-l-4 border-l-[#ffcc00] hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-[#240046]">{dept.name}</h4>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">{dept.count}</span> funcionários
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gerente: <span className="font-medium">{dept.manager}</span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
