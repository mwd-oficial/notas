/**
 * professor.js
 * Área do professor: cadastra nome do aluno + nota final e lista tudo.
 */
document.addEventListener('DOMContentLoaded', async () => {
    exigirPerfil('professor'); // protege a página

    document.getElementById('btn-sair').addEventListener('click', () => {
        encerrarSessao();
        window.location.href = 'index.html';
    });

    const form = document.getElementById('form-nota');
    const avisoEl = document.getElementById('aviso');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome_aluno').value.trim();
        const nota = parseFloat(document.getElementById('nota_final').value);

        if (!nome || isNaN(nota) || nota < 0 || nota > 10) {
            avisoEl.textContent = 'Dados inválidos. A nota deve ser entre 0 e 10.';
            avisoEl.style.display = 'block';
            return;
        }

        await salvarNota(nome, nota);
        avisoEl.textContent = 'Nota salva com sucesso!';
        avisoEl.style.display = 'block';
        form.reset();
        renderizarTabela();
    });

    renderizarTabela();
});

async function renderizarTabela() {
    const notas = await carregarNotas();
    const corpo = document.getElementById('corpo-tabela');
    corpo.innerHTML = ''; // limpa antes de redesenhar

    notas.forEach(n => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${escaparHtml(n.nome_aluno)}</td><td>${n.nota_final.toFixed(1)}</td>`;
        corpo.appendChild(linha);
    });
}

/** Evita injeção de HTML ao exibir nomes digitados pelo usuário. */
function escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
