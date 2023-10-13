const express = require('express');
const servidor = express();

const jogador = require('./jogadores.js');
const jogadorRodada = jogador.jogadores;

servidor.get('', (req, res) => {
    req = 0;
    res.send(`É a vez de ${jogadorRodada[req]} jogar!`);
});

servidor.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});