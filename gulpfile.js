const gulp         = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const babelify     = require('babelify');
const browserify   = require('browserify');
const browserSync  = require('browser-sync');
const cssnano      = require('gulp-cssnano');
const fs           = require('fs');
const hash         = require('gulp-hash');
const plumber      = require('gulp-plumber');
const stylus       = require('gulp-stylus');
const vueify       = require('vueify');

const onError = (err) => console.log(err);


// ======================================================================
// TODO: get vue components up and running with:
// vueify, ES6, babel, pug, stylus, uglify, browserify, etc...

// https://medium.com/@danielabro/vue-js-bundled-by-gulp-js-browserify-7a125e818a96
// https://forum.vuejs.org/t/i-got-stuck-with-single-file-components-and-gulp-compiling-vue-to-js/15866/10
// https://fettblog.eu/gulp-browserify-multiple-bundles/
// https://github.com/javisperez/Vue-gulp-boilerplate/blob/master/gulpfile.js

// https://github.com/vuejs/vueify
// https://github.com/babel/babelify/issues/103

gulp.task('js', () => {
  browserify('./source/js/test.js')
    .transform(babelify)
    .transform(vueify)
    .bundle()
    .pipe(fs.createWriteStream('test-bundle.js'))
});




// ======================================================================
// EVERYTHING BELOW WORKS JUST FINE...

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
