const carros = require('../bancodedados');

const listagemCarros = (req, res) => {
    const {marca, cor} = req.query;
    let resultado = carros;

    if(marca){
        resultado = resultado.filter((carro) => {
            return carro.marca.toLowerCase() === marca.toLowerCase();
        })
    }

    if(cor){
        resultado = resultado.filter((carro) => {
            return carro.cor.toLowerCase() === cor.toLowerCase();
        })
    }

    res.send(resultado);
}

const obterCarro = (req, res) => {

    // Propriedade para pegar parametro de rota dentro da requisição.
    const { id } = req.params;
    const carroEncontrado = carros.find((carro) => {
        return carro.id === Number(id);
    });

    res.send(carroEncontrado);
}

module.exports = {
    listagemCarros,
    obterCarro
}