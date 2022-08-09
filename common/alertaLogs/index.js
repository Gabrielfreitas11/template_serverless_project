const { getToken, setToken } = require('../redis/tokenManager');

const filtraErros = require('./utils/filtraErros');
const aplicaLogicaDisparoAlerta = require('./utils/aplicaLogicaDisparoAlerta');

const definePrioridade = require('./config');

const aplicaLogicaLog = async (statusCode, logURL) => {
  const chaveRedis = `AlertaLog-${process.env.client}-${process.env.service}-${process.env.stage}`;
  const constantes = definePrioridade(chaveRedis);

  if(!constantes.STATUS_CODES_IGNORADOS.includes(statusCode)) {
    const timestamp = new Date().toISOString();

    const retornoRedis = await getToken(chaveRedis);

    if(!retornoRedis) {
      const dadosRedis = JSON.stringify({
        arrayErros: [{
          timestamp: timestamp,
          statusCode: statusCode,
          logURL: logURL
        }],
        ativo: true,
      });

      await setToken(chaveRedis, dadosRedis, constantes.INTERVALO_CONTAGEM_LOGS);

    } else {
      const retornoRedisParseado = JSON.parse(retornoRedis);

      if(retornoRedisParseado.ativo) {
        const arrayErrosFiltrados = [...filtraErros(retornoRedisParseado.arrayErros, constantes), { timestamp: timestamp, statusCode: statusCode, logURL: logURL }];

        const ativo = aplicaLogicaDisparoAlerta(arrayErrosFiltrados, constantes);

        const dadosRedis = JSON.stringify({
          arrayErros: arrayErrosFiltrados,
          ativo: ativo,
        });

        await setToken(chaveRedis, dadosRedis, constantes.TEMPO_INATIVO_APOS_DISPARO_ERRO);
      }
    }
  }
}

module.exports = aplicaLogicaLog;