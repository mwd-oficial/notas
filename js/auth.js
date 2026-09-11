/**
 * auth.js
 * "Sessão" do sistema usando sessionStorage: os dados somem ao fechar a aba,
 * assim como uma sessão de servidor. Como usamos as mesmas chaves para
 * professor e aluno, só é possível ter UM perfil logado por vez no navegador.
 */

function iniciarSessao(usuario) {
    sessionStorage.setItem('perfil', usuario.perfil);
    sessionStorage.setItem('usuario', usuario.usuario);
    sessionStorage.setItem('nome_aluno', usuario.nome_aluno || '');
}

function encerrarSessao() {
    sessionStorage.clear();
}

function perfilLogado() {
    return sessionStorage.getItem('perfil'); // 'professor', 'aluno' ou null
}

/** Bloqueia a página caso o perfil logado não seja o exigido. */
function exigirPerfil(perfilExigido) {
    if (perfilLogado() !== perfilExigido) {
        window.location.href = 'index.html';
    }
}
