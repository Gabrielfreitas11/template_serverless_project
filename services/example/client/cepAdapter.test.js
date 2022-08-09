const { requestAPI } = require('./cepAdapter');
const http = require('../../../common/http');

jest.mock('../../../common/http');
jest.spyOn(http, 'request').mockImplementation(() => new Promise((resolve) => resolve({
  code: 200,
  message: 'CEP found',
  result: {
    logradouro: 'Rua Alberto José Werdine',
    bairro: 'Varginha',
    localidade: 'Itajubá',
    uf: 'MG',
    cep: '37501364',
  },
})));

describe('Client getAddress', () => {
  test('deve chamar getaddress com os parametros corretos', () => {
    const promise = jest.spyOn(http, 'request');
    requestAPI({ cep: 'valid_cep' });
    expect(promise).toBeCalledWith({
      url: 'http://cep.bldstools.com/',
      params: { cep: 'valid_cep' },
      method: 'get',
    });
  });
});
