/**
 * data.js
 * Camada de acesso a dados do sistema.
 * - Usuários: sempre lidos do arquivo data/usuarios.json (fetch/AJAX).
 * - Notas: carregadas uma única vez de data/notas.json e, a partir daí,
 *   mantidas no localStorage do navegador (não existe backend/banco real
 *   em uma página estática, então o localStorage simula a "persistência").
 */

const CHAVE_NOTAS = 'sistema_notas_dados';

/** Busca a lista de usuários via AJAX (fetch) no arquivo JSON. */
async function carregarUsuarios() {
    const resposta = await fetch('data/usuarios.json');
    return resposta.json();
}

/**
 * Retorna a lista de notas. Na primeira execução, importa o JSON inicial
 * para o localStorage; nas próximas, lê direto do localStorage.
 */
async function carregarNotas() {
    const salvo = localStorage.getItem(CHAVE_NOTAS);
    if (salvo) return JSON.parse(salvo);

    const resposta = await fetch('data/notas.json'); // carga inicial via AJAX
    const notas = await resposta.json();
    localStorage.setItem(CHAVE_NOTAS, JSON.stringify(notas));
    return notas;
}

/** Salva (ou atualiza) a nota de um aluno. */
async function salvarNota(nomeAluno, notaFinal) {
    const notas = await carregarNotas();
    const existente = notas.find(n => n.nome_aluno.toLowerCase() === nomeAluno.toLowerCase());

    if (existente) {
        existente.nota_final = notaFinal; // atualiza nota já cadastrada
    } else {
        notas.push({ nome_aluno: nomeAluno, nota_final: notaFinal }); // novo aluno
    }
    localStorage.setItem(CHAVE_NOTAS, JSON.stringify(notas));
    return notas;
}
