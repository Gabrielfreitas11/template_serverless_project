const sut = require('.');

const validator = require('./validations/validator');
const insert = require('../../../../common/database/functions/insert');

jest.mock('./validations/validator');
jest.spyOn(validator, 'isValidParams').mockImplementation(() => true);

jest.mock('../../../../common/database/functions/insert');
jest.spyOn(insert, 'findOneAndUpdate').mockImplementation(() => new Promise((resolve) => resolve({
  cpf: [
    '12345678903',
  ],
  expireAt: '2022-06-02T00:00:00.000Z',
  _id: '6297a9a503f2a7000989b8c5',
  ip: '218.110.20.6',
  __v: 0,
  errorExcess: false,
})));

describe('blacklist Controller', () => {
  test('should return code 200 when we send correct data', async () => {
    const teste = {
      event: {
        body: {
          cpf: '12345678903',
          ip: '218.110.20.6',
          errorExcess: false,
        },
      },
    };
    const httpResponse = await sut(JSON.stringify(teste));

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      status_code: 200,
      response: {
        cpf: [
          '12345678903',
        ],
        expireAt: '2022-06-02T00:00:00.000Z',
        _id: '6297a9a503f2a7000989b8c5',
        ip: '218.110.20.6',
        __v: 0,
        errorExcess: false,
      },
    });
  });
});
