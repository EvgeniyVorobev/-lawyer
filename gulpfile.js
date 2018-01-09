var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-csso');



gulp.task('css', function(){
  return gulp.src('css/*.css')
    .pipe(concatCss("style.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest('assets'))
});

gulp.task('default', [ 'css' ]);
