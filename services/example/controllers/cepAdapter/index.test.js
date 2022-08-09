const sut = require('.');

jest.mock('../../client/cepAdapter');

describe('Cep Adapter Controller', () => {
  test('deve retornar 400 se o validator retornar false', async () => {
    const httpResponse = await sut({ queryStringParameters: {} });
    expect(httpResponse.statusCode).toBe(400);
  });
});
