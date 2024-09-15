const express = require("express");
const app = express();
const professorRoutes = require('../routes/professor');
const alunoRoutes = require('../routes/aluno');
const port = 3000;

app.use(express.json());

app.use('/api', professorRoutes);
app.use('/api', alunoRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is running on port " + port); 
})