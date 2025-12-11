import { drizzle } from "drizzle-orm/mysql2";
import {
  companies,
  users,
  customers,
  products,
  productCategories,
  orders,
  orderItems,
  accountsReceivable,
  accountsPayable,
  transactions,
  appointments,
  employees,
  departments,
  suppliers,
  invoices,
  stockMovements,
  notifications,
} from "./drizzle/schema.ts";

import dotenv from "dotenv";
dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const mockData = {
  companies: [
    {
      name: "Yoov Comércio LTDA",
      cnpj: "12.345.678/0001-90",
      email: "contato@yoov.com",
      phone: "(11) 3000-0000",
      address: "Rua Principal, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      website: "www.yoov.com",
      primaryColor: "#ffcc00",
      secondaryColor: "#240046",
    },
  ],
  departments: [
    { companyId: 1, name: "Vendas", description: "Departamento de Vendas" },
    { companyId: 1, name: "Financeiro", description: "Departamento Financeiro" },
    { companyId: 1, name: "Estoque", description: "Departamento de Estoque" },
    { companyId: 1, name: "RH", description: "Recursos Humanos" },
    { companyId: 1, name: "TI", description: "Tecnologia da Informação" },
  ],
  customers: [
    {
      companyId: 1,
      name: "Empresa ABC",
      email: "contato@abc.com",
      phone: "(11) 3000-0001",
      cpfCnpj: "98.765.432/0001-10",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01311-100",
      status: "active",
    },
    {
      companyId: 1,
      name: "Loja XYZ",
      email: "vendas@xyz.com",
      phone: "(21) 3000-0002",
      cpfCnpj: "87.654.321/0001-20",
      address: "Rua do Comércio, 500",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20040-020",
      status: "active",
    },
    {
      companyId: 1,
      name: "Comércio 123",
      email: "info@comercio123.com",
      phone: "(31) 3000-0003",
      cpfCnpj: "76.543.210/0001-30",
      address: "Av. Getúlio Vargas, 2000",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30130-100",
      status: "active",
    },
  ],
  productCategories: [
    { companyId: 1, name: "Eletrônicos", description: "Produtos eletrônicos" },
    { companyId: 1, name: "Alimentos", description: "Alimentos e bebidas" },
    { companyId: 1, name: "Vestuário", description: "Roupas e acessórios" },
    { companyId: 1, name: "Livros", description: "Livros e publicações" },
    { companyId: 1, name: "Cosméticos", description: "Produtos de beleza" },
  ],
  products: [
    {
      companyId: 1,
      sku: "PROD-001",
      name: "Notebook Dell",
      description: "Notebook Dell Inspiron 15",
      categoryId: 1,
      price: "2999.99",
      cost: "1800.00",
      quantity: 150,
      minimumQuantity: 50,
      unit: "UN",
      isActive: true,
    },
    {
      companyId: 1,
      sku: "PROD-002",
      name: "Mouse Logitech",
      description: "Mouse sem fio Logitech",
      categoryId: 1,
      price: "89.99",
      cost: "45.00",
      quantity: 25,
      minimumQuantity: 50,
      unit: "UN",
      isActive: true,
    },
    {
      companyId: 1,
      sku: "PROD-003",
      name: "Café Premium",
      description: "Café premium 500g",
      categoryId: 2,
      price: "49.99",
      cost: "20.00",
      quantity: 5,
      minimumQuantity: 20,
      unit: "UN",
      isActive: true,
    },
    {
      companyId: 1,
      sku: "PROD-004",
      name: "Camiseta Básica",
      description: "Camiseta básica 100% algodão",
      categoryId: 3,
      price: "89.99",
      cost: "30.00",
      quantity: 200,
      minimumQuantity: 50,
      unit: "UN",
      isActive: true,
    },
    {
      companyId: 1,
      sku: "PROD-005",
      name: "Livro Clean Code",
      description: "Clean Code - A Handbook of Agile Software Craftsmanship",
      categoryId: 4,
      price: "89.90",
      cost: "40.00",
      quantity: 30,
      minimumQuantity: 10,
      unit: "UN",
      isActive: true,
    },
  ],
  suppliers: [
    {
      companyId: 1,
      name: "Fornecedor A",
      email: "contato@fornecedor-a.com",
      phone: "(11) 2000-0000",
      cnpj: "11.111.111/0001-11",
      address: "Rua dos Fornecedores, 100",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      status: "ativo",
    },
    {
      companyId: 1,
      name: "Fornecedor B",
      email: "vendas@fornecedor-b.com",
      phone: "(21) 2000-0001",
      cnpj: "22.222.222/0001-22",
      address: "Av. Industrial, 500",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20040-020",
      status: "ativo",
    },
  ],
  employees: [
    {
      companyId: 1,
      name: "João Silva",
      email: "joao@yoov.com",
      phone: "(11) 9000-0000",
      cpf: "123.456.789-00",
      position: "Gerente de Vendas",
      departmentId: 1,
      hireDate: "2020-01-15",
      salary: "5000.00",
      status: "ativo",
      performanceScore: 95,
    },
    {
      companyId: 1,
      name: "Maria Santos",
      email: "maria@yoov.com",
      phone: "(11) 9000-0001",
      cpf: "234.567.890-00",
      position: "Analista Financeiro",
      departmentId: 2,
      hireDate: "2021-03-20",
      salary: "4500.00",
      status: "ativo",
      performanceScore: 88,
    },
    {
      companyId: 1,
      name: "Pedro Oliveira",
      email: "pedro@yoov.com",
      phone: "(11) 9000-0002",
      cpf: "345.678.901-00",
      position: "Operador de Estoque",
      departmentId: 3,
      hireDate: "2022-06-10",
      salary: "2500.00",
      status: "ativo",
      performanceScore: 82,
    },
  ],
  orders: [
    {
      companyId: 1,
      customerId: 1,
      orderNumber: "PED-001",
      status: "entregue",
      totalAmount: "5000.00",
      discountAmount: "0.00",
      taxAmount: "500.00",
      shippingAmount: "50.00",
      notes: "Pedido prioritário",
      orderDate: new Date("2025-01-10"),
      dueDate: new Date("2025-01-20"),
    },
    {
      companyId: 1,
      customerId: 2,
      orderNumber: "PED-002",
      status: "enviado",
      totalAmount: "3200.00",
      discountAmount: "0.00",
      taxAmount: "320.00",
      shippingAmount: "50.00",
      notes: "Cliente VIP",
      orderDate: new Date("2025-01-12"),
      dueDate: new Date("2025-01-22"),
    },
    {
      companyId: 1,
      customerId: 3,
      orderNumber: "PED-003",
      status: "confirmado",
      totalAmount: "1500.00",
      discountAmount: "0.00",
      taxAmount: "150.00",
      shippingAmount: "30.00",
      notes: "Primeira compra",
      orderDate: new Date("2025-01-15"),
      dueDate: new Date("2025-01-25"),
    },
  ],
  accountsReceivable: [
    {
      companyId: 1,
      customerId: 1,
      description: "Fatura PED-001",
      amount: "5000.00",
      dueDate: new Date("2025-01-20"),
      status: "pendente",
      notes: "Aguardando confirmação de recebimento",
    },
    {
      companyId: 1,
      customerId: 2,
      description: "Fatura PED-002",
      amount: "3200.00",
      dueDate: new Date("2025-01-22"),
      status: "pendente",
      notes: "Prazo de 30 dias",
    },
    {
      companyId: 1,
      customerId: 3,
      description: "Fatura PED-003",
      amount: "1500.00",
      dueDate: new Date("2024-12-25"),
      status: "vencido",
      notes: "Vencida há 17 dias",
    },
  ],
  accountsPayable: [
    {
      companyId: 1,
      supplierId: 1,
      description: "Compra de produtos eletrônicos",
      amount: "8000.00",
      dueDate: new Date("2025-01-10"),
      status: "pendente",
      notes: "Nota fiscal 12345",
    },
    {
      companyId: 1,
      supplierId: 2,
      description: "Compra de alimentos",
      amount: "4500.00",
      dueDate: new Date("2025-01-25"),
      status: "pendente",
      notes: "Nota fiscal 12346",
    },
  ],
  transactions: [
    {
      companyId: 1,
      type: "receita",
      category: "Vendas",
      description: "Venda PED-001",
      amount: "5000.00",
      transactionDate: new Date("2025-01-10"),
      status: "concluido",
      paymentMethod: "Cartão de Crédito",
    },
    {
      companyId: 1,
      type: "despesa",
      category: "Fornecedores",
      description: "Pagamento Fornecedor A",
      amount: "8000.00",
      transactionDate: new Date("2025-01-08"),
      status: "concluido",
      paymentMethod: "Transferência",
    },
  ],
  appointments: [
    {
      companyId: 1,
      userId: 1,
      customerId: 1,
      title: "Reunião com cliente ABC",
      description: "Discussão sobre novo projeto",
      startTime: new Date("2025-01-20 14:00"),
      endTime: new Date("2025-01-20 15:00"),
      location: "Sala de Reuniões 1",
      type: "reuniao",
      status: "agendado",
      reminderMinutes: 15,
    },
    {
      companyId: 1,
      userId: 2,
      title: "Preparar relatório mensal",
      description: "Relatório financeiro de janeiro",
      startTime: new Date("2025-01-18 10:00"),
      endTime: new Date("2025-01-18 12:00"),
      type: "tarefa",
      status: "agendado",
      reminderMinutes: 30,
    },
  ],
  notifications: [
    {
      companyId: 1,
      title: "Novo pedido recebido",
      content: "Pedido PED-003 foi criado com sucesso",
      type: "venda",
      isRead: false,
    },
    {
      companyId: 1,
      title: "Estoque baixo",
      content: "Produto PROD-003 está abaixo do nível mínimo",
      type: "estoque",
      isRead: false,
    },
    {
      companyId: 1,
      title: "Contas vencidas",
      content: "Você tem 1 conta a receber vencida",
      type: "financeiro",
      isRead: true,
    },
  ],
};

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando população do banco de dados...");

    // Insert companies
    console.log("📦 Inserindo empresas...");
    await db.insert(companies).values(mockData.companies);

    // Insert departments
    console.log("🏢 Inserindo departamentos...");
    await db.insert(departments).values(mockData.departments);

    // Insert customers
    console.log("👥 Inserindo clientes...");
    await db.insert(customers).values(mockData.customers);

    // Insert product categories
    console.log("📂 Inserindo categorias de produtos...");
    await db.insert(productCategories).values(mockData.productCategories);

    // Insert products
    console.log("📦 Inserindo produtos...");
    await db.insert(products).values(mockData.products);

    // Insert suppliers
    console.log("🏭 Inserindo fornecedores...");
    await db.insert(suppliers).values(mockData.suppliers);

    // Insert employees
    console.log("👨‍💼 Inserindo colaboradores...");
    await db.insert(employees).values(mockData.employees);

    // Insert orders
    console.log("📋 Inserindo pedidos...");
    await db.insert(orders).values(mockData.orders);

    // Insert accounts receivable
    console.log("💰 Inserindo contas a receber...");
    await db.insert(accountsReceivable).values(mockData.accountsReceivable);

    // Insert accounts payable
    console.log("💳 Inserindo contas a pagar...");
    await db.insert(accountsPayable).values(mockData.accountsPayable);

    // Insert transactions
    console.log("💸 Inserindo transações...");
    await db.insert(transactions).values(mockData.transactions);

    // Insert appointments
    console.log("📅 Inserindo compromissos...");
    await db.insert(appointments).values(mockData.appointments);

    // Insert notifications
    console.log("🔔 Inserindo notificações...");
    await db.insert(notifications).values(mockData.notifications);

    console.log("✅ Banco de dados populado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao popular banco de dados:", error);
    process.exit(1);
  }
}

seedDatabase();
