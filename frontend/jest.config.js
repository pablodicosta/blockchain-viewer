module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsconfig: "tsconfig.jest.json"
    }
  },
  snapshotResolver: './jest.snapshotResolver.js'
};