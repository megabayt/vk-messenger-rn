module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    __DEV__: false,
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  modulePaths: [
    '<rootDir>',
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    // eslint-disable-next-line
    'node_modules/(?!react-native|react-native-vector-icons|material-bread)',
  ],
  setupFiles: [
    './setupTests.js',
  ],
};
