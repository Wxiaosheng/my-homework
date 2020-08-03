const path = require("path")

module.exports = {
  entry: "./main.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { pragma: "ToyReact.createElement" }]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
}