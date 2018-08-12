const gulp         = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const browserify   = require('gulp-browserify');
const browserSync  = require('browser-sync');
const cssnano      = require('gulp-cssnano');
const hash         = require('gulp-hash');
const plumber      = require('gulp-plumber');
const pump         = require('pump');
const stylus       = require('gulp-stylus');
const uglify       = require('gulp-uglify');

const onError = (err) => console.log(err);


// TODO: getting vue components up and running may take a little work:
// vueify, ES6, babel, pug, stylus, uglify, browserify...
// https://medium.com/@danielabro/vue-js-bundled-by-gulp-js-browserify-7a125e818a96

gulp.task('js', (cb) => {
  pump([
    gulp.src('./source/js/slides.js')
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(browserify({
        transform: ['vueify', 'babelify', 'aliasify']
      })),
      uglify(),
      gulp.dest('./public/ui')
    ],
    cb
  );
});

gulp.task('stylus', () => {
  gulp.src('./source/stylus/slides.styl')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./public/ui'))
});

gulp.task('html', function() {
  gulp.src(['./source/html/**/*.*'])
    .pipe(gulp.dest('./public'));
});

gulp.task('icons', function() {
  gulp.src(['./source/icons/**/*.*'])
    .pipe(gulp.dest('./public/ui/icons'));
});

gulp.task('webfonts', function() {
  gulp.src(['./source/webfonts/**/*.*'])
    .pipe(gulp.dest('./public/ui/webfonts'));
});

// ------------------------------------------------------------
// Composite tasks

gulp.task('watch', ['stylus', 'html', 'webfonts', 'icons'], () => {
  const watcher = gulp.watch('./source/**/*', ['refresh']);
  watcher.on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('browser-sync', ['watch'], () => {
  return browserSync({
    proxy: 'slides.gauslin.test'
  });
});

// ------------------------------------------------------------
// Dev/Prod tasks

// Run 'gulp' for developement
gulp.task('default', ['browser-sync']);

// Run 'gulp version' to generate hashed assets for production
gulp.task('version', () => {
  gulp.src('./public/ui/slides.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(hash())
    .pipe(gulp.dest('./public/ui'))
    .pipe(hash.manifest('./public/ui/manifest.json', {
      deleteOld: true,
    }))
    .pipe(gulp.dest('.'))
});
