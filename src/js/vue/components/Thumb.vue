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
    media: {
      images: Array,
    }
  },

  computed: {
    // TODO(Thumb): Update for publication image.
    thumb() {
      return this.media.images[0];
    }
  },
}
</script>
