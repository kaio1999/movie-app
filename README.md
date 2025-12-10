# 🎬 Movie App - Sistema de Filmes com TMDB

Aplicação React moderna desenvolvida com TypeScript que permite aos usuários explorar filmes, criar listas personalizadas de favoritos e descobrir novos conteúdos através da API do The Movie Database (TMDB).

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?logo=tailwind-css)
![Vitest](https://img.shields.io/badge/Vitest-2.1.8-6E9F18?logo=vitest)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [API TMDB](#-api-tmdb)
- [Autor](#-autor)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como uma aplicação completa de gerenciamento de filmes utilizando a API do TMDB. A aplicação oferece uma experiência completa para explorar filmes populares, buscar filmes específicos, visualizar detalhes e gerenciar uma lista de favoritos.

### Características Principais

- ✨ Interface moderna e responsiva
- 🔍 Busca avançada de filmes
- ⭐ Sistema de favoritos com persistência local
- 📱 Design totalmente responsivo
- 🧪 Cobertura completa de testes unitários
- ⚡ Performance otimizada com lazy loading e infinite scroll

## 🚀 Tecnologias

### Core
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset do JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool e dev server ultra-rápido

### Roteamento e Estado
- **React Router DOM 7.10.1** - Roteamento e navegação
- **Context API** - Gerenciamento de estado global para favoritos

### Estilização
- **Tailwind CSS 3.4.18** - Framework CSS utility-first
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Adição automática de prefixos CSS

### HTTP e APIs
- **Axios 1.13.2** - Cliente HTTP para requisições à API TMDB

### Testes
- **Vitest 2.1.8** - Framework de testes rápido
- **React Testing Library 16.3.0** - Utilitários para testar componentes React
- **@testing-library/jest-dom** - Matchers adicionais para Jest/Vitest
- **@testing-library/user-event** - Simulação de interações do usuário
- **jsdom 27.3.0** - Ambiente DOM para testes

### Ferramentas de Desenvolvimento
- **ESLint 9.39.1** - Linter para JavaScript/TypeScript
- **TypeScript ESLint** - Regras ESLint para TypeScript

## ✨ Funcionalidades

### ✅ Páginas Implementadas

#### 1. **Home (/)** - Filmes Populares
- Header fixo com logo e barra de busca global
- Grid responsivo com filmes populares (2-6 colunas conforme breakpoint)
- Infinite scroll automático usando Intersection Observer
- Cada card exibe:
  - Poster do filme (`/w300/{poster_path}`)
  - Nota TMDB com badge amarelo
  - Ícone de favoritar (preenchido se já estiver na lista)
- Estados de loading e erro

#### 2. **Detalhes do Filme (/movie/:id)**
- Layout responsivo: imagem à esquerda, conteúdo à direita
- Imagem backdrop em alta resolução (`/original/{backdrop_path}`)
- Informações completas:
  - Título do filme
  - Gêneros com badges coloridos
  - Data de lançamento formatada (pt-BR)
  - Nota TMDB com ícone de estrela
  - Sinopse completa
- Botão de favoritar/remover dos favoritos com estado dinâmico
- Placeholder quando imagem não disponível

#### 3. **Favoritos (/favorites)**
- Grid responsivo semelhante à Home
- Lista todos os filmes marcados como favoritos
- Ícone de lixeira no card para remover dos favoritos
- Sistema de ordenação:
  - Título (A-Z)
  - Título (Z-A)
  - Nota (maior-menor)
  - Nota (menor-maior)
- Estado vazio com ícone SVG e call-to-action
- Persistência no localStorage

#### 4. **Busca (/search?q=termo)**
- Ativada via barra de busca no header ou acesso direto
- Valor da busca preenchido automaticamente na barra
- Resultados em grid igual à Home
- Infinite scroll para carregar mais resultados
- Destaque do termo buscado nos títulos (texto laranja)
- Contador de resultados encontrados
- Estado vazio quando não há resultados

### 🎨 Componentes Reutilizáveis

- **Layout** - Header fixo com navegação e busca global
- **MovieCard** - Card de filme com poster, nota e favorito
- **SearchBar** - Barra de busca com sincronização de URL
- **Loading** - Spinner de carregamento
- **Error** - Componente de erro com opção de retry
- **EmptyState** - Estado vazio com mensagem e call-to-action

### 🔧 Funcionalidades Técnicas

- ✅ Gerenciamento de estado global com Context API
- ✅ Persistência de favoritos no localStorage
- ✅ Infinite scroll com Intersection Observer
- ✅ Tratamento de erros em todas as requisições
- ✅ Loading states em todas as páginas
- ✅ Responsividade completa (mobile-first)
- ✅ Navegação com destaque de página ativa
- ✅ TypeScript com tipagem completa
- ✅ Testes unitários com 100% de cobertura dos componentes principais

## 📋 Pré-requisitos

- **Node.js** 20.19+ ou 22.12+ (recomendado)
- **npm** ou **yarn**
- **Conta no TMDB** e API Key ([obter aqui](https://www.themoviedb.org/settings/api))

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/kaio1999/movie-app.git
cd movie-app
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto:
```env
VITE_TMDB_API_KEY=sua_api_key_aqui
```

Para obter sua API Key:
1. Acesse [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Crie uma conta gratuita
3. Vá em [Settings > API](https://www.themoviedb.org/settings/api)
4. Solicite uma API Key
5. Copie a chave e cole no arquivo `.env`

## 🏃 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`

### Preview da Build
```bash
npm run preview
```
Visualiza a build de produção localmente

### Linting
```bash
npm run lint
```
Verifica problemas de código com ESLint

## 🧪 Testes

### Executar Testes
```bash
npm run test
```

### Executar Testes com UI
```bash
npm run test:ui
```

### Cobertura de Código
```bash
npm run test -- --coverage
```

**Status dos Testes:**
- ✅ **15 arquivos de teste**
- ✅ **102 testes passando**
- ✅ **0 testes falhando**
- ✅ **100% de cobertura** dos componentes principais

### Estrutura de Testes
```
src/
├── __tests__/              # Testes do App
├── components/
│   └── __tests__/         # Testes de componentes
├── pages/
│   └── __tests__/         # Testes de páginas
├── hooks/
│   └── __tests__/         # Testes de hooks
├── context/
│   └── __tests__/         # Testes de context
└── services/
    └── __tests__/         # Testes de serviços
```

## 📁 Estrutura do Projeto

```
movie-app/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Layout.tsx
│   │   ├── MovieCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Loading.tsx
│   │   ├── Error.tsx
│   │   ├── EmptyState.tsx
│   │   └── __tests__/     # Testes dos componentes
│   ├── pages/             # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── MovieDetailsPage.tsx
│   │   ├── FavoritesPage.tsx
│   │   ├── SearchPage.tsx
│   │   └── __tests__/     # Testes das páginas
│   ├── hooks/            # Custom hooks
│   │   ├── useMovies.ts
│   │   ├── useMovieDetails.ts
│   │   └── __tests__/     # Testes dos hooks
│   ├── context/          # Context API
│   │   ├── FavoritesContext.tsx
│   │   └── __tests__/     # Testes do context
│   ├── services/         # Serviços de API
│   │   ├── tmdbApi.ts
│   │   └── __tests__/     # Testes dos serviços
│   ├── types/           # Tipos TypeScript
│   │   └── movie.ts
│   ├── test/            # Configuração de testes
│   │   └── setup.ts
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Entry point
├── .env                 # Variáveis de ambiente (não versionado)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json        # Configuração TypeScript
├── vite.config.ts       # Configuração do Vite
├── tailwind.config.cjs  # Configuração do Tailwind
├── postcss.config.cjs   # Configuração do PostCSS
└── README.md
```

## 🌐 API TMDB

### Endpoints Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/movie/popular` | Lista filmes populares |
| GET | `/search/movie` | Busca filmes por termo |
| GET | `/movie/{id}` | Detalhes de um filme específico |

### Documentação
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TMDB API Settings](https://www.themoviedb.org/settings/api)

### Imagens
- **Poster**: `https://image.tmdb.org/t/p/w300/{poster_path}`
- **Backdrop**: `https://image.tmdb.org/t/p/original/{backdrop_path}`

## 🎨 Design e UX

- **Paleta de Cores:**
  - Azul (`bg-blue-600`) - Header e elementos principais
  - Amarelo (`bg-yellow-400`) - Badges de nota
  - Vermelho (`bg-red-500`) - Botões de favorito
  - Cinza (`bg-gray-800/900`) - Backgrounds
  - Laranja (`text-orange-400`) - Destaques e highlights

- **Responsividade:**
  - Mobile: 2 colunas
  - Tablet: 3-4 colunas
  - Desktop: 5-6 colunas

- **Animações:**
  - Hover effects nos cards
  - Transições suaves
  - Loading spinners

## 📚 Documentação Adicional

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

## 👨‍💻 Autor

**Kaio Santos**

- GitHub: [@kaio1999](https://github.com/kaio1999)
- Localização: São Paulo, Brasil
- Perfil: Engenheiro de software e entusiasta de tecnologia, focado no desenvolvimento Frontend usando React ⚛️, React Native 📱, GraphQL 🚀

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração técnica.

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📊 Estatísticas do Projeto

- **Versão:** 0.0.0
- **Testes:** 102 testes passando
- **Cobertura:** 100% dos componentes principais
- **Tecnologias:** React 19, TypeScript, Vite, Tailwind CSS
- **Status:** ✅ Completo e funcional

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
