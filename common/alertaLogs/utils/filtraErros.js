const filtraErros = (arrayErros, constantes) => {
  const dataAtual = new Date();

  const dataMenosXTempo = new Date(dataAtual.setSeconds(dataAtual.getSeconds() - constantes.INTERVALO_CONTAGEM_LOGS));

  const arrayErrosFiltrado = arrayErros.filter(erro => (
    new Date(erro.timestamp) > dataMenosXTempo
  ));

  return arrayErrosFiltrado;
}

module.exports = filtraErros;