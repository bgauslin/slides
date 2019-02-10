<template lang="pug">
  div.slideshows
    div.slideshows__group
      div.slideshow(
        v-for="slideshow in content",
      )
        router-link(
          class="slideshow__link",
          :title="linkTitle(slideshow)",
          :to="{ name: 'cover', params: { slideshow: slideshow.slug } }",
        )
          single-image(
            v-if="slideshow.image",
            :className="imageClass",
            :image="slideshow.image",
          )
          h2.slideshow__heading {{ slideshow.title }}
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  props: ['content'],

  components: { SingleImage },

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
