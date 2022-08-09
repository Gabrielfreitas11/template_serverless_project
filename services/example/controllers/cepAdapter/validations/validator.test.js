const { isValidParams } = require('./validator');

describe('Validator', () => {
  test('deve retornar false se for enviado um cep', () => {
    const result = isValidParams();
    expect(result).toBe('Faltando parâmetros obrigatórios');
  });
  test('deve retornar true se for enviado um cep valido', () => {
    const result = isValidParams({ cep: '37501364' });
    expect(result).toEqual({ cep: '37501364' });
  });

  test('deve retornar false se não for enviado um cep valido', () => {
    const result = isValidParams({ cep: 'invalid_params' });
    expect(result).toBe('O seguinte parâmetro está faltando ou incorreto: cep');
  });
});
