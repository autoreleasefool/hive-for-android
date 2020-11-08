module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx'],
        alias: {
          api: ['./src/api'],
          assets: ['./src/assets'],
          components: ['./src/components'],
          navigation: ['./src/navigation'],
          sections: ['./src/sections/'],
          utils: ['./src/utils/'],
        },
      },
    ],
  ],
};
