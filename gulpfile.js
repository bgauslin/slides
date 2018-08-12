var elixir = require('laravel-elixir');

require('laravel-elixir-browserify-official');
require('laravel-elixir-vueify');
require('laravel-elixir-pug');
require('laravel-elixir-livereload');

elixir.config.sourcemaps = false;
elixir.config.assetsPath = 'source';
elixir.config.js.outputFolder = 'ui';
elixir.config.css.outputFolder = 'ui';

elixir(mix => {
  mix.browserify('slides.js')
  .stylus('slides.styl')
  .copy('source/html/index.php', 'public/index.php')
  .copy('source/icons', 'public/ui/icons')
  .copy('source/webfonts', 'public/ui/webfonts')
  .livereload()
  .browserSync({
    proxy: 'slides.gauslin.test'
  })
  .version([
    // 'public/ui/slides.css',
    // 'public/ui/slides.js'
  ]);
});
