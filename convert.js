var threeOBJ = require("three-obj")();
var fs = require("fs");

var source = process.argv[2];
var output = process.argv[3];

if (!source || !output) {
  throw new Error("Must provide source and output like so: node convert.js ./source.obj ./output.js");
}

console.log("Converting %s to %s", source, output);

threeOBJ.convert(source, output, function(response) {
  console.log("File saved at: "+output);
});