# gulp-pixel2rem
gulp plugin to enable usage of rem instead of pixel

# usage
first install package

```javascript
npm install --save-dev gulp-pixel2rem
```

then write in your gulpfile.js

```javascript
const gulp = require('gulp');
const px2rem = require('gulp-pixel2rem');
gulp.task('default', function () {
  return gulp.src('./index.html')
    .pipe(px2rem({maxScreenWidth: 480}))
    .pipe(gulp.dest('dist'))
});
```

finally it will auto generate the following code in your html file
```javascript
<script>
    var customWidth = innerWidth;
    if (innerWidth > 480) {
      customWidth = 480
    }
    document.documentElement.style.fontSize = 100 * customWidth / 750 + 'px';
    addEventListener('load', function () {
      setTimeout(function () {
        document.documentElement.style.fontSize = 100 * customWidth / 750 + 'px';
        window.unit = 100 * customWidth / 750;
        var e = document.createEvent('Event');
        e.initEvent('adjustReady', true, true);
        window.dispatchEvent(e);
      }, 480);
    });
    addEventListener('orientationchange', function () {
      setTimeout(function () {
        document.documentElement.style.fontSize = 100 * customWidth / 750 + 'px';
      }, 480)
    });
</script>
```
