# 🚀 Yoov ERP - Sistema de Gestão Empresarial Integrado

Bem-vindo ao **Yoov ERP**, um sistema completo, elegante e 100% funcional para gestão integrada do seu negócio. Com 9 módulos principais, autenticação segura, análises com IA e integração com Stripe, o Yoov ERP oferece tudo que você precisa para gerenciar vendas, financeiro, estoque, agenda e colaboradores em uma única plataforma.

## ✨ Características Principais

- **Dashboard Inteligente**: Visão geral com KPIs em tempo real, gráficos interativos e alertas
- **9 Módulos Integrados**: Financeiro, Vendas, Estoque, Agenda, Colaboradores, Pagamentos, Análises e Configurações
- **Autenticação Segura**: OAuth com controle de roles (admin/user)
- **Análises com IA**: Insights automáticos e recomendações estratégicas com LLM
- **Integração Stripe**: Processamento de pagamentos integrado
- **Design Elegante**: Paleta Yoov com interface intuitiva e responsiva
- **Mock de Dados**: Dados realistas para demonstração imediata
- **100% Funcional**: Todos os módulos testados e prontos para uso

## 🎨 Design Visual

O Yoov ERP utiliza uma paleta de cores cuidadosamente selecionada para criar uma experiência visual elegante:

- **Amarelo Yoov** (#ffcc00) - Destaque e ações principais
- **Roxo Escuro** (#240046) - Fundo e textos principais
- **Branco** (#ffffff) - Fundo de cards e conteúdo
- **Cinza Suave** (#f2f2f2) - Backgrounds secundários

## 📦 Módulos Disponíveis

### 1. Dashboard
Visão geral consolidada com 4 KPIs principais, gráficos de vendas vs receitas, distribuição por categoria e próximos compromissos.

### 2. Financeiro
Gestão completa de contas a pagar, contas a receber, fluxo de caixa e relatórios financeiros.

### 3. Vendas
Cadastro de clientes, gestão de pedidos, pipeline de vendas e emissão de notas fiscais.

### 4. Estoque
Controle de produtos, categorias, movimentações e alertas de estoque baixo.

### 5. Agenda
Agendamento de compromissos, tarefas e eventos com visualização em calendário.

### 6. Colaboradores
Gestão de funcionários, departamentos, cargos e ranking de desempenho.

### 7. Pagamentos
Integração com Stripe para processar pagamentos e rastrear transações.

### 8. Análises
Insights automáticos com IA para Financeiro, Vendas e Estoque.

### 9. Configurações
Gestão de dados da empresa, usuários, permissões e personalização de tema.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 22.13.0 ou superior
- pnpm 10.4.1 ou superior
- MySQL 8.0 ou superior

### Instalação

```bash
# 1. Clonar o repositório
git clone <repository-url>
cd erp_yoov_mvp

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
# Copie o arquivo .env.example para .env e configure
cp .env.example .env

# 4. Executar migrações do banco de dados
pnpm db:push

# 5. Popular banco com mock de dados
npx tsx seed-db.mjs

# 6. Iniciar servidor de desenvolvimento
pnpm dev
```

### Acessar o Sistema

Após iniciar o servidor, acesse:

```
http://localhost:3000
```

Clique em "Entrar" e autentique-se com suas credenciais Manus OAuth.

## 📊 Dados Mock Inclusos

O sistema vem pré-populado com dados realistas:

- **1 Empresa**: Yoov Comércio LTDA
- **3 Clientes**: Empresa ABC, Loja XYZ, Comércio 123
- **5 Produtos**: Notebook Dell, Mouse Logitech, Café Premium, Camiseta, Livro
- **3 Pedidos**: Em diferentes estágios (confirmado, enviado, entregue)
- **3 Colaboradores**: Com scores de desempenho
- **3 Contas a Receber**: Com status variados
- **2 Contas a Pagar**: Pendentes
- **5 Departamentos**: Vendas, Financeiro, Estoque, RH, TI

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Iniciar servidor de desenvolvimento

# Banco de Dados
pnpm db:push          # Executar migrações
npx tsx seed-db.mjs   # Popular com mock de dados

# Testes
pnpm test             # Executar testes com Vitest

# Build
pnpm build            # Build para produção
pnpm start            # Iniciar servidor de produção

# Utilitários
pnpm format           # Formatar código com Prettier
pnpm check            # Verificar tipos TypeScript
```

## 🏗️ Arquitetura Técnica

### Stack Frontend
- **React 19** - Interface de usuário
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling elegante
- **Wouter** - Roteamento
- **tRPC** - API type-safe
- **Recharts** - Gráficos interativos
- **shadcn/ui** - Componentes reutilizáveis

### Stack Backend
- **Express 4** - Servidor HTTP
- **tRPC 11** - RPC framework
- **Drizzle ORM** - Acesso ao banco de dados
- **MySQL 2** - Driver MySQL

### Banco de Dados
- **22 Tabelas** normalizadas
- **Relacionamentos** entre entidades
- **Índices** para performance

## 📚 Documentação Completa

Para documentação detalhada sobre arquitetura, procedimentos tRPC, fluxos de dados e guias de extensão, consulte o arquivo `DOCUMENTACAO.md`.

## 🔐 Segurança

- Autenticação via Manus OAuth
- Controle de acesso baseado em roles
- Cookies seguros com HttpOnly
- Validação de entrada com Zod
- Procedimentos protegidos com `protectedProcedure`

## 🌐 Integrações

### Stripe
Processamento de pagamentos integrado com suporte a:
- Criar intents de pagamento
- Confirmar transações
- Rastrear status de pagamentos

### LLM
Análises automáticas com IA para:
- Análise Financeira (receitas, padrões, ticket médio)
- Análise de Vendas (clientes frequentes, produtos populares)
- Análise de Estoque (rotatividade, previsões)

### Notificações
Sistema de alertas para:
- Estoque baixo
- Contas vencidas
- Novas vendas
- Agendamentos

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🐛 Troubleshooting

### Servidor não inicia
```bash
# Verifique se a porta 3000 está disponível
lsof -i :3000

# Ou use uma porta diferente
PORT=3001 pnpm dev
```

### Banco de dados vazio
```bash
# Populate com mock de dados
npx tsx seed-db.mjs
```

### Autenticação não funciona
```bash
# Verifique as variáveis de ambiente
cat .env | grep OAUTH
```

## 📈 Próximos Passos

1. **Relatórios Avançados**: Gerar relatórios em PDF
2. **Notificações por Email**: Enviar alertas por email
3. **Importação de Dados**: Importar clientes/produtos via CSV
4. **Mobile App**: Versão mobile nativa
5. **API Pública**: Expor endpoints para integrações

## 📄 Licença

MIT License - Veja LICENSE.md para detalhes

## 👥 Suporte

Para suporte, dúvidas ou sugestões:
- Email: suporte@yoov.com
- Documentação: Veja `DOCUMENTACAO.md`
- Issues: Abra uma issue no repositório

## 🎉 Créditos

Desenvolvido por **Manus AI** - Plataforma de Desenvolvimento Inteligente

---

**Status**: ✅ MVP 100% Completo e Funcional  
**Versão**: 1.0.0  
**Data**: Janeiro 2025

Bem-vindo ao Yoov ERP! 🚀
