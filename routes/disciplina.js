const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");

router.get('/disciplinas', disciplinaController.getAllDisciplinas);
router.post('/disciplinas', disciplinaController.createDisciplina);
router.get('/disciplinas/:id', disciplinaController.getDisciplinaById);
router.put('/disciplinas/:id', disciplinaController.updateDisciplina);
router.delete('/disciplinas/:id', disciplinaController.deleteDisciplina);

module.exports = router;