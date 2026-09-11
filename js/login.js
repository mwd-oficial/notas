/**
 * login.js
 * Valida usuário/senha (buscados via AJAX em usuarios.json) e cria a sessão.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Se já existe sessão ativa, manda direto para a área correspondente
    if (perfilLogado()) {
        redirecionarParaArea(perfilLogado());
        return;
    }

    const form = document.getElementById('form-login');
    const erroEl = document.getElementById('erro');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value;

        const usuarios = await carregarUsuarios(); // AJAX/JSON
        const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

        if (encontrado) {
            iniciarSessao(encontrado);
            redirecionarParaArea(encontrado.perfil);
        } else {
            erroEl.textContent = 'Usuário ou senha inválidos.';
            erroEl.style.display = 'block';
        }
    });
});

function redirecionarParaArea(perfil) {
    window.location.href = perfil === 'professor' ? 'professor.html' : 'aluno.html';
}
