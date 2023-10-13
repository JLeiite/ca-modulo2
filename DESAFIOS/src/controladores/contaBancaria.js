let { contas, saques, depositos, transferencias, idConta } = require('../bancodedados');
const dataHoraAtualString = new Date().toLocaleString();

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
    
    const novoDeposito = {
        data: dataHoraAtualString,
        numero_conta,
        valor
    }

    depositos.push(novoDeposito);
    return res.status(201).json(novoDeposito);
}

const efetuarSaque = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if(!numero_conta || !valor){
        return res.send({ mensagem: "O número da conta e o valor são obrigatórios!" });
    } else if(!senha){
        return res.send({ mensagem: "Senha não informada!" })
    }
    else if(valor <= 0){
        return res.send({ mensagem: "Valor informado é inválido." });
    }

    let buscaConta = contas.find((contas) => {
        return contas.numero === Number(numero_conta);
    });

    if(!buscaConta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    } else if(buscaConta.usuario.senha !== senha){
        return res.send({ mensagem: "Senha incorreta"});
    }
    
    if((buscaConta.saldo - Number(valor)) < 0){
        return res.status(404).json({ mensagem: "Saldo insuficiente!" });
    }
    buscaConta.saldo = buscaConta.saldo - Number(valor);
    
    const novoSaque = {
        data: dataHoraAtualString,
        numero_conta,
        valor
    }

    saques.push(novoSaque);
    return res.status(201).json(novoSaque);
}

const efetuarTransferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if(!numero_conta_origem || !numero_conta_destino || !valor || !senha){
        return res.send({ mensagem: "Preencha todos os campos obrigatorios!" });
    }

    let buscaContaOrigem = contas.find((contas) => {
        return contas.numero === Number(numero_conta_origem);
    });
    if(!buscaContaOrigem) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    } else if(buscaContaOrigem.usuario.senha !== senha){
        return res.send({ mensagem: "Senha incorreta"});
    }

    let buscaContaDestino = contas.find((contas) => {
        return contas.numero === Number(numero_conta_destino);
    });

    if(!buscaContaDestino) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    }
    
    if((buscaContaOrigem.saldo - Number(valor)) < 0){
        return res.status(404).json({ mensagem: "Saldo insuficiente!" });
    }
    buscaContaOrigem.saldo = buscaContaOrigem.saldo - Number(valor);
    buscaContaDestino.saldo = buscaContaDestino.saldo + Number(valor);

    const novaTransferencia = {
        data: dataHoraAtualString,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(novaTransferencia);
    return res.status(201).json(novaTransferencia);
}

const efetuarConsultaSaldo = (req, res) => {
    const {numero_conta, senha} = req.query;

    let buscaConta = contas.find((contas) => {
        return contas.numero === Number(numero_conta_origem);
    });
    if(!buscaConta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    } else if(buscaConta.numero !== numero_conta){
        return res.send({ mensagem: "Conta bancária incorreta"});
    } else if(buscaConta.usuario.senha !== senha){
        return res.send({ mensagem: "Senha incorreta"});
    }

    return res.json("Saldo: " + buscaConta.saldo);
}

const listarTransacoes = (req, res) => {
    const {numero_conta, senha} = req.query;

    let buscaConta = contas.find((contas) => {
        return contas.numero === Number(numero_conta_origem);
    });
    if(!buscaConta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    } else if(buscaConta.numero !== numero_conta){
        return res.send({ mensagem: "Conta bancária incorreta"});
    } else if(buscaConta.usuario.senha !== senha){
        return res.send({ mensagem: "Senha incorreta"});
    }

    return res.json(
        "depósitos: " + [buscaConta.transferencias] +
        "saques: " + [buscaConta.saques] +
        "transferenciasEnviadas: " + [buscaConta.transferencias]
    );
}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta,
    efetuarDeposito,
    efetuarSaque,
    efetuarTransferencia,
    efetuarConsultaSaldo,
    listarTransacoes
}