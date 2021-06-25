const path = require("path");
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

// const path = require('path')
module.exports = override(
  fixBabelImports("antd", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: path.join(__dirname, "./src/styles/vars.less"),
  })
);
