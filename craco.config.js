const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer"),
        "process": false,
        "util": false,
        "url": false,
        "http": false,
        "https": false,
        "fs": false,
        "path": false,
        "os": false,
        "crypto": false,
        "zlib": false,
        "net": false,
        "tls": false,
        "child_process": false,
      };

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ];

      return webpackConfig;
    },
  },
};