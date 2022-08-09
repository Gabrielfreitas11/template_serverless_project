module.exports = {
  env: {
    'jest/globals': true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  plugins: ['jest'],
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-throw-literal': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'global-require': 'off',
    'no-console': 'off',
    'func-names': 'off',
    eqeqeq: 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    camelcase: 'off',
  },
};
