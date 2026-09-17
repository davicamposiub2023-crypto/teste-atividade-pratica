const express    = require('express');
const bodyParser = require('body-parser');
const cors       =require('cors')
const db         = require('./database');

const app = express();


app.use(cors());

// Permite receber dados em JSON
app.use(bodyParser.json());

// Disponibiliza os arquivos da pasta public
app.use(express.static('public'));

// Rota para cadastrar um tutor
app.post('/cadastrar', (req, res) => {
    const { nome, email, telefone, servico } = req.body;

    // Verifica se algum campo está vazio
    if (!nome || !email || !telefone || !servico) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios.'
        });
    }

    // Comando SQL para inserir o tutor
    const sql = `
        INSERT INTO tutores (nome, email, telefone, servico)
        VALUES (?, ?, ?, ?)
    `;

    // Executa o INSERT
    db.run(
        sql,
        [nome, email, telefone, servico],
        function (err) {
            if (err) {
                console.error('Erro ao cadastrar:', err.message);

                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar tutor.'
                });
            }

            res.json({
                mensagem: 'Tutor cadastrado com sucesso!'
            });
        }
    );
});

// Rota para listar todos os tutores
app.get('/listar', (req, res) => {
    const sql = 'SELECT * FROM tutores';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erro ao listar:', err.message);

            return res.status(500).json({
                mensagem: 'Erro ao listar tutores.'
            });
        }

        res.json(rows);
    });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.');
});
