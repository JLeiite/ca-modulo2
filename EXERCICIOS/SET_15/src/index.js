const express = require('express');
const rotas = require('./rotas');

const app = express();

// Middleware do express para que o servidor só aceite requisições do tipo JSON
app.use(express.json());

// Importação de rotas
app.use(rotas);

app.listen(3000);