const express = require('express');
const {filtrarProfessores, encontrarProfessor} = require('./controladores/controlador.js');
const app = express();

// Intermediario independente
const primeiroIntermediario = (req, res, next) => {
    console.log("Passei no primeiro intermediário");
    return res.send("Algo deu errado!");
    next();
}

app.use(primeiroIntermediario);

// Intermediário da rota
const intermediarioRota = (req, res, next) => {
    console.log("Passei no intermediario da rota");
    next();
}

// http://localhost:3000/professores?stack=...
app.get('/professores', intermediarioRota, filtrarProfessores)

// Parametro de rota pelo ID -> http://localhost:3000/professores:id
app.get('/professores/:id', encontrarProfessor)

app.listen(3000);