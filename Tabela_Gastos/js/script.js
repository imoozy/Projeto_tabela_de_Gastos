document.addEventListener("DOMContentLoaded", function () {
    const botaoAdicionar = document.getElementById("adicionar");
    const tabelaGastos = document.getElementById("tabela-gastos");
    const tbodyGastos = document.getElementById("tbody-gastos");
    const totalSpan = document.getElementById("total");

    botaoAdicionar.addEventListener("click", adicionarGasto);

    function adicionarGasto() {
        const data = document.getElementById("data").value;
        const descricao = document.getElementById("descricao").value;
        const valor = parseFloat(document.getElementById("valor").value);

        if (!data || !descricao || isNaN(valor)) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const novaLinha = tbodyGastos.insertRow();
        const colunaData = novaLinha.insertCell(0);
        const colunaDescricao = novaLinha.insertCell(1);
        const colunaValor = novaLinha.insertCell(2);
        const colunaAcoes = novaLinha.insertCell(3);

        colunaData.innerHTML = data;
        colunaDescricao.innerHTML = descricao;
        colunaValor.innerHTML = valor.toFixed(2);

        const botaoRemover = document.createElement("button");
        botaoRemover.innerText = "Remover";
        botaoRemover.addEventListener("click", () => {
            removerLinha(novaLinha);
        });
        colunaAcoes.appendChild(botaoRemover);

        document.getElementById("data").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("valor").value = "";

        atualizarTotal();
    }

    function removerLinha(linha) {
        tbodyGastos.removeChild(linha);
        atualizarTotal();
    }

    function atualizarTotal() {
        const linhas = tbodyGastos.getElementsByTagName('tr');
        let total = 0;

        for (let i = 0; i < linhas.length; i++) {
            const valor = parseFloat(linhas[i].getElementsByTagName('td')[2].innerHTML);
            if (!isNaN(valor)) {
                total += valor;
            }
        }

        totalSpan.textContent = total.toFixed(2);
    }
});
