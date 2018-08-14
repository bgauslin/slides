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
const uglify       = require('gulp-uglify-es').default;
const vueify       = require('vueify');

const onError = (err) => console.log(err);

// ------------------------------------------------------------
// Path config for tasks.
const project = 'slides';

const paths = {
  'devServer': project + '.gauslin.test',
  'html': {
    'src': ['source/html/**/*.*'],
    'dest': 'public'
  }, 
  'icons': {
    'src': ['source/icons/**/*.*'],
    'dest': 'public/ui/icons'
  },
  'js': {
    'src': 'source/js/' + project + '.js',
    'dest': 'public/ui/' + project + '.js'
  },
  'stylus': {
    'src': 'source/stylus/' + project + '.styl',
    'dest': 'public/ui'
  },
  'version': {
    'src': [
      'public/ui/' + project + '.css',
      'public/ui/' + project + '.js'
    ],
    'dest': 'public/build/ui',
    'manifestFile': 'public/build/manifest.json'
  },
  'webfonts': {
    'src': ['source/webfonts/**/*.*'],
    'dest': 'public/ui/webfonts'
  }
};

// ------------------------------------------------------------
// Individual tasks.

// Copy html.
gulp.task('html', () => {
  gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
});

// Copy icons.
gulp.task('icons', () => {
  gulp.src(paths.icons.src)
    .pipe(gulp.dest(paths.icons.dest));
});

// Compile and minify stylus.
gulp.task('stylus', () => {
  gulp.src(paths.stylus.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.stylus.dest))
});

// Uglify generated js.
gulp.task('uglify', () => {
  gulp.src(paths.js.dest)
    .pipe(uglify())
    .pipe(gulp.dest('public/ui'))
});

// Generate hashed files for production.
gulp.task('version', () => {
  gulp.src(paths.version.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(hash())
    .pipe(gulp.dest(paths.version.dest))
    .pipe(hash.manifest(paths.version.manifestFile, {
      deleteOld: true,
    }))
    .pipe(gulp.dest('.'))
});

// TODO: remove Vue development warning
// Generate js files.
gulp.task('vue', () => {
  browserify(paths.js.src)
    .transform(babelify.configure({
      presets: ['@babel/preset-env']
    }))
    .transform(vueify)
    .bundle()
    .pipe(fs.createWriteStream(paths.js.dest))
});

// Copy webfonts.
gulp.task('webfonts', () => {
  gulp.src(paths.webfonts.src)
    .pipe(gulp.dest(paths.webfonts.dest));
});

// ------------------------------------------------------------
// Composite tasks.

// gulp.task('js', () => {
  // Run tasks in series: vue, uglify
// });

gulp.task('watch', ['html', 'icons', 'stylus', 'webfonts'], () => {
  const watcher = gulp.watch('./source/**/*', ['refresh']);
  watcher.on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('browser-sync', ['watch'], () => {
  return browserSync({ proxy: devServer });
});

// ------------------------------------------------------------
// Default task.

gulp.task('default', ['browser-sync']);
