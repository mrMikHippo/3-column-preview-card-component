const { series } = require("gulp");

function minify(cb) {
  cb();
}

function transplite(cb) {
  cb();
}



function clean(cb) {

  cb();
}

function build(cb) {
  cb();
}

exports.build = build;
exports.default = series(clean, build);
