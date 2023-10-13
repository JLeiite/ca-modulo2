let { contas, saques, depositos, transferencias, idConta} = require('../bancodedados');

const listarContas = (req, res) => {
    return res.json(contas);
}

const criarConta = (req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const novaConta = {
        numero: idConta++,
        saldo: 0,
        usuario: {
            nome, cpf, data_nascimento, telefone, email, senha
        }
    }

    contas.push(novaConta);
    return res.status(201).json(novaConta);
}


const atualizarConta = (req, res) => {
    const { numero } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    let buscaConta = contas.find((contas) => {
        return contas.numero === Number(numero);
    });
    if(!buscaConta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    }
    let consultaCPF = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });
    if(consultaCPF) {
        return res.status(404).json({ mensagem: "O CPF informado já existe cadastrado!" });
    }
    let consultaEmail = contas.find((conta) => {
        return conta.usuario.email === email;
    });
    if(consultaEmail) {
        return res.status(404).json({ mensagem: "O e-mail informado já existe cadastrado!" });
    }

    buscaConta.usuario.nome = nome,
    buscaConta.usuario.cpf = cpf,
    buscaConta.usuario.data_nascimento = data_nascimento,
    buscaConta.usuario.telefone = telefone,
    buscaConta.usuario.email = email,
    buscaConta.usuario.senha = senha

    return res.status(204).send();
}

const excluirConta = (req, res) => {
    const { numero } = req.params;

    let buscaConta = contas.find((contas) => {
        return contas.numero === Number(numero);
    });
    if(!buscaConta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    } else if(buscaConta.saldo !== 0){
        return res.status(404).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

    contas = contas.filter((contas) => {
        return contas.numero !== Number(numero);
    })

    res.status(204).send();
}

const efetuarDeposito = (req, res) => {
    const { numero_conta, valor } = req.body;

    if(!numero_conta || !valor){
        return res.send({ mensagem: "O número da conta e o valor são obrigatórios!" });
    } else if(valor <= 0){
        return res.send({ mensagem: "Valor informado é inválido." });
    }
    let buscaConta = contas.find((contas) => {
        return contas.numero === Number(numero_conta);
    });
    if(!buscaConta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    }
    
    buscaConta.saldo = buscaConta.saldo + Number(valor);
    const dataHoraAtualString = new Date().toLocaleString();
    
    const novoDeposito = {
        data: dataHoraAtualString,
        numero_conta,
        valor
    }

    depositos.push(novoDeposito);
    return res.status(201).json(novoDeposito);
}

const efetuarSaque = (req, res) => {}

/*
const efetuarTransferencia = (req, res) => {}

const efetuarConsultaSaldo = (req, res) => {}

const listarTransacoes = (req, res) => {}
*/

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta,
    efetuarDeposito,
    efetuarSaque,
    // efetuarTransferencia,
    // efetuarConsultaSaldo,
    // listarTransacoes
}