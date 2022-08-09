const sut = require('.');

const validator = require('./validations/validator');
const find = require('../../../../common/database/functions/find');

jest.mock('./validations/validator');
jest.spyOn(validator, 'isValidParams').mockImplementation(() => true);

jest.mock('../../../../common/database/functions/find');
jest.spyOn(find, 'findOne').mockImplementation(() => new Promise((resolve) => resolve({
  _id: '6297aa8a03f2a7000989b8c6',
  ip: '280.110.20.6',
  __v: 0,
  cpf: [
    '145.970.589-07',
    '404.028.600-63',
    '697.867.290-48',
  ],
  errorExcess: false,
  expireAt: '2022-06-02T00:00:00.000Z',
})));

describe('getIp Controller', () => {
  test('should return code 200 when we send correct data', async () => {
    const httpResponse = await sut({ queryStringParameters: { ip: '218.110.20.6' } });

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      status_code: 200,
      response: {
        _id: '6297aa8a03f2a7000989b8c6',
        ip: '280.110.20.6',
        __v: 0,
        cpf: [
          '145.970.589-07',
          '404.028.600-63',
          '697.867.290-48',
        ],
        errorExcess: false,
        expireAt: '2022-06-02T00:00:00.000Z',
      },
    });
  });

  test('deve retornar 400 se o validator retornar false', async () => {
    jest.spyOn(validator, 'isValidParams').mockImplementation(() => 'erro');
    const httpResponse = await sut({ queryStringParameters: { } });

    expect(httpResponse.statusCode).toBe(400);
  });
});
