/**
 * auth.js
 * "Sessão" do sistema usando localStorage: o login fica valendo em qualquer
 * aba/janela do mesmo navegador (login automático, sem precisar repetir a
 * senha), até que o usuário clique em "Sair" (logout) — que é quando a
 * sessão realmente termina.
 * Como usamos as mesmas chaves para professor e aluno, só é possível ter
 * UM perfil logado por vez no navegador.
 */

function iniciarSessao(usuario) {
    localStorage.setItem('perfil', usuario.perfil);
    localStorage.setItem('usuario', usuario.usuario);
    localStorage.setItem('nome_aluno', usuario.nome_aluno || '');
}

function encerrarSessao() {
    localStorage.removeItem('perfil');
    localStorage.removeItem('usuario');
    localStorage.removeItem('nome_aluno');
}

function perfilLogado() {
    return localStorage.getItem('perfil'); // 'professor', 'aluno' ou null
}

/** Bloqueia a página caso o perfil logado não seja o exigido. */
function exigirPerfil(perfilExigido) {
    if (perfilLogado() !== perfilExigido) {
        window.location.href = 'index.html';
    }
}
