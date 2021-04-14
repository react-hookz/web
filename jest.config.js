module.exports = {
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      testMatch: [
        "<rootDir>/tests/dom/**/*.[jt]s?(x)"
      ]
    },
    {
      displayName: 'ssr',
      preset: 'ts-jest',
      testMatch: [
        "<rootDir>/tests/ssr/**/*.[jt]s?(x)"
      ]
    }
  ],
  coverageDirectory: './coverage',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
};
