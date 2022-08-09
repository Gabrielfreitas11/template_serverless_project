module.exports = {
  roots: ['<rootDir>/services'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/services/**/*.js',
    '!**/node_modules/**',
    '!**/mocks/**',
    '!**/routes.js/**',
  ],
  testEnvironment: 'node',
};
