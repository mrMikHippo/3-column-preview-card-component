const { series, src, dest } = require("gulp"),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  inject = require('gulp-inject');

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

function clean(cb) {
  cb();
}

function html() {
  return src(paths.src + '*.html')
  .pipe(inject(src(paths.src + '*.html'), {relative: true, starttag: '<!-- inject:index:{{ext}} -->'}))
    .pipe(dest(paths.dev));
}

function production_html() {
  return src(paths.src + '*.html')
    .pipe(inject(src(paths.src + '*.html'), {relative: true, starttag: '<!-- inject:index:{{ext}} -->'}))
    .pipe(dest(paths.prod));
}

exports.build = series(production_css, production_html);
exports.default = series(css, html);
// exports.default = series(clean, build);
