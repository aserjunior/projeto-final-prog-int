document.addEventListener('DOMContentLoaded', () => {
  const professorTable = document.getElementById('professorTable').getElementsByTagName('tbody')[0];
  const professorForm = document.getElementById('professorForm');
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');
  const toggleButton = document.getElementById('toggleButton');
  const professorSection = document.getElementById('professorSection');
  const searchSection = document.getElementById('searchSection');

  const apiBaseUrl = 'http://localhost:3000/api';

  function fetchProfessors() {
    fetch(`${apiBaseUrl}/professores`)
      .then(response => response.json())
      .then(data => {
        professorTable.innerHTML = '';
        data.forEach(professor => {
          const row = professorTable.insertRow();
          row.insertCell(0).innerText = professor.id;
          row.insertCell(1).innerText = professor.nome;
          row.insertCell(2).innerText = professor.cpf;
          row.insertCell(3).innerText = professor.data_de_nascimento;
          row.insertCell(4).innerText = professor.salario;
          const actionsCell = row.insertCell(5);
          actionsCell.innerHTML = `
                    <button onclick="editProfessor(${professor.id}, this)">Editar</button>
                    <button onclick="deleteProfessor(${professor.id})">Deletar</button>`;
        });
      });
  }

  professorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProfessor = {
      nome: document.getElementById('professorNome').value,
      cpf: document.getElementById('professorCPF').value,
      data_de_nascimento: document.getElementById('professorDDN').value,
      salario: document.getElementById('professorSalario').value
    };
    fetch(`${apiBaseUrl}/professores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProfessor)
    }).then(() => {
      fetchProfessors();
      professorForm.reset();
    });
  });

  toggleButton.addEventListener('click', () => {
    if (professorSection.style.display === 'none') {
      professorSection.style.display = 'block';
      searchSection.style.display = 'none';
      toggleButton.innerText = 'Buscar';
    } else {
      professorSection.style.display = 'none';
      searchSection.style.display = 'block';
      toggleButton.innerText = 'Listar';
    }
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchNome = document.getElementById('searchNome').value;
    const searchCPF = document.getElementById('searchCPF').value;
    const searchDDN = document.getElementById('searchDDN').value;
    const searchSalario = document.getElementById('searchSalario').value;

    let params = [];
    if (searchNome) params.push(`nome=${searchNome}`);
    if (searchCPF) params.push(`cpf=${searchCPF}`);
    if (searchDDN) params.push(`data_de_nascimento=${searchDDN}`);
    if (searchSalario) params.push(`salario=${searchSalario}`);

    let url = `${apiBaseUrl}/professores/search?${params.join('&')}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        searchResults.innerHTML = '';
        if (data.message === "Nenhum professor encontrado com os parâmetros fornecidos") {
          searchResults.innerHTML = '<tr><td colspan="5">Nenhum professor encontrado.</td></tr>';
        } else {
          searchResults.innerHTML = '<tr><th>ID</th><th>Nome</th><th>CPF</th><th>Data de Nascimento</th><th>Salário</th></tr>';
          data.forEach(professor => {
            const row = searchResults.insertRow();
            row.insertCell(0).innerText = professor.id;
            row.insertCell(1).innerText = professor.nome;
            row.insertCell(2).innerText = professor.cpf;
            row.insertCell(3).innerText = professor.data_de_nascimento;
            row.insertCell(4).innerText = professor.salario;
          });
        }
      });
  });

  window.editProfessor = function (id, button) {
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
      const updatedProfessor = {
        nome: cells[1].getElementsByTagName('input')[0].value,
        cpf: cells[2].getElementsByTagName('input')[0].value,
        data_de_nascimento: cells[3].getElementsByTagName('input')[0].value,
        salario: cells[4].getElementsByTagName('input')[0].value
      };
      fetch(`${apiBaseUrl}/professores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfessor)
      }).then(() => fetchProfessors());
    };
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancelar';
    cancelButton.onclick = function () {
      fetchProfessors();
    };
    cells[5].appendChild(cancelButton);
  };

  window.deleteProfessor = function (id) {
    fetch(`${apiBaseUrl}/professores/${id}`, {
      method: 'DELETE'
    }).then(() => fetchProfessors());
  };

  fetchProfessors();
});