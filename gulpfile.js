var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var connect = require("gulp-connect-php");
var sass = require("gulp-sass");
var uglify = require("gulp-uglifyjs");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var livereload = require("gulp-livereload");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");

gulp.task("watch", function () {
  // livereload.listen();

  // gulp.watch("./themes/custom/scrd_theme/images/*").on("change", function () {
  //   gulp
  //     .src("./themes/custom/scrd_theme/images/*")
  //     .pipe(
  //       imagemin({
  //         progressive: true,
  //         svgoPlugins: [{ removeViewBox: false }],
  //         use: [pngquant()],
  //       })
  //     )
  //     .pipe(gulp.dest("./themes/custom/scrd_theme/images"));
  // });

  gulp.watch("./themes/custom/scrd_theme/lib/*.js").on("change", function () {
    gulp
      .src("./themes/custom/scrd_theme/lib/*.js")
      .pipe(uglify("main.js"))
      .pipe(gulp.dest("./themes/custom/scrd_theme/js"));
  });

  gulp
    .watch("./modules/custom/convocatorias/lib/*.js")
    .on("change", function () {
      gulp
        .src("./modules/custom/convocatorias/lib/*.js")
        .pipe(uglify("main.js"))
        .pipe(gulp.dest("./modules/custom/convocatorias/js"));
    });

  gulp
    .watch("./themes/custom/scrd_theme/scss/**/**/*.scss")
    .on("change", function () {
      gulp
        .src("./themes/custom/scrd_theme/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(
          autoprefixer(
            "last 2 version",
            "safari 5",
            "ie 7",
            "ie 8",
            "ie 9",
            "opera 12.1",
            "ios 6",
            "android 4"
          )
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./themes/custom/scrd_theme/css"));
    });

  gulp
    .watch("./modules/custom/convocatorias/scss/**/*.scss")
    .on("change", function () {
      gulp
        .src("./modules/custom/convocatorias/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(
          autoprefixer(
            "last 2 version",
            "safari 5",
            "ie 7",
            "ie 8",
            "ie 9",
            "opera 12.1",
            "ios 6",
            "android 4"
          )
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./modules/custom/convocatorias/css"));
    });

  // gulp
  //   .watch([
  //     "./themes/custom/scrd_theme/css/style.css",
  //     "./themes/custom/scrd_theme/templates/**/*.html.twig",
  //     "./themes/custom/scrd_theme/js/*.js",
  //   ])
  //   .on("change", function (files) {
  //     livereload.changed(files);
  //   });

  gulp
    .watch([
      "./themes/custom/scrd_theme/css/style.css",
      "./modules/custom/convocatorias/css/style.css",
      "./themes/custom/scrd_theme/templates/**/*.html.twig",
      "./themes/custom/scrd_theme/js/*.js",
    ])
    .on("change", browserSync.reload);

  connect.server({}, function () {
    browserSync.init({
      proxy: "http://35.184.114.39:9005",
    });
  });
});
