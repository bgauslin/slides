<?php
$site_name = 'Slideshows';
$meta_description = 'Ben Gauslin’s Slideshows';

$prod_server = 'slides.gauslin.com';

$css = 'slides.css';
$js = 'slides.js';

if ($_SERVER['SERVER_NAME'] == $prod_server) {
  $manifest = file_get_contents('build/manifest.json');
  $json = json_decode($manifest, true);
  $css_path = '/build/ui/' . $json[$css];
  $js_path = '/build/ui/' . $json[$js];
} else {
  $css_path = '/ui/' . $css;
  $js_path = '/ui/' . $js;
}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo $site_name?></title>
    <meta name="description" content="<?php echo $meta_description?>">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?t=<?php echo date('U') ?>">
    <link rel="icon" type="image/png" href="/favicon.png?t=<?php echo date('U') ?>">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Source+Sans+Pro:400">
    <link rel="stylesheet" href="<?php echo $css_path; ?>">
  </head>

  <body ontouchstart no-touch>
    <div id="app">
      <noscript>
        <div class="no-js">
          <p class="no-js__message">Please <a href="http://enable-javascript.com" title="How to enable JavaScript in your browser" class="no-js__link">enable JavaScript</a> to view this website. Thanks!</p>
        </div>
      </noscript>
    </div>

    <script src="<?php echo $js_path ?>"></script>
  <?php if ($_SERVER['SERVER_NAME'] != $prod_server) { ?>
    <div id="css-debugger" src="/ui/breakpoints.json" theme="light"></div>
    <script src="https://css.gauslin.com/js/debugger.js"></script>
  <?php } ?>
  </body>

</html>