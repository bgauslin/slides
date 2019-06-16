# Slideshows

[slides.gauslin.com](https://slides.gauslin.com)

I wanted to tell the story of my New Orleans shotgun house renovation through words, photos, and drawings, and since Google Slides wasn't quite cutting it, I decided to build this web app.

![Slideshows](https://assets.gauslin.com/images/screenshots/slideshows--living-room.png)

All text, images, and PDF files are managed via Craft CMS, and [JSON endpoints][endpoints] were created for each of the various page types.

[endpoints]: https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/craft/config/element-api.php#L30-L79

The frontend uses `vue-router` for [URL routing][routing] and `Vuex` for [state management][store], and is composed entirely of [single file `.vue` components][vue_components] written in Pug, ES6, and Stylus.

[routing]: https://github.com/bgauslin/slides/blob/2139a336b4802adf81dd1d4519964c712bf60d93/source/js/vue/routes.js#L8-L39
[store]: https://github.com/bgauslin/slides/blob/2139a336b4802adf81dd1d4519964c712bf60d93/source/js/vue/store/slideshow.js#L1-L101
[vue_components]: https://github.com/bgauslin/slides/tree/master/source/js/vue/components

An `App` component [watches][watches] for [route changes][route_changes], determines the [type of data][type_of_data] and [endpoint][app_endpoint] to [fetch the data from][fetch_data], then sets a [transition direction][transition_direction] and related [CSS classes][transition_classes] for [leaving the current route][leave_class] and [entering the new route][enter_class].

[watches]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/components/App.vue#L103-L107
[route_changes]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/components/App.vue#L218-L235
[type_of_data]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/components/App.vue#L237-L309
[app_endpoint]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/components/App.vue#L164-L175
[fetch_data]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/components/App.vue#L183-L212
[transition_direction]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/transitions.js#L4-L32
[transition_classes]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/stylus/slides/app.styl#L11-L35
[leave_class]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/components/App.vue#L354-L363
[enter_class]: https://github.com/bgauslin/slides/blob/c6e5e39246236966070f4b426d0c667658eb4d16/source/js/vue/components/App.vue#L339-L348

Each route loads its own component and is passed data from its related endpoint transformer:

- All slideshows:
  - ['Home' component](https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Home.vue)
  - ['index' endpoint transformer](https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L80-L97)
- Individual slideshow:
  - ['Cover' component](https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Cover.vue)
  - ['slideshow' endpoint transformer](https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L8-L35)
- An individual slide within a slideshow:
  - ['Slide' component](https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Slide.vue)
  - ['slide' endpoint transformer](https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L101-L165)
- Thumbnail images for a slideshow:
  - ['Thumbs' component](https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Thumbs.vue)
  - ['thumbs' endpoint transformer](https://github.com/bgauslin/main/blob/4f31cdbd2144fb72159cbd3f9b23445754a01eb2/source/transformers/slides.php#L39-L76)

Light and dark modes are set via a [`Theme` component][theme_component] and is saved to `localStorage` for future visits.

[theme_component]: https://github.com/bgauslin/slides/blob/master/source/js/vue/components/Theme.vue
