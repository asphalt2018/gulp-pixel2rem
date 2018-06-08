# gulp-px2rem
gulp plugin to enable usage of rem instead of pixel

# usage
```javascript
const gulp = require('gulp');
const px2rem = require('../index');
gulp.task('default', function () {
  return gulp.src('./index.html')
    .pipe(px2rem({maxScreenWidth: 480}))
    .pipe(gulp.dest('dist'))
});
```
