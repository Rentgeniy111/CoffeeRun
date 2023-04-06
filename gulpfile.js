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
  return src([
    "node_modules/jquery/dist/jquery.min.js",
    "work/scripts/checklist.js",
    "work/scripts/formhandler.js",
    "work/scripts/datastore.js",
    "work/scripts/truck.js",
    "work/scripts/main.js",
  ])
    .pipe(concat("main.min.js"))
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
