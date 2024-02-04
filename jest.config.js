module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
