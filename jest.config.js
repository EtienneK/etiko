const { defaults } = require('jest-config')

module.exports = {
  ...defaults,
  moduleFileExtensions: ['js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', 'enzyme.js', '/.next/'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}']
}
