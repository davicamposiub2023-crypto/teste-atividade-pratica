const sqlite3 = require('sqlite3').verbose();

// Abre ou cria o banco de dados
const db = new sqlite3.Database('petamigos.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    } else {
        console.log('Conectado ao SQLite.');
    }
});

// Cria a tabela de tutores
db.run(`
    CREATE TABLE IF NOT EXISTS tutores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT NOT NULL,
        servico TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err.message);
    } else {
        console.log('Tabela tutores pronta.');
    }
});

module.exports = db;
