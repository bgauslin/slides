<?php
$site_name = 'Slideshows';
$meta_description = 'Meta description goes here...';

// Sets default paths.
$site = 'slides';

$css = 'ui/' . $site . '.css';
$js = 'ui/' . $site . '.js';
$css_path = '/' . $css;
$js_path = '/' . $js;

// Gets TLD for dev vs. production.
$host = $_SERVER['HTTP_HOST'];
$parts = explode('.', $host);
$tld_parts = array_slice($parts, -1);
$tld = array_pop($tld_parts);

// Uses manifest and updates paths if production.
if ($tld == 'com') {
  $file = file_get_contents('./build/rev-manifest.json');
  $json = json_decode($file, true);
  $css_prod = $json[$css];
  $js_prod = $json[$js];
  $css_path = '/build/' . $css_prod;
  $js_path = '/build/' . $js_prod;
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
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400|Material+Icons">
    <style><?php include('.' . $css_path) ?>"></style>
  </head>

  <body ontouchstart>
    <div id="app">
      <app></app>

      <noscript>
        <div class="no-js">
          <p class="no-js__message">Please <a href="http://enable-javascript.com" title="How to enable JavaScript in your browser" class="no-js__link">enable JavaScript</a> to view this website. Thanks!</p>
        </div>
      </noscript>
    </div>

    <script src="<?php echo $js_path ?>"></script>
  </body>

</html>