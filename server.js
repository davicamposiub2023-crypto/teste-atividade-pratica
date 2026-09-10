const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./database');

const app = express();

// Middleware: interpreta o corpo das requisições como JSON
app.use(bodyParser.json());

// Middleware: serve os arquivos estáticos da pasta 'public' (HTML, CSS, JS do frontend)
app.use(express.static('public'));

// ─────────────────────────────────────────────────────────────
// TODO: rota POST /cadastrar
//
// Esta rota receberá os dados do formulário enviados pelo frontend.
// O que você deve implementar:
//
//  1. Extraia os campos do corpo da requisição usando req.body
//     (ex.: req.body.nome, req.body.email, req.body.telefone, req.body.servico)
//
//  2. Verifique se algum campo está vazio ou ausente.
//     Use uma expressão lógica (ex.: com || e !) para fazer essa verificação.
//     Se algum campo estiver vazio, responda com status 400 e uma mensagem de erro clara.
//
//  3. Se todos os campos estiverem preenchidos, execute o comando:
//       INSERT INTO tutores (nome, email, telefone, servico) VALUES (?, ?, ?, ?)
//     usando db.run() e passando os valores como array de parâmetros (não concatene na string SQL).
//
//  4. No callback do db.run():
//     - Se houver erro (err), responda com status 500 e mensagem de falha.
//     - Se der certo, responda com status 201 e mensagem de sucesso.
//
// ─────────────────────────────────────────────────────────────
app.post('/cadastrar', (req, res) => {
  // seu código aqui
});


// ─────────────────────────────────────────────────────────────
// TODO: rota GET /listar
//
// Esta rota deve retornar todos os registros da tabela tutores.
// O que você deve implementar:
//
//  1. Use db.all() para executar o comando:
//       SELECT * FROM tutores
//
//  2. No callback do db.all(), você receberá dois parâmetros:
//     - err  → possível erro
//     - rows → array de objetos (cada objeto é uma linha da tabela)
//
//  3. Se houver erro, responda com status 500 e mensagem de falha.
//
//  4. Se der certo, envie o array 'rows' como resposta JSON:
//       res.json(rows)
//
// ─────────────────────────────────────────────────────────────
app.get('/listar', (req, res) => {
  // seu código aqui
});


// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
