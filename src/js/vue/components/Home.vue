<template lang="pug">
  div.slideshows
    div.slideshows__group
      div.slideshow(
        v-for="slideshow in content.slideshows",
      )
        router-link(
          class="slideshow__link",
          :title="linkTitle(slideshow)",
          :to="{ name: 'cover', params: { slideshow: slideshow.slug } }",
        )
          single-image(
            v-if="slideshow.image[0]",
            :image="slideshow.image[0]",
          )
          h2.slideshow__heading {{ slideshow.title }}
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: {
    content: Object,
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
