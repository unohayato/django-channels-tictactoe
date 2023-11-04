const path = require('path');
const { merge } = require('webpack-merge');

const entries = {}
for (const fileName of require('fs').readdirSync(path.resolve(__dirname, 'static', 'entries'))) {
  entries[fileName.split('.')[0]] = `./static/entries/${fileName}`
}

const baseConfig = {
  entry: entries,  // `entries` 以下を登録
  output: {
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',  // 後述しますが､ chunks: 'all' されていません
          name: 'vendor',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const devConfig = merge(baseConfig, {
  mode: 'development',
  output: {
    // Django が読みに来る(dev)
    publicPath: 'http://localhost:3000/static/',
  },
  devServer: {
    port: 3000,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
  },
});

const productConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    // Django が読みに来る(production)
    publicPath: '/static/'
  }
})

module.exports = (env, options) => {
  return options.mode === 'production' ? productConfig : devConfig
}