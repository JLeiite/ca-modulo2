let {contas} = require('./bancodedados');

const validarSenha = (req, res, next) => {
    const {senha_banco} = req.query;

    if(!senha_banco){
        return res.send("Senha não informada!");
    } else if(senha_banco !== 'Cubos123Bank'){
        return res.send('Senha incorreta');
    } 

    next();
}

const validarPreenchimento = (req, res, next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.query;

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha){
        return res.send({ mensagem: "Preencha todos os dados!" });
    }

    next();
}

const validarCPFEmail = (req, res, next) => {
    const {cpf, email} = req.body;

    let consultaCPF = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });
    if(consultaCPF) {
        return res.status(404).json({ mensagem: "Já existe uma conta com o cpf informado!" });
    }

    let consultaEmail = contas.find((conta) => {
        return conta.usuario.email === email;
    });
    if(consultaEmail) {
        return res.status(404).json({ mensagem: "Já existe uma conta com o e-mail informado!" });
    }

    next();
}

module.exports = {
    validarSenha,
    validarPreenchimento,
    validarCPFEmail
}