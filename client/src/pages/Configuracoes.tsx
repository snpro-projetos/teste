import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, Users, Lock, Palette } from "lucide-react";
import { useState } from "react";

export default function Configuracoes() {
  const [companyData, setCompanyData] = useState({
    name: "Empresa Yoov",
    cnpj: "12.345.678/0001-90",
    email: "contato@yoov.com",
    phone: "(11) 3000-0000",
    address: "Rua Principal, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  });

  const [colors, setColors] = useState({
    primary: "#ffcc00",
    secondary: "#240046",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie dados da empresa, usuários e preferências do sistema
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#f9f7f4]">
            <TabsTrigger value="company">Empresa</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[#240046] font-semibold">
                    Nome da Empresa
                  </Label>
                  <Input
                    value={companyData.name}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, name: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-[#240046] font-semibold">CNPJ</Label>
                  <Input
                    value={companyData.cnpj}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, cnpj: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-[#240046] font-semibold">Email</Label>
                  <Input
                    type="email"
                    value={companyData.email}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, email: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-[#240046] font-semibold">Telefone</Label>
                  <Input
                    value={companyData.phone}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, phone: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-[#240046] font-semibold">Endereço</Label>
                  <Input
                    value={companyData.address}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        address: e.target.value,
                      })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-[#240046] font-semibold">Cidade</Label>
                  <Input
                    value={companyData.city}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, city: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-[#240046] font-semibold">Estado</Label>
                  <Input
                    value={companyData.state}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, state: e.target.value })
                    }
                    className="mt-2"
                    maxLength={2}
                  />
                </div>
                <div>
                  <Label className="text-[#240046] font-semibold">CEP</Label>
                  <Input
                    value={companyData.zipCode}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        zipCode: e.target.value,
                      })
                    }
                    className="mt-2"
                  />
                </div>
              </div>
              <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
                <Save size={20} className="mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="mt-6">
            <div className="space-y-4">
              <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
                <Users size={20} className="mr-2" />
                Adicionar Usuário
              </Button>

              <div className="space-y-3">
                {[
                  {
                    name: "João Silva",
                    email: "joao@company.com",
                    role: "admin",
                  },
                  {
                    name: "Maria Santos",
                    email: "maria@company.com",
                    role: "user",
                  },
                  {
                    name: "Pedro Oliveira",
                    email: "pedro@company.com",
                    role: "user",
                  },
                ].map((user, idx) => (
                  <Card
                    key={idx}
                    className="p-4 bg-[#f9f7f4] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[#240046]">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-[#ffcc00]/20 text-[#240046]"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.role === "admin" ? "Administrador" : "Usuário"}
                      </span>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Remover
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="permissions" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Controle de acesso por módulo e submódulo
              </p>

              <div className="space-y-3">
                {[
                  {
                    module: "Financeiro",
                    submodules: [
                      "Contas a Receber",
                      "Contas a Pagar",
                      "Fluxo de Caixa",
                    ],
                  },
                  {
                    module: "Vendas",
                    submodules: ["Pedidos", "Clientes", "Notas Fiscais"],
                  },
                  {
                    module: "Estoque",
                    submodules: ["Produtos", "Movimentações", "Relatórios"],
                  },
                ].map((item, idx) => (
                  <Card key={idx} className="p-4 bg-[#f9f7f4]">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-[#ffcc00] cursor-pointer"
                      />
                      <h4 className="font-semibold text-[#240046]">
                        {item.module}
                      </h4>
                    </div>
                    <div className="ml-7 space-y-2">
                      {item.submodules.map((sub, subIdx) => (
                        <div key={subIdx} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 rounded border-[#ffcc00] cursor-pointer"
                          />
                          <span className="text-sm text-muted-foreground">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
                <Save size={20} className="mr-2" />
                Salvar Permissões
              </Button>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[#240046] font-semibold">
                    Cor Primária
                  </Label>
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="color"
                      value={colors.primary}
                      onChange={(e) =>
                        setColors({ ...colors, primary: e.target.value })
                      }
                      className="w-16 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={colors.primary}
                      onChange={(e) =>
                        setColors({ ...colors, primary: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-[#240046] font-semibold">
                    Cor Secundária
                  </Label>
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="color"
                      value={colors.secondary}
                      onChange={(e) =>
                        setColors({ ...colors, secondary: e.target.value })
                      }
                      className="w-16 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={colors.secondary}
                      onChange={(e) =>
                        setColors({ ...colors, secondary: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-[#f9f7f4] border-2 border-dashed border-[#ffcc00]">
                <h4 className="font-semibold text-[#240046] mb-4">
                  Pré-visualização
                </h4>
                <div className="space-y-3">
                  <button
                    className="w-full px-4 py-2 rounded-lg font-bold text-white transition-colors"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                    }}
                  >
                    Botão Primário
                  </button>
                  <button
                    className="w-full px-4 py-2 rounded-lg font-bold text-white transition-colors"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.primary,
                    }}
                  >
                    Botão Secundário
                  </button>
                </div>
              </Card>

              <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
                <Palette size={20} className="mr-2" />
                Aplicar Tema
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
