// Load .env file for babel plugin
require('dotenv').config();

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: [
          'GOOGLE_WEB_CLIENT_ID',
          'GOOGLE_ANDROID_CLIENT_ID',
          'GOOGLE_CLIENT_SECRET',
          'GOOGLE_MAPS_API_KEY',
          'API_BASE_URL',
        ],
      },
    ],
  ],
};

