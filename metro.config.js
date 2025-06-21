const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// Exclude `.svg` from assetExts and include it in sourceExts
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  ext => ext !== 'svg'
);
defaultConfig.resolver.sourceExts.push('svg');

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: defaultConfig.resolver,
};

// ✅ Merge everything and wrap with Reanimated
const finalConfig = mergeConfig(defaultConfig, customConfig);
module.exports = wrapWithReanimatedMetroConfig(finalConfig);
