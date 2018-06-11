const Transform = require('readable-stream/transform');
const BufferStreams = require('bufferstreams');
const PluginError = require('plugin-error');
module.exports = function (options) {
  let customWidth = 500;
  if (options && options.maxWidth) {
    customWidth = options.maxWidth
  }
  return new Transform({
    objectMode: true,
    transform: function (file, enc, cb) {
      if (file === null) {
        cb(null, file);
        return;
      }
      const replacer = '  <script>\n' +
        '   var customWidth = innerWidth;\n' +
        '   if (innerWidth > ' + customWidth + ') {\n' +
        '     customWidth = ' + customWidth + '\n' +
        '   }\n' +
        '   document.documentElement.style.fontSize = 100 * customWidth / 750 + \'px\';\n' +
        '   addEventListener(\'load\', function () {\n' +
        '     setTimeout(function () {\n' +
        '       document.documentElement.style.fontSize = 100 * customWidth / 750 + \'px\';\n' +
        '       window.unit = 100 * customWidth / 750;\n' +
        '       var e = document.createEvent(\'Event\');\n' +
        '       e.initEvent(\'adjustReady\', true, true);\n' +
        '       window.dispatchEvent(e);\n' +
        '     }, 480);\n' +
        '   });\n' +
        '   addEventListener(\'orientationchange\', function () {\n' +
        '     setTimeout(function () {\n' +
        '       document.documentElement.style.fontSize = 100 * customWidth / 750 + \'px\';\n' +
        '     }, 480)\n' +
        '   });\n' +
        '  </script>\n' +
        '</head>';

      function pxToRem(buffer, done) {
        let buffers;
        try {
          buffers = new Buffer(buffer.toString().replace('</head>', replacer))
        } catch (e) {
          options = Object.assign({}, options, {fileName: file.path});
          done(new PluginError('gulp-px2rem', e, options));
          return;
        }
        done(null, buffers)
      }

      const self = this;
      if (file.isStream()) {
        file.contents.pipe(new BufferStreams(function (none, buffer, done) {
          pxToRem(buffer, function (err, contents) {
            if (err) {
              self.emit('error', err);
              done(err);
            } else {
              done(null, contents);
              self.push(file);
            }
            cb();
          })
        }));
        return;
      }

      pxToRem(file.contents, function (err, contents) {
        if (err) {
          self.emit('error', err);
        } else {
          file.contents = contents;
          self.push(file);
        }
        cb();
      })
    }
  });
};