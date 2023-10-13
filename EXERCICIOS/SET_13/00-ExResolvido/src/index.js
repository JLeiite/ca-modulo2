const express = require('express');
const { listagemCarros, obterCarro } = require('./controladores/carros');
const { validarSenha } = require('./intermediarios');

const app = express();

// Executa e valida os intermediários
app.use(validarSenha);

// Executa as rotas criadas
app.get('/carros', listagemCarros);
app.get('/carros/:id', obterCarro);

// Executa o servidor na porta informada
app.listen(3000);