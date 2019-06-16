# Slideshows

[slides.gauslin.com][url]

I wanted to tell the story of my New Orleans shotgun house renovation through words, photos, and drawings, and since Google Slides wasn't quite cutting it, I decided to build this web app.

![Slideshows](https://assets.gauslin.com/images/screenshots/slideshows--living-room.png)

All text, images, and PDF files are managed via Craft CMS, and [JSON endpoints][endpoints] were created for each of the various page types:

- All slideshows
  - [`index` transformer][transformer_index]
  - [`index` endpoint][endpoint_index]
- Individual slideshow
  - [`slideshow` transformer][transformer_slideshow]
  - [`slideshow` endpoint][endpoint_slideshow]
- An individual slide within a slideshow
  - [`slide` transformer][transformer_slide]
  - [`slide` endpoint][endpoint_slide]
- Thumbnail images for a slideshow
  - [`thumbs` transformer][transformer_thumbs]
  - [`thumbs` endpoint][endpoint_thumbs]

The frontend uses `vue-router` for URL [routing][routes] and `Vuex` for [state management][store_slideshow], and is composed of entirely of [single file `.vue` components][all_components] written in Pug, ES6, and Stylus.

An [`App` component][app_component] watches for route changes, determines what endpoint to fetch data from and [what component][slide_component] to populate with that data, and sets a CSS [transition][transitions] depending on what views the user is [navigating to and from][controls_component].

Light and dark modes are set via a [`Theme` component][theme_component] and is saved to `localStorage` for future visits.


[url]: https://slides.gauslin.com

[endpoints]: https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/craft/config/element-api.php#L30-L79

[transformer_index]: https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L80-L97
[transformer_slideshow]: https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L8-L35
[transformer_slide]: https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L101-L165
[transformer_thumbs]: https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L39-L76

[endpoint_index]: https://gauslin.com/api/v2/slideshows
[endpoint_slideshow]: https://gauslin.com/api/v2/slideshow/shotgun
[endpoint_slide]: https://gauslin.com/api/v2/slide/1615
[endpoint_thumbs]: https://gauslin.com/api/v2/slideshow/thumbs/shotgun

[routes]: https://github.com/bgauslin/slides/blob/2139a336b4802adf81dd1d4519964c712bf60d93/source/js/vue/routes.js#L8-L39
[store_slideshow]: https://github.com/bgauslin/slides/blob/2139a336b4802adf81dd1d4519964c712bf60d93/source/js/vue/store/slideshow.js#L1-L101
[all_components]: https://github.com/bgauslin/slides/tree/master/source/js/vue/components

[app_component]: https://github.com/bgauslin/slides/blob/master/source/js/vue/components/App.vue
[slide_component]: https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Slide.vue
[transitions]: https://github.com/bgauslin/slides/blob/2139a336b4802adf81dd1d4519964c712bf60d93/source/js/vue/transitions.js#L6-L30
[controls_component]: https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Controls.vue

[theme_component]: https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Theme.vue
