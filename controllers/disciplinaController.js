const disciplinas = [
    { id: 1, name: 'Matemática', idProfessor: 1, idsAlunos: [1,2,3] },
    { id: 2, name: 'Física', idProfessor: 1, idsAlunos: [1,3] },
    { id: 3, name: 'História', idProfessor: 2, idsAlunos: [1,2] },
    { id: 4, name: 'Português', idProfessor: 3, idsAlunos: [2,3]}
]

const disciplinaController = {
    getAllDisciplinas: (req, res) => {
        res.json(disciplinas)
    },

    createDisciplina: (req, res) => {
        const newDisciplina = {
            id: disciplinas.length + 1,
            name: req.body.name,
            idProfessor: req.body.idProfessor,
            idsAlunos: req.body.idsAlunos,
        };
        disciplinas.push(newDisciplina);
        res.status(201).json(newDisciplina);
    },

    getDisciplinaById: (req, res) => {
        const idDisciplina = parseInt(req.params.id);
        const disciplina = disciplinas.find(d => d.id === idDisciplina);

        if (disciplina) {
            const professor = professores.find(p => p.id === disciplina.professorId);
            const alunosDaDisciplina = alunos.filter(a => disciplina.alunosIds.includes(a.id));

            res.json({
            disciplina: disciplina.nome,
            professor: professor ? professor.nome : 'Professor não encontrado',
            alunos: alunosDaDisciplina.map(aluno => aluno.nome)
            });
        } else {
            res.status(404).json({ message: 'Disciplina não encontrada' });
        }
    },

    updateDisciplina: (req, res) => {
        const disciplina = disciplinas.find(disciplina => disciplina.id === parseInt(req.params.id));
        if (!disciplina) {
            return res.status(404).json({ message: "disciplina não encontrada"});
        }
        disciplina.name = req.body.name || disciplina.name;
        disciplina.idProfessor = req.body.idProfessor || disciplina.idProfessor;
        disciplina.idsAlunos = req.body.idsAlunos || disciplina.idsAlunos;
        res.json(disciplina);
    },

    deleteDisciplina: (req, res) => {
        const disciplina = disciplinas.find(disciplina => disciplina.id === parseInt(req.params.id));
        if (!disciplina) {
            return res.status(404).json({ message: "disciplina não encontrado"});
        }
        const index = disciplinas.indexOf(disciplina);
        disciplinas.splice(index, 1);
        res.status(204).send();
    },
}

module.exports = disciplinaController;