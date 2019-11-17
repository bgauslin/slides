<template lang="pug">
  div.slideshows(
    v-if="content",
  )
    div.slideshows__group
      div.slideshow(
        v-for="slideshow in content.slideshows",
      )
        router-link(
          class="slideshow__link",
          :title="linkTitle(slideshow)",
          :to="{ name: 'cover', params: { slideshow: slideshow.slug } }",
        )
          template(v-for="image in slideshow.image")
            single-image(
              :image="image",
              :srcset="srcset",
              type="preview",
              width="900",
              height="600",
            )
          h2.slideshow__heading {{ slideshow.title }}
</template>

<script>
import { ImageWidth } from '../../queries/imageSizing';
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: {
    content: Object,
  },

  data() {
    return {
      srcset: {
        small: ImageWidth.SMALL,
        medium: ImageWidth.MEDIUM,
        large: ImageWidth.LARGE,
      },
    }
  },

  methods: {
    /**
     * @param {!string} slideshow
     * @return {string}
     */
    linkTitle(slideshow) {
      return `View the ${slideshow.title} slideshow`;
    }
  }
}
</script>
