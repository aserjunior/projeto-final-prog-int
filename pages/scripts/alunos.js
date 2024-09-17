document.addEventListener('DOMContentLoaded', () => {
  const alunoTable = document.getElementById('alunoTable').getElementsByTagName('tbody')[0];
  const alunoForm = document.getElementById('alunoForm');

  const apiBaseUrl = 'http://localhost:3000/api';

  function fetchAlunos() {
    fetch(`${apiBaseUrl}/alunos`)
      .then(response => response.json())
      .then(data => {
        alunoTable.innerHTML = '';
        data.forEach(aluno => {
          const row = alunoTable.insertRow();
          row.insertCell(0).innerText = aluno.id;
          row.insertCell(1).innerText = aluno.matricula;
          row.insertCell(2).innerText = aluno.nome;
          row.insertCell(3).innerText = aluno.data_de_nascimento;
          const actionsCell = row.insertCell(4);
          actionsCell.innerHTML = `
                    <button onclick="editAluno(${aluno.id}, this)">Editar</button>
                    <button onclick="deleteAluno(${aluno.id})">Deletar</button>`;
        });
      });
  }

  alunoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newAluno = {
      matricula: document.getElementById('alunoMatricula').value,
      nome: document.getElementById('alunoNome').value,
      data_de_nascimento: document.getElementById('alunoDDN').value
    };
    fetch(`${apiBaseUrl}/alunos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAluno)
    }).then(() => {
      fetchAlunos();
      alunoForm.reset();
    });
  });

  window.editAluno = function (id, button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    const deleteButton = cells[5].getElementsByTagName('button')[1]; // Botão deletar
    deleteButton.style.display = 'none';

    for (let i = 1; i < cells.length - 1; i++) {
      const cellValue = cells[i].innerText;
      cells[i].innerHTML = `<input type="text" value="${cellValue}">`;
    }
    button.innerText = 'Salvar';
    button.onclick = function () {
      const updatedAluno = {
        matricula: cells[1].getElementsByTagName('input')[0].value,
        nome: cells[2].getElementsByTagName('input')[0].value,
        data_de_nascimento: cells[3].getElementsByTagName('input')[0].value
      };
      fetch(`${apiBaseUrl}/alunos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAluno)
      }).then(() => fetchAlunos());
    };
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancelar';
    cancelButton.onclick = function () {
      fetchAlunos();
    };
    cells[4].appendChild(cancelButton);
  };

  window.deleteAluno = function (id) {
    fetch(`${apiBaseUrl}/alunos/${id}`, {
      method: 'DELETE'
    }).then(() => fetchAlunos());
  };

  fetchAlunos();
});
