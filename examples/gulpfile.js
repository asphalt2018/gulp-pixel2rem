const gulp = require('gulp');
const px2rem = require('../index');
gulp.task('default', function () {
  return gulp.src('./index.html')
    .pipe(px2rem({maxScreenWidth: 480, layoutWidth: 750}))
    .pipe(gulp.dest('dist'))
});