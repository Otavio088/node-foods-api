const express = require('express');
const routes = require('./routes/index');
require('./database/index'); // Executa a conexão via knex e faz atribuição no objectionjs

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, function() {
    console.log(`Servidor iniciando na porta ${process.env.PORT}...`);
});