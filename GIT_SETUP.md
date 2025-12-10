# 🚀 Guia de Configuração do Git e GitHub

## Passo a Passo para Conectar ao Repositório

### 1. Inicializar o Repositório Git

```bash
git init
```

### 2. Adicionar Todos os Arquivos

```bash
git add .
```

### 3. Fazer o Primeiro Commit

```bash
git commit -m "Initial commit: Movie App com React, TypeScript e TMDB API"
```

### 4. Adicionar o Repositório Remoto

```bash
git remote add origin https://github.com/kaio1999/movie-app.git
```

### 5. Renomear a Branch Principal (se necessário)

```bash
git branch -M main
```

### 6. Fazer Push para o GitHub

```bash
git push -u origin main
```

## ⚠️ Importante

Antes de fazer o push, certifique-se de:

1. ✅ Criar o arquivo `.env` com sua API Key (não será commitado)
2. ✅ Verificar se o `.gitignore` está configurado corretamente
3. ✅ Criar o repositório no GitHub primeiro (se ainda não existir)

## 📝 Criar Repositório no GitHub

1. Acesse [https://github.com/kaio1999](https://github.com/kaio1999)
2. Clique em "New repository"
3. Nome: `movie-app`
4. Descrição: "Aplicação React para explorar filmes usando TMDB API"
5. Público ou Privado (sua escolha)
6. **NÃO** inicialize com README, .gitignore ou licença (já temos)
7. Clique em "Create repository"

## 🔄 Comandos Úteis

### Verificar Status
```bash
git status
```

### Ver Commits
```bash
git log --oneline
```

### Verificar Remote
```bash
git remote -v
```

### Atualizar Repositório Remoto
```bash
git push origin main
```

## 📦 Estrutura de Commits Recomendada

```bash
git commit -m "feat: adicionar funcionalidade X"
git commit -m "fix: corrigir bug Y"
git commit -m "docs: atualizar README"
git commit -m "test: adicionar testes para componente Z"
```

