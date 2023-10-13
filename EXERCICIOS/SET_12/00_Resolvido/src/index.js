const express = require('express');
const servidor = express();

const usuarios = [
    {id: 11, nome: 'Joao', idade: 23},
    {id: 2, nome: 'Maria', idade: 18},
    {id: 4, nome: 'Ana', idade: 30},
    {id: 1, nome: 'Rodrigo', idade: 17},
    {id: 123, nome: 'Rodrigo', idade: 17},
];

servidor.get('/usuarios', (req, res) => {
    res.send(usuarios);
});

servidor.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000')
});

