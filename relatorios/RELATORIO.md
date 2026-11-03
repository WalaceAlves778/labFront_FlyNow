# Relatório de Alterações — Projeto FlyNow

## Data
03/11/2026

## Resumo
Configuração inicial do repositório Git, criação do `.gitignore`, primeiro commit e envio para o GitHub.

## O que foi feito

### 1. Verificação do repositório local
- Pasta: `C:\Users\alves\OneDrive\Área de Trabalho\p1_FlyNow`
- Repositório Git já inicializado (branch `master` → renomeado para `main`)
- Nenhum commit anterior existente
- Remote do GitHub já configurado: `https://github.com/WalaceAlves778/labFront_FlyNow.git`

### 2. Criação do `.gitignore`
Arquivo criado em: `p1_FlyNow/.gitignore`

Conteúdo ignorado:
- `node_modules/` — dependências do npm
- Logs de debug (`npm-debug.log*`, `yarn-debug.log*`, etc.)
- Pastas de build (`dist/`, `build/`, `.next/`, `out/`)
- Arquivos de ambiente (`.env`, `.env.local`, etc.)
- Configurações de IDE (`.vscode/`, `.idea/`, `*.swp`, `*~`)
- Arquivos do sistema (`.DS_Store`, `Thumbs.db`)
- Logs (`logs/`, `*.log`)
- Cobertura de testes (`coverage/`)

### 3. Commit
- Mensagem: `adiciona .gitignore`
- Arquivos alterados: 1 (`.gitignore`)
- Inserções: 36 linhas

### 4. Push para o GitHub
- Repositório: `https://github.com/WalaceAlves778/labFront_FlyNow.git`
- Branch: `main`
- Commit enviado: `1d75133`

## Como atualizar este relatório no futuro

Sempre que houver alterações no código:

1. Edite este arquivo (`relatorios/RELATORIO.md`) adicionando as novas mudanças.
2. No terminal, dentro da pasta `p1_FlyNow`:

```powershell
git add .
git commit -m "atualiza relatorio - descricao da alteracao"
git push origin main
```

## Próximos passos sugeridos
- Subir os arquivos do projeto (`FlyNow/`, `package-lock.json`) caso ainda não estejam no repositório remoto.
- Definir branches de desenvolvimento e proteção da branch `main`.
