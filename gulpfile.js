const { watch, src, dest, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();

function styles() {
  return src("work/scss/style.scss")
    .pipe(concat("style.min.css"))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest("work/css/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src("work/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("work/js"))
    .pipe(browserSync.stream());
}

function sync() {
  browserSync.init({
    server: {
      baseDir: "work/",
    },
  });
}

function watching() {
  watch(["work/scss/style.scss"], styles);
  watch(["work/js/main.js"], scripts);
  watch(["work/index.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.sync = sync;

exports.default = parallel(styles, scripts, sync, watching);
