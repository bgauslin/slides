<template lang="pug">
  div.cover(
    :style="coverImage(content.image[0])",
  )
    div.cover__frame
      header.cover__header
        h2.cover__heading {{ content.title }}
        p.cover__summary {{ content.summary }}
        router-link(
          class="cover__link",
          :title="content.title",
          :to="{ name: 'slide', params: { slideshow: content.slug, slug: slideFirst.slug } }",
        ) Start slideshow
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    content: {
      slideshow: {
        image: Object,
        slug: String,
        summary: String,
        title: String,
      }
    }
  },

  computed: {
    ...mapGetters(['slideFirst'])
  },

  methods: {
    /** 
     * @param {!Object} image
     * @return {string} An inline 'style' attribute for a background image.
     */
    coverImage(image) {
      return `background: url(${image.src}) center / cover no-repeat;`;
    },
  }
}
</script>
