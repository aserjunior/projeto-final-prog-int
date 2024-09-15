const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController");

router.get('/professor', professorController.getAllProfessores);
router.post('/professor', professorController.createProfessor);
router.get('/professor/:id', professorController.getProfessorById);
router.put('/professor/:id', professorController.updateProfessor);
router.delete('/professor/:id', professorController.deleteProfessor);

module.exports = router;
