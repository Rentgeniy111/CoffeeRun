const { watch, src, dest, parallel, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const prefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");

function styles() {
  return src(["work/styles/*.scss", "!work/styles/style.min.css"])
    .pipe(prefixer())
    .pipe(concat("style.min.css"))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest("work/styles"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["work/scripts/*.js", "!work/scripts/main.min.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("work/scripts"))
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
  watch(["work/styles/*.scss"], styles);
  watch(["work/scripts/*.js", "!work/scripts/main.min.js"], scripts);
  watch(["work/index.html"]).on("change", browserSync.reload);
}

function building() {
  return src(
    ["work/css/style.min.css", "work/js/main.min.js", "work/**/*.html"],
    { base: "work" }
  ).pipe(dest("build"));
}

function cleanBuild() {
  return src("build").pipe(clean());
}

exports.build = series(cleanBuild, building);
exports.default = parallel(styles, scripts, sync, watching);
