var gulp = require('gulp');
var config = require('./config');

gulp.task('copy:html', function() {
  return gulp.src(config.source.html, {base: config.source.base})
    .pipe(gulp.dest(config.server.baseDir));
});

gulp.task('copy:fonts', function() {
  return gulp.src(config.source.fonts, {base: config.source.base})
    .pipe(gulp.dest(config.server.baseDir));
});

gulp.task('copy:images', function() {
  return gulp.src(config.source.images, {base: config.source.base})
    .pipe(gulp.dest(config.server.baseDir));
});

gulp.task('copy:data', function() {
  return gulp.src(config.source.data, {base: config.source.base})
    .pipe(gulp.dest(config.server.baseDir));
});

gulp.task('copy', [
  'copy:html',
  'copy:fonts',
  'copy:images',
  'copy:data'
]);
