const definePrioridade = require('../config');

const aplicaLogicaDisparoAlerta = (arrayTimestampFiltrado) => {
  const constantes = definePrioridade();
  const tamanhoArrayTimestamps = arrayTimestampFiltrado.length;

  if(tamanhoArrayTimestamps >= constantes.NUM_ERROS_NO_INTERVALO) {
    //disparar alerta aqui
    console.log('ERRO DISPARADO<<<<<<<<<<<<<<<');
    return false;
  }

  return true;
}

module.exports = aplicaLogicaDisparoAlerta;