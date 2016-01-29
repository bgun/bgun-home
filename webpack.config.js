module.exports = {
  entry: "./client-entry.js",
  output: {
    path: __dirname+'/public/',
    filename: "client-bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        cacheDirectory: true,
        presets: ['es2015']
      }
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }]
  }
};