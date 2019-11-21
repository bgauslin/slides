<template lang="pug">
  div.thumb
    router-link(
      class="thumb__link",
      :title="thumb.alt",
      :to="{ name: 'slide', params: { slideshow: slideshow, slug: slug } }",
    )
      figure.thumb__frame(
        loading,
      )
        img(
          :class="['thumb__image', 'thumb__image--hi-res']",
          :alt="thumb.alt",
          :src="thumb.src",
          loading,
        )
        img(
          :class="['thumb__image', 'thumb__image--placeholder']",
          :src="thumb.placeholder",
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
      const frame = this.$el.querySelector('.thumb__frame');
      const img = this.$el.querySelector('.thumb__image--hi-res');
      const placeholder = this.$el.querySelector('.thumb__image--placeholder');

      img.onload = () => {
        img.removeAttribute('loading');
        img.addEventListener('transitionend', () => {
          placeholder.parentNode.removeChild(placeholder);
          frame.removeAttribute('loading');
        }, { once: true });
      }
    },
  },
}
</script>
