const express = require('express');
const bancodedados = require('./controladores/controlador');

const rotas = express();

rotas.get('/', bancodedados.listarDados);
rotas.get('/rotas/:id', bancodedados.obterItem);
rotas.post('/rotas', bancodedados.cadastrarItem);
rotas.put('/rotas/:id', bancodedados.atualizarItem);
rotas.patch('/rotas/:id/mensagem', bancodedados.atualizarMensagem);
rotas.delete('/rotas/:id', bancodedados.excluirItem);

module.exports = rotas;