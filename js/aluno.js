/**
 * aluno.js
 * Área do aluno: somente leitura da própria nota.
 */
document.addEventListener('DOMContentLoaded', async () => {
    exigirPerfil('aluno'); // protege a página

    document.getElementById('btn-sair').addEventListener('click', () => {
        encerrarSessao();
        window.location.href = 'index.html';
    });

    const nomeAluno = localStorage.getItem('nome_aluno');
    document.getElementById('nome-exibido').textContent = nomeAluno;

    const notas = await carregarNotas();
    const registro = notas.find(n => n.nome_aluno === nomeAluno);

    const notaEl = document.getElementById('nota-final');
    const avisoEl = document.getElementById('aviso-sem-nota');

    if (registro) {
        notaEl.textContent = registro.nota_final.toFixed(1);
        notaEl.style.display = 'block';
    } else {
        avisoEl.style.display = 'block';
    }
});
