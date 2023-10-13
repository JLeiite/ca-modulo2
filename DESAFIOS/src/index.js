const express = require('express');
const rotas = require('./rotas');

const app = express();

// Intermediários
app.use(express.json());

// Rotas
app.use(rotas);

app.listen(3000);