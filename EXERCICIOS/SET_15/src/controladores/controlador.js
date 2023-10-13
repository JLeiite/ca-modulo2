let lista = require('../bancodedados');
let { dadosLista, identificadorLista } = require('../bancodedados');

const listarDados = (req, res) => {
    // Converte os dados recebidos para o formato JSON
    return res.json(dadosLista);
}

// GET para busca de item
const obterItem = (req, res) => {
    // Obtendo um valor dentro do parametro enviado na rota
    const { id } = req.params;

    // Permite busca dentro de um ARRAY informado
    let lista = dadosLista.find((listaElemento) => {
        // Busca o ID solicitado no FIND
        return listaElemento.id === Number(id);
    });

    if(!lista) {
        return res.status(404).json({ mensagem: "Objeto não encontrado." });
    }
    return res.json(lista);
}

// Cadastrando via POST
const cadastrarItem = (req, res) => {
    const { nome, mensagem } = req.body;

    if (!mensagem) {
        return res.status(400).json({mensagem: "Insira algum valor na mensagem"});
    }

    // Criando o objeto para inclusão dos dados recebidos no BODY da requisição
    const item = {
        id: identificadorLista++,
        nome: nome ?? ("Teste " + (identificadorLista-1)), // Define um nome caso não seja informado
        mensagem // Não precisa de identificação, por ter o mesmo nome do item recebido
    }
    // Adicionando um item na lista
    dadosLista.push(item);
    return res.status(201).json(item);
}

// Atualizando item com PUT
const atualizarItem = (req, res) => {
    const { id } = req.params;
    const { nome, mensagem } = req.body;

    if(!nome) {
        return res.status(400).json({mensagem: "O nome é obrigatório"});
    } else if (!mensagem) {
        return res.status(400).json({mensagem: "Insira algum valor na mensagem"});
    }

    // Permite busca dentro de um ARRAY informado
    let lista = dadosLista.find((listaElemento) => {
        return listaElemento.id === Number(id);
    });
    if(!lista) {
        return res.status(404).json({ mensagem: "Objeto não encontrado." });
    }

    // Sobrescrevendo os dados cadastrados
    lista.nome = nome,
    lista.mensagem = mensagem

    // Status de atualizado com sucesso
    return res.status(204).send();
}

// Atualizando parte do código com PATCH
const atualizarMensagem = (req, res) => {
    const { id } = req.params;
    const { mensagem } = req.body;

    let lista = dadosLista.find((listaElemento) => {
        return listaElemento.id === Number(id);
    });
    if(!lista) {
        return res.status(404).json({ mensagem: "Objeto não encontrado." });
    }

    // Sobrescrevendo os apenas a mensagem
    lista.mensagem = mensagem
    // Status de atualizado com sucesso
    return res.status(204).send();
}

const excluirItem = (req, res) => {
    const { id } = req.params;

    // Consulta se o ID informado na URL existe
    let lista = dadosLista.find((listaElemento) => {
        return listaElemento.id === Number(id);
    });
    if(!lista){
        return res.status(404).json({mensagem: "Objeto não encontrado."});
    }

    // Retornando todos os itens da lista exceto o item a ser excluído
    dadosLista = dadosLista.filter((listaElemento) => {
        return listaElemento.id !== Number(id);
    }) 

    res.status(204).send();
}

module.exports = {
    listarDados,
    obterItem,
    cadastrarItem,
    atualizarItem,
    atualizarMensagem,
    excluirItem
}