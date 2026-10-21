// dados.js — simula um servidor lento. NÃO ALTERE ESTE ARQUIVO.

const climaDasCidades = {
  'grajaú': { cidade: 'Grajaú', temperatura: 34, condicao: 'Ensolarado' },
  'são luís': { cidade: 'São Luís', temperatura: 30, condicao: 'Parcialmente nublado' },
  'imperatriz': { cidade: 'Imperatriz', temperatura: 35, condicao: 'Ensolarado' },
  'teresina': { cidade: 'Teresina', temperatura: 37, condicao: 'Muito quente' },
  'fortaleza': { cidade: 'Fortaleza', temperatura: 29, condicao: 'Ventando' },
};

// Demora 1,5 segundo.
// Devolve { cidade, temperatura, condicao }.
// Lança um erro se a cidade estiver vazia ou não for encontrada.
function buscarClima(cidade) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const chave = cidade.trim().toLowerCase();

      if (chave === '') {
        reject(new Error('Digite o nome de uma cidade.'));
        return;
      }

      const clima = climaDasCidades[chave];
      if (!clima) {
        reject(new Error(`Cidade "${cidade}" não encontrada.`));
        return;
      }

      resolve({ ...clima });
    }, 1500);
  });
}
