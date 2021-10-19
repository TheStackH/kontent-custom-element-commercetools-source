const fs = require("fs");

module.exports = {
  // configureWebpack: {
  //   devtool: 'source-map'
  // },
  devServer: {
    host: "localhost",
    https: {
      key: fs.readFileSync("./certs/localhost.key"),
      cert: fs.readFileSync("./certs/localhost.cert")
    }
  }
};
