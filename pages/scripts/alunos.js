document.addEventListener('DOMContentLoaded', () => {
  const alunoTable = document.getElementById('alunoTable').getElementsByTagName('tbody')[0];
  const alunoForm = document.getElementById('alunoForm');
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');
  const toggleButton = document.getElementById('toggleButton');
  const alunoSection = document.getElementById('alunoSection');
  const searchSection = document.getElementById('searchSection');

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

  toggleButton.addEventListener('click', () => {
    if (alunoSection.style.display === 'none') {
      alunoSection.style.display = 'block';
      searchSection.style.display = 'none';
      toggleButton.innerText = 'Buscar';
    } else {
      alunoSection.style.display = 'none';
      searchSection.style.display = 'block';
      toggleButton.innerText = 'Listar';
    }
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchMatricula = parseInt(document.getElementById('searchMatricula').value);
    const searchNome = document.getElementById('searchNome').value;
    const searchDDN = document.getElementById('searchDDN').value;

    let params = [];
    if (searchMatricula) params.push(`matricula=${searchMatricula}`);
    if (searchNome) params.push(`nome=${searchNome}`);
    if (searchDDN) params.push(`data_de_nascimento=${searchDDN}`);

    let url = `${apiBaseUrl}/alunos/search?${params.join('&')}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = '';
        if (data.message === "Nenhum aluno encontrado com os parâmetros fornecidos") {
          searchResults.innerHTML = '<tr><td colspan="4">Nenhum aluno encontrado.</td></tr>';
        } else {
          searchResults.innerHTML = '<tr><th>ID</th><th>Matrícula</th><th>Nome</th><th>Data de Nascimento</th></tr>';
          data.forEach(aluno => {
            const row = searchResults.insertRow();
            row.insertCell(0).innerText = aluno.id;
            row.insertCell(1).innerText = aluno.matricula;
            row.insertCell(2).innerText = aluno.nome;
            row.insertCell(3).innerText = aluno.data_de_nascimento;
          });
        }
      });
  });

  window.editAluno = function (id, button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    const deleteButton = cells[5].getElementsByTagName('button')[1];
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
