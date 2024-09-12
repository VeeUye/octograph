module.exports = function (wallaby) {
 return {
  files: [
   'src/**/*.ts',
   'src/**/*.tsx',
   '!src/**/*.test.ts',
   '!src/**/*.test.tsx',
   'jest.setup.ts',
  ],
  tests: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  env: {
   type: 'node',
  },
  testFramework: 'jest',
  setup: function (wallaby) {
   const jestConfig = require('./jest.config.ts').default
   wallaby.testFramework.configure(jestConfig)
  },
 }
}
