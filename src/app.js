const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');
require('./database/index'); // Executa a conexão via knex e faz atribuição no objectionjs

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(routes);


app.listen(process.env.PORT, function() {
    console.log(`Servidor iniciando na porta ${process.env.PORT}...`);
});