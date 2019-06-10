import * as path from 'path';
import { Configuration } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const defaultConfigHash: (
  config: Configuration
) => string = require('hard-source-webpack-plugin/lib/defaultConfigHash');

export default function(config: Configuration) {
  if (config.plugins) {
    config.plugins.push(
      new HardSourceWebpackPlugin({
        cacheDirectory: path.resolve(
          './node_modules/.cache/hard-source/[confighash]'
        ),
        configHash: (webpackConfig?: Configuration) =>
          (webpackConfig ? defaultConfigHash(webpackConfig) : '') +
          `-${process.env.NODE_ENV}`,
      })
    );

    config.plugins.push(
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        { test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]loader/ },
      ])
    );
  }
}
