const express = require('express');
const app = express();

require('./database/index');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');
const errorMiddleware = require('./middlewares/error.middleware');

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorMiddleware);


app.listen(process.env.PORT, function() {
    console.log(`Servidor iniciando na porta ${process.env.PORT}...`);
});