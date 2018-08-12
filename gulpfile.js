const pkg = require('./package.json');

const gulp = require('gulp');

const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});

const onError = (err) => {
  console.log(err);
};

gulp.task('scss', () => {
  $.fancyLog('-> Compiling scss');
  return gulp.src(pkg.paths.src.scss + pkg.vars.scssName)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.sass({
        includePaths: pkg.paths.scss
      })
      .on('error', $.sass.logError))
    .pipe($.cached('sass_compile'))
    .pipe($.autoprefixer())
    .pipe($.size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(pkg.paths.build.css));
});

// css task - combine & minimize any distribution CSS into the public css folder
gulp.task('css', ['scss'], () => {
  $.fancyLog('-> Building css');
  return gulp.src(pkg.globs.distCss)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.newer({dest: pkg.paths.dist.css + pkg.vars.siteCssName}))
    .pipe($.print())
    .pipe($.concat(pkg.vars.siteCssName))
    .pipe($.cssnano({
      discardComments: {
        removeAll: true
      },
      discardDuplicates: true,
      discardEmpty: true,
      minifyFontValues: true,
      minifySelectors: true
    }))
    .pipe($.size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(pkg.paths.dist.css))
    .pipe($.filter('**/*.css'))
    .pipe($.livereload());
});

// babel js task - transpile JavaScript into build directory
gulp.task('js-babel', () => {
  $.fancyLog('-> Transpiling JavaScript via Babel');
  return gulp.src(pkg.globs.babelJs)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.newer({dest: pkg.paths.build.js}))
    .pipe($.babel())
    .pipe($.size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(pkg.paths.build.js));
});

// components - build .vue VueJS components
gulp.task('components', () => {
  $.fancyLog('-> Compiling Vue components');
  return gulp.src(pkg.globs.components)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.newer({dest: pkg.paths.build.js, ext: '.js'}))
    .pipe($.vueify({}))
    .pipe($.size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(pkg.paths.build.js));
});

// js task - minimize any distribution Javascript into the public js folder
gulp.task('js', ['js-babel', 'prism-js'], () => {
  $.fancyLog('-> Building js');
  return gulp.src(pkg.globs.distJs)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.if(['*.js', '!*.min.js'],
      $.newer({dest: pkg.paths.dist.js, ext: '.min.js'}),
      $.newer({dest: pkg.paths.dist.js})
    ))
    .pipe($.if(['*.js', '!*.min.js'],
      $.uglify()
    ))
    .pipe($.if(['*.js', '!*.min.js'],
      $.rename({suffix: '.min'})
    ))
    .pipe($.size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(pkg.paths.dist.js))
    .pipe($.filter('**/*.js'))
    .pipe($.livereload());
});

// Default task
gulp.task('default', ['css', 'js'], () => {
  $.livereload.listen();
  // gulp.watch([pkg.paths.src.scss + '**/*.scss'], ['css']);
  gulp.watch([pkg.paths.src.styl + '**/*.styl'], ['css']);
  gulp.watch([pkg.paths.src.css + '**/*.css'], ['css']);
  gulp.watch([pkg.paths.src.js + '**/*.js'], ['js']);
  gulp.watch([pkg.paths.templates + '**/*.{html,twig}'], () => {
    gulp.src(pkg.paths.templates)
      .pipe($.plumber({errorHandler: onError}))
      .pipe($.livereload());
  });
});

// Production build
gulp.task('build', ['default']);