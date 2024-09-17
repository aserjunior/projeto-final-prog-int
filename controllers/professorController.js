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
            nome: req.body.nome,
            cpf: req.body.cpf,
            data_de_nascimento: req.body.data_de_nascimento,
            salario: req.body.salario
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
        professor.nome = req.body.nome || professor.nome;
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

    searchProfessor: (req, res) => {
        const { nome, cpf, data_de_nascimento, salario } = req.query;

        const results = professores.filter(professor => {
            const nomeMatch = !nome || professor.nome.toLowerCase().includes(nome.toLowerCase());
            const cpfMatch = !cpf || professor.cpf === cpf;
            const dataMatch = !data_de_nascimento || professor.data_de_nascimento === data_de_nascimento;
            const salarioMatch = !salario || professor.salario == salario;

            return nomeMatch && cpfMatch && dataMatch && salarioMatch;
        });

        if (results.length === 0) {
            return res.status(404).json({ message: "Nenhum professor encontrado com os parâmetros fornecidos" });
        }

        res.json(results);
    },

    listAlunosForProfessor: (req, res) => {
        const idProfessor = parseInt(req.params.id);

        const disciplinasDoProfessor = disciplinas.filter(d => d.idProfessor == idProfessor);

        let idsAlunos = [];
        disciplinasDoProfessor.forEach(disciplina => {
            idsAlunos = [...new Set([...idsAlunos, ...disciplina.idsAlunos])];
        });

        const alunosDoProfessor = alunos.filter(a => alunosIds.includes(a.id));

        res.json({
            idProfessor,
            alunos: alunosDoProfessor.map(aluno => aluno.nome)
        });
    }
};

module.exports = professorController;
