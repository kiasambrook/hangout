const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  // Optional: If you want to use a custom folder for your css files.
  input: './app/global.css',

  // Optional: If you want to use a custom output folder for your css files.
  // output: './css',
});
