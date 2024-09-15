// Dados mockados para essa primeira versão
const professores = [
    { id: 1, nome: 'João', cpf: '123.456.789-00', data_de_nascimento: '1990-01-01', salario: 1000.00 },
    { id: 2, nome: 'Maria', cpf: '987.654.321-00', data_de_nascimento: '1995-01-01', salario: 2000.00 },
    { id: 3, nome: 'José', cpf: '456.789.123-00', data_de_nascimento: '2000-01-01', salario: 3000.00 }
]

const professorController = {
    getAllProfessores: (req, res) => {
        res.json(professores);
    },

    createProfessor: (req, res) => {
        const newProfessor = {
            id: professores.length + 1,
            name: req.body.name,
            cpf: req.body.cpf,
        };
        professores.push(newProfessor);
        res.status(201).json(newProfessor);
    },

    getProfessorById: (req, res) => {
        const professor = professores.find(professor => professor.id === parseInt(req.params.id));
        if (!professor) {
            return res.status(404).json({ message: "Professor não encontrado"});
        }
        res.json(professor);
    },

    updateProfessor: (req, res) => {
        const professor = professores.find(professor => professor.id === parseInt(req.params.id));
        if (!professor) {
            return res.status(404).json({ message: "Professor não encontrado"});
        }
        professor.name = req.body.name || professor.name;
        professor.cpf = req.body.cpf || professor.cpf;
        professor.data_de_nascimento = req.body.data_de_nascimento || professor.data_de_nascimento;
        professor.salario = req.body.salario || professor.salario;
        res.json(professor);
    },

    deleteProfessor: (req, res) => {
        const professor = professores.find(professor => professor.id === parseInt(req.params.id));
        if (!professor) {
            return res.status(404).json({ message: "Professor não encontrado"});
        }
        const index = professores.indexOf(professor);
        professores.splice(index, 1);
        res.status(204).send();
    },
};

module.exports = professorController;
