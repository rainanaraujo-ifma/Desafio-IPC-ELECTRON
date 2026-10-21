# Desafio — Consulta de Clima com IPC

---

## Objetivo

Hoje a Consulta de Clima faz tudo dentro da tela: a busca dos dados roda no `src/dados.js`, no processo de renderização. Num app desktop de verdade, esse tipo de trabalho fica no **processo principal**.

Neste desafio, a tela passa a **pedir** e o processo principal passa a **fazer**, usando comunicação entre processos (IPC): `preload.js`, `contextBridge`, `ipcRenderer.invoke` e `ipcMain.handle`.

---

## Ponto de partida

Você pode usar **um dos dois**:

**Opção A — o projeto inicial deste zip**

Já vem com a tela funcionando com `async/await` e com o botão **Sobre** no rodapé, ainda sem ação.

**Opção B — o seu próprio projeto do desafio do clima**

Recupere-o pelo GitHub ou pelo Classroom e, antes de começar, acrescente o botão Sobre no `src/index.html`, logo depois da `<section class="resultado">`:

```html
<footer class="rodape">
  <button id="botao-sobre">Sobre</button>
</footer>
```

Em qualquer das opções, rode:

```bash
npm install
npm start
```

Consulte **Grajaú** e confirme que aparecem 34 °C depois de 1,5 segundo. **Só comece o desafio com o app funcionando.**

---

## Estrutura atual

```
projeto_inicial_ipc/
├── package.json
├── main.js          processo principal
└── src/
    ├── index.html
    ├── style.css
    ├── dados.js     a busca (hoje roda na tela)
    └── script.js    a lógica da tela
```

---

## Parte 1 — O botão Sobre

### O que deve acontecer

Ao clicar em **Sobre**, aparece uma caixa de diálogo **do sistema operacional** (não um `alert` do navegador), do tipo informação, com:

- o título **Sobre**
- a mensagem **Consulta de Clima**
- o detalhe **Versão 1.0** e, na linha de baixo, **Programação Desktop — IFMA Campus Grajaú**

O diálogo deve ficar preso à janela do app: enquanto ele estiver aberto, não dá para clicar na Consulta de Clima.

### Passos

1. Crie o arquivo `preload.js` **na raiz** do projeto, ao lado do `main.js`.
2. Faça a janela carregar esse preload.
3. No preload, exponha na página um objeto `window.api` com uma função `mostrarSobre`, que envia um pedido pelo canal `'mostrar-sobre'`.
4. No `main.js`, atenda o canal `'mostrar-sobre'` e abra o diálogo nativo descrito acima.
5. No `script.js`, faça o clique no botão `botao-sobre` chamar `window.api.mostrarSobre()`.

### Observações

- Essa função não envia dados nem precisa de resposta.
- O evento do botão deve chamar um **método nomeado**.


---

## Parte 2 — A busca muda de processo

### O que deve acontecer

A tela continua igual para o usuário, mas o `dados.js` **deixa de existir na pasta `src/`**. A busca roda no processo principal, e a tela só a pede pelo `window.api`.

### Passos

1. Crie o arquivo `clima.js` **na raiz** do projeto e leve para ele o conteúdo do `src/dados.js`.
2. No fim do `clima.js`, exporte a função `buscarClima` com `module.exports`, para que o `main.js` consiga importá-la.
3. Remova do `src/index.html` a tag `<script>` que carrega o `dados.js` e apague o arquivo `src/dados.js`.
4. No `main.js`, importe o `buscarClima` e crie um handler para o canal `'buscar-clima'`, que recebe o nome da cidade e devolve o clima encontrado.
5. No preload, acrescente ao `window.api` uma função `buscarClima(cidade)` que use esse canal.
6. No `script.js`, troque a chamada antiga de `buscarClima` pela do `window.api`. **Mantenha o `await` e o `try/catch`.**

### Teste

- **Grajaú**, **São Luís** e **Teresina** devem funcionar como antes, com a mensagem "Buscando..." durante a espera.
- No DevTools (Ctrl+Shift+I), digite `window.api` e confira que aparecem as duas funções.

---

## Parte 3 — Investigação: o erro mudou

### O problema

Agora consulte uma cidade que não existe, como **Recife**, ou deixe o campo vazio. Compare a mensagem que aparece na tela com a que aparecia antes da Parte 2.

Ela deve estar parecida com:

```
Error invoking remote method 'buscar-clima': Error: Cidade "Recife" não encontrada.
```

### O que você deve fazer

1. Descubra **quem** acrescentou o começo `Error invoking remote method...` à mensagem e **por quê**. 
2. Faça a tela mostrar só a mensagem original, por exemplo `Cidade "Recife" não encontrada.` ou `Digite o nome de uma cidade.`

### Regras

- **Não vale** cortar o texto da mensagem com `split`, `replace`, `substring` ou similares.
- O `clima.js` continua lançando o erro como antes; não altere a função `buscarClima`.
- O bloco `catch` do `script.js` deve continuar sendo o lugar que mostra o erro na tela.

**Pista:** pense no que o handler devolve. Ele precisa mesmo deixar o erro escapar?
