const { series, src, dest } = require("gulp"),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  inject = require('gulp-inject'),
  cleanP = require('gulp-clean'),
  htmlclean = require('gulp-htmlclean');

const paths = {
  src: 'src/',
  dev: 'dev/',
  prod: 'prod/'
};

function css() {
  return src(paths.src + 'css/styles.css')
    .pipe(dest(paths.dev + 'css/'));
}

function production_css(cb) {
  return src(paths.src + 'css/styles.css')
    .pipe(postcss())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest(paths.prod + 'css/'));
}

function clean() {
  return src(paths.dev + '*', {read: false})
    .pipe(cleanP());
}

function prod_clean() {
  return src(paths.prod + '*', {read: false})
    .pipe(cleanP());
}

function html() {
  return src(paths.src + 'index.html')
  .pipe(inject(src(paths.src + 'css/*.css', {read: false}), {relative: true}))
  .pipe(dest(paths.dev));
}

function production_html() {
  return src(paths.src + '*.html')
    .pipe(inject(src(paths.prod + 'css/*.min.css', {read: false}), {ignorePath: '../' + paths.prod, relative: true}))
    .pipe(htmlclean({
      protect: />\n/g,
      unprotect: /-->/g
    }))
    .pipe(dest(paths.prod));
}

exports.build = series(prod_clean, production_css, production_html);
exports.default = series(clean, css, html);
exports.clean = clean;
// exports.default = series(clean, build);
