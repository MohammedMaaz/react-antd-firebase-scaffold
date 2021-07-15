const path = require("path");
const fs = require("fs");
const { generateTheme } = require("antd-theme-generator");

const themeVariables = ["@primary-color", "@border-radius-base"];

const varFilePath = path.join(__dirname, "./src/styles/vars.less");
function createVarFile() {
  const data = fs.readFileSync(
    path.join(__dirname, "./src/styles/theme.scss"),
    "utf8"
  );
  const vars = data
    .slice(data.indexOf("(") + 1)
    .split(",")
    .map((v) => v.trim())
    .map((v) => v.split(":").map((v) => v.trim()))
    .filter((v) => v[0].match(/^[_|a-z|A-Z][_|a-z|A-Z|0-9|-]*/));

  let less = `@import "~antd/lib/style/themes/default.less";\n`;
  vars.forEach((v) => (less += `@${v[0]}: ${v[1]};\n`));

  fs.writeFileSync(varFilePath, less);
}

const options = {
  stylesDir: path.join(__dirname, "./src/styles"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: varFilePath,
  themeVariables: themeVariables,
  indexFileName: "index.html",
  outputFilePath: path.join(__dirname, "./public/color.less"),
};

createVarFile();
generateTheme(options)
  .then((less) => {
    fs.unlinkSync(varFilePath);
  })
  .catch((error) => {
    console.log("Error", error);
  });
