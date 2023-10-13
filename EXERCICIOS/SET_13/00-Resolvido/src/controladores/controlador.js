const professores = require('../bancodedados.js');

const filtrarProfessores = (req, res) => {
    const {stack} = req.query;
    let resultado = professores;

    if (stack) {
        resultado = professores.filter((professor) => {
            return professor.stack === stack
        })
    }
    res.send(resultado);
}

const encontrarProfessor = (req, res) => {
    const profEncontrado = professores.find((professor) => {
        return professor.id === Number(req.params.id)
    });
    res.send(profEncontrado);
}

module.exports = {
    filtrarProfessores,
    encontrarProfessor
}