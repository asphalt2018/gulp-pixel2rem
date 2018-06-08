# gulp-pixel2rem
gulp plugin to enable usage of rem instead of pixel

# usage
first install package

``javascript
npm install --save-dev gulp-pixel2rem
```

```javascript
const gulp = require('gulp');
const px2rem = require('gulp-pixel2rem');
gulp.task('default', function () {
  return gulp.src('./index.html')
    .pipe(px2rem({maxScreenWidth: 480}))
    .pipe(gulp.dest('dist'))
});
```
