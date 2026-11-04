const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const { buscarClima } = require('./clima');

function criarJanela() {
  const janela = new BrowserWindow({
    width: 700,
    height: 550,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  janela.loadFile(path.join(__dirname, 'src', 'index.html'));
}

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.handle('mostrar-sobre', async (evento) => {
  const janela = BrowserWindow.fromWebContents(evento.sender);
  const resposta = await dialog.showMessageBox(janela, {
    type: "info",
    title: "Sobre",
    message: "Consulta de Clima",
    detail: "Versão 1.0\nProgramação Desktop — IFMA Campus Grajaú",
  });
});


ipcMain.handle("buscar-clima", async (evento, cidade) => {
  try {
    const res = await buscarClima(cidade);
    return { ok: true, res }
  } catch (erro) {
    return { ok: false, message: erro.message }
  }
});
