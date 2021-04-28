module.exports = {
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/tests/dom/**/*.test.[jt]s?(x)'],
    },
    {
      displayName: 'ssr',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/ssr/**/*.test.[jt]s?(x)'],
    },
  ],
  coverageDirectory: './coverage',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
};
