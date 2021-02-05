module.exports = {
  displayName: 'core',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/setup-test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/core',
};
