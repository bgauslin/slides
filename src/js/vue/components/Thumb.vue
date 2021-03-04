<template lang="pug">
  .thumb
    router-link(
      class="thumb__link",
      :title="thumb.alt",
      :to="{ name: 'slide', params: { slideshow: slideshow, slug: slug } }",
    )
      figure.thumb__frame
        img.thumb__image(
          :alt="thumb.alt",
          :src="thumb.src",
        )
</template>

<script>
export default {
  props: {
    slideshow: String,
    slug: String,
    media: Array,
  },

  mounted() {
    this.loadImage();
  },

  computed: {
    /** @return {Object} */
    thumb() {
      const media = this.media[0];
      return media.images ? media.images[0] : media.publication[0].images[0];
    }
  },

  methods: {
    /**
     * Removes 'loading' attribute from the image after it has fully downloaded.
     */
    loadImage() {
      const img = this.$el.querySelector('.thumb__image');
      img.onload = () => img.setAttribute('ready', '');
    },
  },
}
</script>
