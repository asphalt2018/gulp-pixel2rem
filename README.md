# gulp-pixel2rem
gulp plugin to transform pixel to rem automatically, compatible with both pc and mobile devices

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
    .pipe(px2rem({maxWidth: 480}))
    .pipe(gulp.dest('dist'))
});
```

finally it will generate the following code in your html file automatically
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
# options
* maxWidth    
the container's max width of you app
* layoutWidth     
better be an integral multiple of the layout width of your psd or sketch file, ofter, is't set to 750
