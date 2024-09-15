// Dados mockados para essa primeira versão
const alunos = [
    {id: 1, matricula: 1111, nome: 'Aser', data_de_nascimento: '2000-10-30'},
    {id: 2, matricula: 1112, nome: 'Ebert', data_de_nascimento: '2002-09-13'},
    {id: 3, matricula: 1113, nome: 'Joana', data_de_nascimento: '1999-01-01'},	
]

const alunoController = {
    getAllAlunos: (req, res) => {
        res.json(alunos);
    },

    createAluno: (req, res) => {
        const newAluno = {
            id: alunos.length + 1,
            matricula: req.body.matricula,
            nome: req.body.nome,
            data_de_nascimento: req.body.data_de_nascimento,
        };
        alunos.push(newAluno);
        res.status(201).json(newAluno);
    },
    
    getAlunoById: (req, res) => {
        const aluno = alunos.find(aluno => aluno.id === parseInt(req.params.id));
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado"});
        }
        res.json(aluno);
    },

    updateAluno: (req, res) => {
        const aluno = alunos.find(aluno => aluno.id === parseInt(req.params.id));
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado"});
        }
        aluno.nome = req.body.nome || aluno.nome;
        aluno.data_de_nascimento = req.body.data_de_nascimento || aluno.data_de_nascimento;
        res.json(aluno);
    },

    deleteAluno: (req, res) => {
        const aluno = alunos.find(aluno => aluno.id === parseInt(req.params.id));
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado"});
        }
        const index = alunos.indexOf(aluno);
        alunos.splice(index, 1);
        res.status(204).send();
    },
};

module.exports = alunoController;
