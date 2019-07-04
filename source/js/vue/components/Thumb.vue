<template lang="pug">
  div.thumb
    router-link(
      class="thumb__link",
      :title="thumb.alt",
      :to="{ name: 'slide', params: { slideshow: slideshow, slug: slug } }",
    )
      figure.thumb__frame
        img.thumb__image(
          :alt="thumb.alt",
          :height="thumb.height",
          :src="thumb.src",
          :width="thumb.width",
        )
</template>

<script>
export default {
  props: {
    index: Number,
    slideshow: String,
    slug: String,
    thumb: {
      alt: String,
      height: Number,
      src: String,
      width: Number,
    },
  },

  computed: {
    /** @return {number} */
    count() {
      return this.index + 1;
    }
  },
}
</script>
