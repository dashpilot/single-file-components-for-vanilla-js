const fs = require("fs");
const path = require("path");
const { minify } = require("terser");
const { parse } = require("node-html-parser");
const CleanCSS = require("clean-css");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public", 0744);
  fs.mkdirSync("./public/assets", 0744);
}

var index = fs.readFileSync("./src/index.html", "utf8");
fs.writeFileSync("./public/index.html", index, "utf8");

var data = [];
data.script = "";
data.style = "";
data.template = "";

const folder = "./src/components/";
let files = fs.readdirSync(folder);
let i = 0;
files.forEach(function (file) {
  extractTags(folder + file, data);
  i++;
});

var output = new CleanCSS().minify(data.style);
fs.writeFileSync("./public/assets/app.min.css", output.styles, "utf8");

minifyJs(data);

// helpers

function extractTags(filepath, data) {
  var file = fs.readFileSync(filepath, "utf8");
  var filename = path.basename(filepath, ".html");

  const root = parse(file);
  if (root.querySelector("template")) {
    data.template +=
      'document.querySelectorAll("' +
      filename +
      '").forEach(function(e){' +
      "e.innerHTML = `" +
      root.querySelector("template").innerHTML.replace(/\s\s+/g, " ") +
      "`" +
      "})\n";
  }
  if (root.querySelector("script")) {
    data.script += root.querySelector("script").text + "\n";
  }
  if (root.querySelector("style")) {
    data.style += root.querySelector("style").text;
  }

  //console.log(data);
}

async function minifyJs(data) {
  var combined = data.template + " " + data.script;
  // only minify js in production
  var env = process.argv[2] || "dev";
  if (env == "dev") {
    fs.writeFileSync("./public/assets/app.min.js", combined, "utf8");
  } else {
    var result = await minify(combined, {
      sourceMap: true,
    });
    fs.writeFileSync("./public/assets/app.min.js", result.code, "utf8");
  }
}
