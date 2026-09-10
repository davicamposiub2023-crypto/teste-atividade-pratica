const sqlite3 = require('sqlite3').verbose();

// Abre (ou cria) o arquivo de banco de dados.
// Se 'petamigos.db' não existir, o SQLite o criará automaticamente.
const db = new sqlite3.Database('petamigos.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao SQLite.');
  }
});

// TODO: CREATE TABLE
// Escreva aqui o comando SQL para criar a tabela 'tutores'.
// Colunas necessárias:
//   id       → chave primária, inteiro, autoincremento
//   nome     → texto, obrigatório (NOT NULL)
//   email    → texto, obrigatório (NOT NULL)
//   telefone → texto, obrigatório (NOT NULL)
//   servico  → texto, obrigatório (NOT NULL) — valores esperados: 'banho', 'consulta' ou 'hospedagem'
//
// ATENÇÃO: use IF NOT EXISTS para que o servidor não quebre ao ser reiniciado.
//
// Exemplo de estrutura (incompleto — complete você mesmo):
//   CREATE TABLE IF NOT EXISTS tutores ( ... )

db.run(
  `/* seu comando SQL aqui */`,
  (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela pronta.');
    }
  }
);

module.exports = db;
