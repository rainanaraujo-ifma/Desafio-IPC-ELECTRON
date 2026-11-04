const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  mostrarSobre: () =>
    ipcRenderer.invoke('mostrar-sobre'),
  buscarClima: (cidade) =>
    ipcRenderer.invoke('buscar-clima', cidade)

});