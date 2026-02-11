let estoque = JSON.parse(localStorage.getItem("estoque")) || {};
let historico = JSON.parse(localStorage.getItem("historico")) || [];

function salvar() {
    localStorage.setItem("estoque", JSON.stringify(estoque));
    localStorage.setItem("historico", JSON.stringify(historico));
}

/* ---------- ENTRADA ---------- */
function adicionarEstoque() {
    const nome = document.getElementById("epiNome").value.trim();
    const qtd = parseInt(document.getElementById("epiQtd").value);

    if (!nome || !qtd) return alert("Preencha os campos");

    estoque[nome] = (estoque[nome] || 0) + qtd;

    salvar();
    alert("Adicionado com sucesso!");
    document.getElementById("epiNome").value = "";
    document.getElementById("epiQtd").value = "";
}

/* ---------- SELECT EPIs ---------- */
function carregarEPIs() {
    const select = document.getElementById("epiSelect");
    if (!select) return;

    select.innerHTML = "";

    for (let epi in estoque) {
        select.innerHTML += `<option value="${epi}">${epi} ( ${estoque[epi]} )</option>`;
    }
}

/* ---------- RETIRADA ---------- */
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
    alert("Retirada registrada!");
}

/* ---------- CONTROLE ---------- */
function atualizarTabela() {
    const tbody = document.querySelector("#tabelaEstoque tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    for (let epi in estoque) {
        tbody.innerHTML += `<tr>
            <td>${epi}</td>
            <td>${estoque[epi]}</td>
        </tr>`;
    }

    const hist = document.querySelector("#tabelaHistorico tbody");
    hist.innerHTML = "";

    historico.forEach(h => {
        hist.innerHTML += `
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
/* ---------- BUSCA ---------- */
function filtrarHistorico() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const linhas = document.querySelectorAll("#tabelaHistorico tbody tr");

    linhas.forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(termo) ? "" : "none";
    });
}
