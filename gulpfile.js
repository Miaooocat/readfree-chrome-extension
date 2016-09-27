var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

gulp.task('default', ['compress'], function() {
    return gulp.src(['src/zepto.min.js', 'tmp/show.js'])
        .pipe(concat('show.js'))
        .pipe(gulp.dest('build'));
});

gulp.watch('src/show.js', ['default']);

gulp.task('compress', function () {
    return gulp.src('src/show.js')
        .pipe(uglify())
        .pipe(gulp.dest('tmp'));
});
