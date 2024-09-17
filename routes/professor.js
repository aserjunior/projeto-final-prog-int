const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController");

router.get('/professores/search?', professorController.searchProfessor)
router.get('/professores', professorController.getAllProfessores);
router.post('/professores', professorController.createProfessor);
router.get('/professores/:id', professorController.getProfessorById);
router.put('/professores/:id', professorController.updateProfessor);
router.delete('/professores/:id', professorController.deleteProfessor);
router.get('/professores/:id/alunos', professorController.listAlunosForProfessor); //TODO

module.exports = router;
