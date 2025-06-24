const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Настройка для GitHub Pages
config.resolver.assetExts.push('ico');
config.resolver.platforms = ['ios', 'android', 'web'];

// Настройка для правильных путей на GitHub Pages
config.transformer.publicPath = '/TA';

// Настройка для правильной обработки baseUrl
config.transformer.minifierConfig = {
  ...config.transformer.minifierConfig,
  mangle: {
    ...config.transformer.minifierConfig?.mangle,
    keep_fnames: true,
  },
};

module.exports = config; 