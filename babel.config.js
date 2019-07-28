// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const root = path.join(__dirname, './');

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: [root],
        extensions: [
          'js',
          'ts',
          'tsx',
          'android.js',
          'ios.js',
          'android.jsx',
          'ios.jsx',
          'android.ts',
          'ios.ts',
          'android.tsx',
          'ios.tsx',
        ],
        loglevel: 'silent',
        alias: {
          '^@/(.+)': `${root}src/\\1`,
        },
      },
    ],
  ],
};
