export function aleatorio(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        throw new Error('Lista vazia ou inválida.');
    }
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}