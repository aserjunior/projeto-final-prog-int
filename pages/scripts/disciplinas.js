document.addEventListener('DOMContentLoaded', () => {
  const disciplinaTable = document.getElementById('disciplinaTable').getElementsByTagName('tbody')[0];
  const disciplinaForm = document.getElementById('disciplinaForm');

  const apiBaseUrl = 'http://localhost:3000/api';

  function fetchDisciplinas() {
    fetch(`${apiBaseUrl}/disciplinas`)
      .then(response => response.json())
      .then(async disciplinas => {
        disciplinaTable.innerHTML = '';

        const professores = await fetch(`${apiBaseUrl}/professores`).then(res => res.json());
        const alunos = await fetch(`${apiBaseUrl}/alunos`).then(res => res.json());

        disciplinas.forEach(disciplina => {
          const row = disciplinaTable.insertRow();
          row.insertCell(0).innerText = disciplina.id;
          row.insertCell(1).innerText = disciplina.name;

          const professor = professores.find(p => p.id === parseInt(disciplina.idProfessor));
          row.insertCell(2).innerText = professor ? professor.nome : 'Professor não encontrado';

          const alunoNomes = disciplina.idsAlunos.map(alunoId => {
            const aluno = alunos.find(a => a.id === alunoId);
            return aluno ? aluno.nome : 'Aluno não encontrado';
          }).join(', ');

          row.insertCell(3).innerText = alunoNomes;

          const actionsCell = row.insertCell(4);
          actionsCell.innerHTML = `
                    <button onclick="editDisciplina(${disciplina.id}, this)">Editar</button>
                    <button onclick="deleteDisciplina(${disciplina.id})">Deletar</button>`;
        });
      });
  }

  function loadProfessoresSelect() {
    fetch(`${apiBaseUrl}/professores`)
      .then(response => response.json())
      .then(data => {
        const professorSelect = document.getElementById('disciplinaProfessorSelect');
        data.forEach(professor => {
          const option = document.createElement('option');
          option.value = professor.id;
          option.textContent = professor.nome;
          professorSelect.appendChild(option);
        });
      });
  }

  function loadAlunosMultiSelect() {
    fetch(`${apiBaseUrl}/alunos`)
      .then(response => response.json())
      .then(data => {
        const alunoSelect = document.getElementById('disciplinaAlunosSelect');
        data.forEach(aluno => {
          const option = document.createElement('option');
          option.value = aluno.id;
          option.textContent = aluno.nome;
          alunoSelect.appendChild(option);
        });
      });
  }

  disciplinaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const professorId = parseInt(document.getElementById('disciplinaProfessorSelect').value);
    const alunoIds = Array.from(document.getElementById('disciplinaAlunosSelect').selectedOptions)
      .map(option => parseInt(option.value));

    const newDisciplina = {
      name: document.getElementById('disciplinaNome').value,
      idProfessor: professorId,
      idsAlunos: alunoIds
    };

    fetch(`${apiBaseUrl}/disciplinas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDisciplina)
    }).then(() => {
      fetchDisciplinas();
      disciplinaForm.reset();
    });
  });

  window.editDisciplina = function (id, button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    const deleteButton = cells[4].getElementsByTagName('button')[1];
    deleteButton.style.display = 'none';

    const professorSelect = document.createElement('select');
    const alunoSelect = document.createElement('select');
    alunoSelect.multiple = true;

    fetch(`${apiBaseUrl}/professores`)
      .then(response => response.json())
      .then(professores => {
        professores.forEach(professor => {
          const option = document.createElement('option');
          option.value = professor.id;
          option.textContent = professor.nome;
          if (professor.id === parseInt(cells[2].innerText)) {
            option.selected = true;
          }
          professorSelect.appendChild(option);
        });
      });

    fetch(`${apiBaseUrl}/alunos`)
      .then(response => response.json())
      .then(alunos => {
        alunos.forEach(aluno => {
          const option = document.createElement('option');
          option.value = aluno.id;
          option.textContent = aluno.nome;
          if (cells[3].innerText.includes(aluno.nome)) {
            option.selected = true;
          }
          alunoSelect.appendChild(option);
        });
      });

    cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}">`;
    cells[2].innerHTML = '';
    cells[2].appendChild(professorSelect);
    cells[3].innerHTML = '';
    cells[3].appendChild(alunoSelect);

    button.innerText = 'Salvar';
    button.onclick = function () {
      const updatedDisciplina = {
        name: cells[1].getElementsByTagName('input')[0].value,
        idProfessor: professorSelect.value,
        idsAlunos: Array.from(alunoSelect.selectedOptions).map(option => parseInt(option.value))
      };
      fetch(`${apiBaseUrl}/disciplinas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDisciplina)
      }).then(() => fetchDisciplinas());
    };

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancelar';
    cancelButton.onclick = function () {
      fetchDisciplinas();
    };
    cells[4].appendChild(cancelButton);
  };

  window.deleteDisciplina = function (id) {
    fetch(`${apiBaseUrl}/disciplinas/${id}`, {
      method: 'DELETE'
    }).then(() => fetchDisciplinas());
  };

  loadProfessoresSelect();
  loadAlunosMultiSelect();
  fetchDisciplinas();
});
