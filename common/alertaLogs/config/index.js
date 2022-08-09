const altaPrioridade = {
  LISTA_APIS: [],
  STATUS_CODES_IGNORADOS: [404],
  NUM_ERROS_NO_INTERVALO: 3,
  INTERVALO_CONTAGEM_LOGS: 30,
  TEMPO_INATIVO_APOS_DISPARO_ERRO: 60,
  LABEL: 'altaPrioridade'
};

const mediaPrioridade = {
  LISTA_APIS: [],
  STATUS_CODES_IGNORADOS: [404],
  NUM_ERROS_NO_INTERVALO: 5,
  INTERVALO_CONTAGEM_LOGS: 30,
  TEMPO_INATIVO_APOS_DISPARO_ERRO: 60,
  LABEL: 'mediaPrioridade'
};

const baixaPrioridade = {
  LISTA_APIS: [],
  STATUS_CODES_IGNORADOS: [404],
  NUM_ERROS_NO_INTERVALO: 10,
  INTERVALO_CONTAGEM_LOGS: 30,
  TEMPO_INATIVO_APOS_DISPARO_ERRO: 60,
  LABEL: 'baixaPrioridade'
};

const padrao = {
  STATUS_CODES_IGNORADOS: [404],
  NUM_ERROS_NO_INTERVALO: 5,
  INTERVALO_CONTAGEM_LOGS: 30,
  TEMPO_INATIVO_APOS_DISPARO_ERRO: 60,
  LABEL: 'padrao'
};

const definePrioridade = (chaveApi) => {
  if(altaPrioridade.LISTA_APIS.includes(chaveApi)) return altaPrioridade;
  if(mediaPrioridade.LISTA_APIS.includes(chaveApi)) return mediaPrioridade;
  if(baixaPrioridade.LISTA_APIS.includes(chaveApi)) return baixaPrioridade;
  return padrao;
}

module.exports = definePrioridade;