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

The UI is made entirely with Vue, and uses `vue-router` for URL routing, `Vuex` for state management, and all components are individual `.vue` files containing HTML, JavaScript, and CSS written in Pug, ES6, and Stylus.

- App controller...
- All state management is handled via small modules for extensibility and maintainability.
- To achieve a more app-like feel when moving between pages, all view transitions are handled by CSS and a `direction` module.
- Dark and light mode


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
