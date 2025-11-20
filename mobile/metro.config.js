const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

// Load .env file
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const defaultConfig = getDefaultConfig(__dirname);

/** @type {import('metro-config').ConfigT} */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

