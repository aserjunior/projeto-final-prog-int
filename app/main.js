const express = require("express");
const cors = require("cors");
const app = express();
const professorRoutes = require('../routes/professor');
const alunoRoutes = require('../routes/aluno');
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', professorRoutes);
app.use('/api', alunoRoutes);

app.listen(port, () => {
    console.log("Server is running on port " + port); 
})
