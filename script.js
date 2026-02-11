let estoque = JSON.parse(localStorage.getItem("estoque")) || {};
let historico = JSON.parse(localStorage.getItem("historico")) || [];

function salvar() {
    localStorage.setItem("estoque", JSON.stringify(estoque));
    localStorage.setItem("historico", JSON.stringify(historico));
}

function atualizarTabela() {
    const tbody = document.querySelector("#tabelaEstoque tbody");
    const select = document.getElementById("epiSelect");

    tbody.innerHTML = "";
    select.innerHTML = "";

    for (let epi in estoque) {
        tbody.innerHTML += `<tr>
            <td>${epi}</td>
            <td>${estoque[epi]}</td>
        </tr>`;

        select.innerHTML += `<option value="${epi}">${epi}</option>`;
    }

    atualizarHistorico();
}

function atualizarHistorico() {
    const tbody = document.querySelector("#tabelaHistorico tbody");
    tbody.innerHTML = "";

    historico.forEach(h => {
        tbody.innerHTML += `
        <tr>
            <td>${h.data}</td>
            <td>${h.nome}</td>
            <td>${h.matricula}</td>
            <td>${h.setor}</td>
            <td>${h.epi}</td>
            <td>${h.qtd}</td>
        </tr>`;
    });
}

function adicionarEstoque() {
    const nome = document.getElementById("epiNome").value;
    const qtd = parseInt(document.getElementById("epiQtd").value);

    if (!nome || !qtd) return alert("Preencha os campos");

    estoque[nome] = (estoque[nome] || 0) + qtd;

    salvar();
    atualizarTabela();
}

function retirarEPI() {
    const nome = document.getElementById("nome").value;
    const matricula = document.getElementById("matricula").value;
    const setor = document.getElementById("setor").value;
    const epi = document.getElementById("epiSelect").value;
    const qtd = parseInt(document.getElementById("retiradaQtd").value);

    if (!nome || !matricula || !setor || !epi || !qtd)
        return alert("Preencha todos os campos");

    if (estoque[epi] < qtd)
        return alert("Estoque insuficiente");

    estoque[epi] -= qtd;

    historico.unshift({
        data: new Date().toLocaleString(),
        nome,
        matricula,
        setor,
        epi,
        qtd
    });

    salvar();
    atualizarTabela();
}

atualizarTabela();
