var path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  //web-dev-server
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    open: true,
  },

  mode: "none",
};
