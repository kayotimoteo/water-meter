# 💧 Water Meter

Um aplicativo moderno e intuitivo para rastrear seu consumo diário de água. Mantenha-se hidratado de forma fácil e visual!

![Water Meter](https://img.shields.io/badge/Status-Active-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.132-orange)

## 📋 Sobre o Projeto

O **Water Meter** é uma aplicação web desenvolvida para ajudar você a monitorar e manter um hábito saudável de consumo de água. Com uma interface moderna e intuitiva, você pode facilmente registrar seu consumo diário, acompanhar seu progresso em relação à meta estabelecida e visualizar seu histórico completo.

### ✨ Funcionalidades

- 🎯 **Meta Diária**: Configure e acompanhe sua meta de consumo de água (padrão: 3000ml)
- 📊 **Dashboard Visual**: Veja seu consumo do dia com uma barra de progresso animada
- ⚡ **Registro Rápido**: Botões de acesso rápido para quantidades comuns (250ml, 500ml, 710ml, 1000ml)
- 🔢 **Quantidade Personalizada**: Digite qualquer quantidade em ml
- 📅 **Histórico Completo**: Visualize todos os seus registros organizados por data
- 🗑️ **Gerenciamento**: Delete registros individualmente quando necessário
- 📋 **Exportação**: Copie seus dados em formato JSON para backup ou análise
- 💾 **Armazenamento Local**: Seus dados são salvos localmente no navegador
- 🌙 **Tema Escuro**: Interface moderna com tema escuro otimizado

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **[React](https://react.dev/)** (v19.2) - Biblioteca JavaScript para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** (v5.7) - Superset do JavaScript com tipagem estática
- **[TanStack Router](https://tanstack.com/router)** (v1.132) - Roteamento declarativo e type-safe
- **[TanStack Query](https://tanstack.com/query)** (v5.66) - Gerenciamento de estado assíncrono
- **[TanStack React DB](https://tanstack.com/react-db)** - Gerenciamento de dados local
- **[Vite](https://vitejs.dev/)** (v7.1) - Build tool e dev server ultra-rápido
- **[Tailwind CSS](https://tailwindcss.com/)** (v4.0) - Framework CSS utility-first
- **[Biome](https://biomejs.dev/)** (v2.3) - Linter e formatador rápido
- **[Zod](https://zod.dev/)** (v4.0) - Validação de schemas TypeScript-first
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones moderna
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Deploy e hospedagem edge

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Bun](https://bun.sh/)** (recomendado) ou **[Node.js](https://nodejs.org/)** (v18 ou superior)
- Um editor de código (recomendado: [VS Code](https://code.visualstudio.com/))
- Git (para clonar o repositório)

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/kayotimoteo/water-meter.git
cd water-meter
```

2. **Instale as dependências**

```bash
bun install
```

ou, se estiver usando npm:

```bash
npm install
```

## 💻 Como Executar

### Modo de Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
bun run dev
```

ou:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para Produção

Para criar uma build de produção:

```bash
bun run build
```

ou:

```bash
npm run build
```

### Preview da Build

Para visualizar a build de produção localmente:

```bash
bun run preview
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `dev` | Inicia o servidor de desenvolvimento na porta 3000 |
| `build` | Cria uma build otimizada para produção |
| `preview` | Visualiza a build de produção localmente |
| `test` | Executa os testes com Vitest |
| `lint` | Executa o linter Biome |
| `format` | Formata o código com Biome |
| `check` | Executa lint e format em um único comando |
| `deploy` | Faz build e deploy para Cloudflare Workers |

## 📁 Estrutura do Projeto

```
water-meter/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── db-collections/     # Definições de coleções de dados
│   │   ├── index.ts
│   │   └── water.ts
│   ├── hooks/              # Custom hooks
│   │   └── useWater.ts     # Hook principal para gerenciamento de água
│   ├── integrations/       # Integrações de terceiros
│   │   └── tanstack-query/ # Configuração do TanStack Query
│   ├── lib/                # Utilitários e helpers
│   │   └── utils.ts
│   ├── routes/             # Rotas do TanStack Router
│   │   ├── __root.tsx      # Layout raiz
│   │   ├── index.tsx       # Página principal
│   │   └── history.tsx     # Página de histórico
│   ├── router.tsx          # Configuração do router
│   └── styles.css          # Estilos globais
├── biome.json              # Configuração do Biome
├── components.json          # Configuração do Shadcn UI
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração do TypeScript
├── vite.config.ts          # Configuração do Vite
└── wrangler.jsonc          # Configuração do Cloudflare Workers
```

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests.

### Passos para Contribuir

1. **Fork o projeto**

   Clique no botão "Fork" no topo da página do repositório.

2. **Crie uma branch para sua feature**

```bash
git checkout -b feature/MinhaNovaFeature
```

3. **Faça suas alterações**

   - Siga os padrões de código do projeto
   - Execute `bun run check` para garantir que não há erros de lint ou formatação
   - Adicione testes se aplicável

4. **Commit suas alterações**

```bash
git commit -m "feat: adiciona nova funcionalidade"
```

   Use mensagens de commit descritivas seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` para novas funcionalidades
   - `fix:` para correções de bugs
   - `docs:` para mudanças na documentação
   - `style:` para formatação, ponto e vírgula faltando, etc
   - `refactor:` para refatoração de código
   - `test:` para adicionar ou modificar testes
   - `chore:` para mudanças em ferramentas, configurações, etc

5. **Push para a branch**

```bash
git push origin feature/MinhaNovaFeature
```

6. **Abra um Pull Request**

   Vá até o repositório no GitHub e abra um Pull Request descrevendo suas alterações.

### Diretrizes de Contribuição

- ✅ Mantenha o código limpo e bem documentado
- ✅ Siga os padrões de código existentes no projeto
- ✅ Adicione testes para novas funcionalidades quando possível
- ✅ Atualize a documentação se necessário
- ✅ Certifique-se de que todos os testes passam antes de fazer o PR
- ✅ Execute `bun run check` antes de commitar

### Reportando Bugs

Se você encontrou um bug, por favor abra uma issue com:

- Descrição clara do problema
- Passos para reproduzir o bug
- Comportamento esperado vs comportamento atual
- Screenshots (se aplicável)
- Informações do ambiente (navegador, sistema operacional, etc)

### Sugerindo Funcionalidades

Tem uma ideia para melhorar o projeto? Abra uma issue com:

- Descrição detalhada da funcionalidade
- Casos de uso e exemplos
- Benefícios que traria ao projeto

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- [TanStack](https://tanstack.com/) pela incrível suíte de ferramentas
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS
- [Lucide](https://lucide.dev/) pelos ícones
- Todos os contribuidores que ajudam a melhorar este projeto

## 📞 Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para:

- Abrir uma [issue](https://github.com/kayotimoteo/water-meter/issues)
- Enviar um [pull request](https://github.com/kayotimoteo/water-meter/pulls)

---

Feito com 💧 e ❤️ para ajudar você a se manter hidratado!
2025 - Kayo Timoteo
