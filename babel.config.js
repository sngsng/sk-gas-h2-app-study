module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: { '@src': './src' },
      },
    ],
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
  ],
};
