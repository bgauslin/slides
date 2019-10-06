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

  computed: {
    /** @return {Object} */
    thumb() {
      const media = this.media[0];
      return media.images ? media.images[0] : media.publication[0].images[0];
    }
  },
}
</script>
