# Referência — Módulo sqlite3 para Node.js

> Documentação de referência disponível **offline** no ambiente Codespaces.  
> Uso autorizado durante a prática.

---

## 1. Instalação

```bash
npm install sqlite3
```

No projeto PetAmigos as dependências já estão declaradas no `package.json`.  
Basta executar `npm install` uma única vez.

---

## 2. Importar o módulo

```js
const sqlite3 = require('sqlite3').verbose();
```

O `.verbose()` ativa mensagens de depuração mais detalhadas no terminal — útil durante o desenvolvimento.

---

## 3. Abrir (ou criar) um banco de dados

```js
const db = new sqlite3.Database('nome-do-arquivo.db', (err) => {
  if (err) {
    console.error('Erro ao conectar:', err.message);
  } else {
    console.log('Conectado ao SQLite.');
  }
});
```

- Se o arquivo `.db` **não existir**, o SQLite o cria automaticamente.
- Se já existir, ele é aberto normalmente.
- O caminho pode ser relativo (`'petamigos.db'`) ou absoluto.

---

## 4. Executar comandos que modificam o banco — `db.run()`

Use para: `CREATE TABLE`, `INSERT`, `UPDATE`, `DELETE`.

### Sintaxe

```js
db.run(sql, [params], callback);
```

| Parâmetro  | Descrição |
|---|---|
| `sql`      | String com o comando SQL |
| `[params]` | Array de valores que substituem os `?` no SQL (opcional) |
| `callback` | Função chamada ao terminar; recebe `err` como primeiro argumento |

### Exemplo — CREATE TABLE

```js
db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL,
    preco TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Erro ao criar tabela:', err.message);
  } else {
    console.log('Tabela criada com sucesso.');
  }
});
```

### Exemplo — INSERT com placeholders

```js
const nome  = 'Maria';
const email = 'maria@exemplo.com';

db.run(
  'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
  [nome, email],
  (err) => {
    if (err) {
      console.error('Erro ao inserir:', err.message);
    } else {
      console.log('Registro inserido.');
    }
  }
);
```

> ⚠️ **Por que usar `?` (placeholders)?**  
> Concatenar valores diretamente na string SQL é perigoso (SQL Injection) e propenso a erros.  
> O módulo sqlite3 preenche os `?` com segurança, na ordem do array.

---

## 5. Consultar registros — `db.all()`

Use para: `SELECT` que retorna **múltiplas linhas**.

### Sintaxe

```js
db.all(sql, [params], callback);
```

| Parâmetro  | Descrição |
|---|---|
| `sql`      | String com o comando SELECT |
| `[params]` | Array de valores para os `?` (opcional) |
| `callback` | Função chamada ao terminar; recebe `(err, rows)` |

O parâmetro `rows` é um **array de objetos JavaScript**.  
Cada objeto representa uma linha da tabela, com propriedades nomeadas igual às colunas.

### Exemplo

```js
db.all('SELECT * FROM usuarios', (err, rows) => {
  if (err) {
    console.error('Erro na consulta:', err.message);
    return;
  }
  console.log(rows);
  // Exemplo de saída:
  // [
  //   { id: 1, nome: 'Maria', email: 'maria@exemplo.com' },
  //   { id: 2, nome: 'João',  email: 'joao@exemplo.com'  }
  // ]
});
```

### Exemplo com filtro (WHERE)

```js
db.all(
  'SELECT * FROM usuarios WHERE nome = ?',
  ['Maria'],
  (err, rows) => {
    if (err) return console.error(err.message);
    console.log(rows);
  }
);
```

---

## 6. Consultar um único registro — `db.get()`

Use para: `SELECT` que retorna **apenas uma linha**.

```js
db.get('SELECT * FROM usuarios WHERE id = ?', [1], (err, row) => {
  if (err) return console.error(err.message);
  console.log(row); // objeto único, não array
});
```

---

## 7. Fechar a conexão

```js
db.close((err) => {
  if (err) console.error(err.message);
  else console.log('Conexão encerrada.');
});
```

> No projeto PetAmigos o servidor fica rodando continuamente,  
> então **não é necessário fechar** a conexão manualmente.

---

## 8. Exportar o objeto `db` para usar em outros arquivos

No arquivo `database.js`:

```js
module.exports = db;
```

No arquivo `server.js`:

```js
const db = require('./database');
// Agora 'db' está disponível e você pode chamar db.run(), db.all(), etc.
```

---

## 9. Restrições de integridade no CREATE TABLE

| Restrição | Efeito |
|---|---|
| `PRIMARY KEY` | Identifica unicamente cada linha; não pode se repetir |
| `AUTOINCREMENT` | O valor do campo é gerado automaticamente (1, 2, 3...) |
| `NOT NULL` | Impede que o campo seja salvo sem valor |
| `UNIQUE` | Impede valores duplicados na coluna |
| `IF NOT EXISTS` | O `CREATE TABLE` não gera erro se a tabela já existir |

### Exemplo completo

```sql
CREATE TABLE IF NOT EXISTS tutores (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  nome     TEXT NOT NULL,
  email    TEXT NOT NULL,
  telefone TEXT NOT NULL,
  servico  TEXT NOT NULL
);
```

---

## 10. Comandos SQLite3 CLI (terminal)

Úteis para verificar o banco durante o desenvolvimento:

```bash
# Abrir o banco interativamente
sqlite3 petamigos.db

# Listar tabelas
sqlite3 petamigos.db ".tables"

# Ver estrutura de uma tabela
sqlite3 petamigos.db ".schema tutores"

# Consultar todos os registros
sqlite3 petamigos.db "SELECT * FROM tutores;"

# Sair do modo interativo
.quit
```

---

*Referência simplificada para uso durante a prática — SENAI · Técnico em Desenvolvimento de Sistemas*
