var gulp = require('gulp');

gulp.task('dev', [
  'clean:build'
  ], function() {
    gulp.run('build:dev');
  }
);
