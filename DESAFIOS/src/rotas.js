const express = require('express');

const { listarContas, criarConta, atualizarConta, excluirConta, efetuarDeposito } = require('./controladores/contaBancaria');
const { validarSenha, validarPreenchimento, validarCPFEmail } = require('./intermediarios');

const rotas = express();

rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validarCPFEmail, criarConta); // validarPreenchimento
rotas.put('/contas/:numero/usuario', atualizarConta); // validarPreenchimento
rotas.delete('/contas/:numero', excluirConta);
rotas.post('/transacoes/depositar', efetuarDeposito);
// rotas.post('/transacoes/sacar', conta.efetuarSaque);
// rotas.post('/transacoes/transferir', conta.efetuarTransferencia);
// rotas.get('/contas/saldo?numero_conta=123&senha=123', conta.efetuarConsultaSaldo);
// rotas.get('/contas/extrato?numero_conta=123&senha=123', conta.listarTransacoes)

module.exports = rotas;