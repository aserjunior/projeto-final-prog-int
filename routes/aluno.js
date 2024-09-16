const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");

router.get('/alunos', alunoController.getAllAlunos);
router.post('/alunos', alunoController.createAluno);
router.get('/alunos/:id', alunoController.getAlunoById);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);
router.get('/alunos/:id/professores')

module.exports = router;
