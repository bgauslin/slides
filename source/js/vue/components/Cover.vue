<template lang="pug">
  div(
    class="cover",
    :style="coverImage(content.image)",
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
export default {
  props: ['content'],

  computed: {
    /**
     * @return {Object} The first slide in a slideshow.
     */
    slideFirst() {
      return this.$store.getters.slideFirst;
    }
  },

  methods: {
    /** 
     * @param {!Object} image
     * @return {string} An inline 'style' attribute for a background image.
     */
    coverImage(image) {
      return `background: url(${image.large.src}) center / cover no-repeat;`;
    },
  }
}
</script>
