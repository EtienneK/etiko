module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/", "<rootDir>/node_modules/'],
  globalSetup: '<rootDir>/jest.env.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  moduleNameMapper: {
    '^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1'
  }
}
