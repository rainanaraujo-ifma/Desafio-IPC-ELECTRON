const campoCidade = document.getElementById('campo-cidade');
const botaoConsultar = document.getElementById('botao-consultar');
const mensagem = document.getElementById('mensagem');
const resultadoCidade = document.getElementById('resultado-cidade');
const resultadoTemperatura = document.getElementById('resultado-temperatura');
const resultadoCondicao = document.getElementById('resultado-condicao');
const botaoSobre = document.getElementById("botao-sobre")


botaoSobre.addEventListener("click", window.api.mostrarSobre)

botaoConsultar.addEventListener("click", consultar)

async function consultar() {
  botaoConsultar.disabled = true;
  mensagem.textContent = "Buscando..."
  try{
      const clima = await window.api.buscarClima(campoCidade.value);

      if(clima.ok == false){
        throw new Error(clima.message)
      }
      
      mensagem.textContent = ""
      resultadoCidade.textContent = clima.cidade;
      resultadoTemperatura.textContent = `${clima.temperatura} ºC`;
      resultadoCondicao.textContent = clima.condicao;
  }catch (error){
    mensagem.textContent = error.message;
    mensagem.className = "erro"
    resultadoCidade.textContent = "-";
    resultadoTemperatura.textContent = "-";
    resultadoCondicao.textContent = "-";
  } finally {
     botaoConsultar.disabled = false;
  }
}

