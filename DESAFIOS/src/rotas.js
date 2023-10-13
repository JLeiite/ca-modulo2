const express = require('express');

const { listarContas, criarConta } = require('./controladores/contaBancaria');
const { validarSenha, validarPreenchimento, validarCPFEmail } = require('./intermediarios');

const rotas = express();

rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validarCPFEmail, criarConta);
// rotas.put('/contas/:numeroConta/usuario', conta.atualizarConta);
// rotas.delete('/contas/:numeroConta', conta.excluirConta);
// rotas.post('/transacoes/depositar', conta.efetuarDeposito);
// rotas.post('/transacoes/sacar', conta.efetuarSaque);
// rotas.post('/transacoes/transferir', conta.efetuarTransferencia);
// rotas.get('/contas/saldo?numero_conta=123&senha=123', conta.efetuarConsultaSaldo);
// rotas.get('/contas/extrato?numero_conta=123&senha=123', conta.listarTransacoes)

module.exports = rotas;