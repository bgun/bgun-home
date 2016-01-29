module.exports = {
  entry: "./client-entry.js",
  output: {
    path: __dirname+'/public/',
    filename: "client-bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  }
};