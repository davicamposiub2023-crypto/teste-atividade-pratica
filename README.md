# 🐾 PetAmigos — Sistema de Cadastro de Tutores

Projeto base para a **Prática Integrada — Banco de Dados e Programação de Aplicativos**  
SENAI · Técnico em Desenvolvimento de Sistemas · Modalidade: Recomposição

---

## Como executar o projeto

### 1. Instalar as dependências

Execute este comando **uma única vez** no terminal:

```bash
npm install
```

> Se as dependências já estiverem instaladas (pasta `node_modules` existir), pule esta etapa.

---

### 2. Criar o banco de dados e a tabela

> ⚠️ **Antes de executar**, complete o `// TODO: CREATE TABLE` no arquivo `database.js`.

```bash
node database.js
```

Se aparecer `Conectado ao SQLite.` e `Tabela pronta.` no terminal, está correto.

Para verificar se a tabela foi criada:

```bash
sqlite3 petamigos.db ".tables"
```

Deve aparecer `tutores` na listagem.

---

### 3. Iniciar o servidor

> ⚠️ **Antes de executar**, complete os `// TODO` nas rotas do arquivo `server.js`.

```bash
node server.js
```

O terminal mostrará:

```
Conectado ao SQLite.
Tabela pronta.
Servidor rodando em http://localhost:3000
```

No **GitHub Codespaces**, a porta 3000 será aberta automaticamente no navegador.

---

### 4. Testar o sistema

- Acesse o endereço exibido no Codespaces (porta 3000)
- Preencha o formulário e clique em **Cadastrar**
- Clique em **Ver Cadastros** para listar os registros salvos

Para confirmar os dados diretamente no banco:

```bash
sqlite3 petamigos.db "SELECT * FROM tutores;"
```

---

## Estrutura do projeto

```
petamigos/
├── public/
│   └── index.html      # Interface web — NÃO alterar
├── docs/
│   └── sqlite3-ref.md  # Referência do módulo sqlite3 (disponível offline)
├── server.js           # Backend — complete os // TODO
├── database.js         # Banco de dados — complete o // TODO
├── package.json        # Dependências
├── requisitos_petamigos.txt
└── README.md
```

---

## Arquivos que você deve editar

| Arquivo | O que fazer |
|---|---|
| `database.js` | Escrever o `CREATE TABLE tutores` no lugar do `// TODO` |
| `server.js` | Implementar a rota `POST /cadastrar` e a rota `GET /listar` |

**Não altere** `public/index.html` — a interface já está pronta.

---

## Comandos úteis no terminal

| Comando | Descrição |
|---|---|
| `node server.js` | Inicia o servidor |
| `node database.js` | Cria o banco e a tabela isoladamente |
| `sqlite3 petamigos.db ".tables"` | Lista as tabelas do banco |
| `sqlite3 petamigos.db "SELECT * FROM tutores;"` | Exibe todos os registros |
| `rm petamigos.db` | Apaga o banco (útil para recomeçar do zero) |

---

*SENAI — Técnico em Desenvolvimento de Sistemas · Caderno de Práticas UC1 + UC2 · Recomposição*
