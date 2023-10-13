let banco_contas = require('../bancodedados');
let { banco, contas, saques, depositos, transferencias, idConta} = require('../bancodedados');

const listarContas = (req, res) => {
    return res.json(banco_contas);
}

const criarConta = (req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const novaConta = {
        id: idConta++,
        nome, cpf, data_nascimento, telefone, email, senha
    }

    contas.push(novaConta);
    return res.status(201).json(novaConta);
}

/*
const atualizarConta = (req, res) => {
    const { numero } = req.params;

    let buscaConta = banco.find((banco) => {
        return banco.numero === Number(numero);
    });
    if(!buscaConta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    }
}

const excluirConta = (req, res) => {
    const { id } = req.params;
}

const efetuarDeposito = (req, res) => {}

const efetuarSaque = (req, res) => {}

const efetuarTransferencia = (req, res) => {}

const efetuarConsultaSaldo = (req, res) => {}

const listarTransacoes = (req, res) => {}
*/

module.exports = {
    listarContas,
    criarConta,
    // atualizarConta,
    // excluirConta,
    // efetuarDeposito,
    // efetuarSaque,
    // efetuarTransferencia,
    // efetuarConsultaSaldo,
    // listarTransacoes
}