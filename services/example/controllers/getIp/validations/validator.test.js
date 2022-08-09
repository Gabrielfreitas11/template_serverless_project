const { isValidParams } = require('./validator');

describe('Validator', () => {
  test('should return a message if not to be send params', () => {
    const result = isValidParams();
    expect(result).toBe('Faltando parâmetros obrigatórios');
  });

  test('should return true if to be send a valid ip', () => {
    const result = isValidParams({ ip: 'valid_ip' });
    expect(result).toEqual({ ip: 'valid_ip' });
  });

  test('should return a message which parameters are missing', () => {
    const result = isValidParams({ ip: 50 });
    expect(result).toBe('O seguinte parâmetro está faltando ou incorreto: ip');
  });
});
