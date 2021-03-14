module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/", "<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1'
  }
}
