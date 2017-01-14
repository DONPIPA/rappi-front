var gulp = require('gulp');

gulp.task('build:dev', [
  'sass:dev',
  'js:dev',
  'copy',
  'watch',
  'browser:site'
]);

gulp.task('build:prod', [
  'sass:dev',
  'js:dev',
  'copy'
]);
