var gulp = require('gulp');
var del = require('del');
var config = require('./config');

gulp.task('clean:build', function() {
    return del([config.server.baseDir]);
});
