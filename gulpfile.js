const gulp         = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const babelify     = require('babelify');
const browserify   = require('browserify');
const browserSync  = require('browser-sync');
const cssnano      = require('gulp-cssnano');
const fs           = require('fs');
const hash         = require('gulp-hash');
const plumber      = require('gulp-plumber');
const runSequence  = require('run-sequence');
const stylus       = require('gulp-stylus');
const uglify       = require('gulp-uglify-es').default;
const vueify       = require('vueify');

const onError = (err) => console.log(err);

// ------------------------------------------------------------
// Configuration.

const project = 'slides';
const devServer = project + '.gauslin.test';

const paths = {
  'html': {
    'src': 'source/html/**/*.*',
    'dest': 'public',
  }, 
  'icons': {
    'src': 'source/icons/**/*.*',
    'dest': 'public/ui/icons',
  },
  'js': {
    'src': 'source/js/' + project + '.js',
    'dest': 'public/ui/' + project + '.js',
  },
  'stylus': {
    'src': 'source/stylus/' + project + '.styl',
    'dest': 'public/ui',
  },
  'version': {
    'src': [
      'public/ui/' + project + '.css',
      'public/ui/' + project + '.js',
    ],
    'dest': 'public/build/ui',
    'manifestFile': 'public/build/manifest.json',
  },
  'uglify': {
    'dest': 'public/ui',
  },
  'webfonts': {
    'src': 'source/webfonts/**/*.*',
    'dest': 'public/ui/webfonts',
  },
};

const tasks = {
  'default': [
    'html',
    'icons',
    'stylus',
    'vueify',
    'webfonts'
  ]
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

// TODO: full 'js' task: browserify -> babelify -> vueify -> uglify.
// https://medium.com/@danielabro/vue-js-bundled-by-gulp-js-browserify-7a125e818a96

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
    .pipe(gulp.dest(paths.stylus.dest));
});

// Uglify generated js.
gulp.task('uglify', () => {
  gulp.src(paths.js.dest)
    .pipe(uglify())
    .pipe(gulp.dest(paths.uglify.dest));
});

// Create hashed files for production.
gulp.task('version', () => {
  gulp.src(paths.version.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(hash())
    .pipe(gulp.dest(paths.version.dest))
    .pipe(hash.manifest(paths.version.manifestFile, {
      deleteOld: true,
    }))
    .pipe(gulp.dest('.'));
});

// Compile js from vue files.
// TODO: remove Vue development warning. More info:
// https://vuejs.org/v2/guide/deployment.html
// https://github.com/hughsk/envify
gulp.task('vueify', () => {
  browserify(paths.js.src)
    .transform(babelify.configure({
      presets: ['@babel/preset-env']
    }))
    .transform(vueify)
    .bundle()
    .pipe(fs.createWriteStream(paths.js.dest));
});

// Copy webfonts.
gulp.task('webfonts', () => {
  gulp.src(paths.webfonts.src)
    .pipe(gulp.dest(paths.webfonts.dest));
});

// ------------------------------------------------------------
// Composite tasks.

gulp.task('watch', tasks.default, () => {
  const watcher = gulp.watch('./source/**/*', ['refresh']);
  watcher.on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('browser-sync', ['watch'], () => {
  return browserSync({ proxy: devServer });
});

gulp.task('refresh', tasks.default, browserSync.reload);

// ------------------------------------------------------------
// Default task.

gulp.task('default', ['browser-sync']);
