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

// Apparently, this is working now...
gulp.task('js', () => {
  browserify('./source/js/slides.js')
    .transform(babelify.configure({
      presets: ['@babel/preset-env']
    }))
    .transform(vueify)
    .bundle()
    .pipe(fs.createWriteStream('./public/ui/slides.js'))
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
