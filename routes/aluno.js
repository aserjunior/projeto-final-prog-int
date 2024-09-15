const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");

router.get('/aluno', alunoController.getAllAlunos);
router.post('/aluno', alunoController.createAluno);
router.get('/aluno/:id', alunoController.getAlunoById);
router.put('/aluno/:id', alunoController.updateAluno);
router.delete('/aluno/:id', alunoController.deleteAluno);

module.exports = router;
