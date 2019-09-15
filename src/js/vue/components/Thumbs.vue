<template lang="pug">
  div.thumbs
    div.thumbs__group
      thumb(
        v-for="slide in content.slides",
        :key="slide.id",
        :slideshow="content.slug",
        :slug="slide.slug",
        :media="slide.media[0]",
      )
</template>

<script>
import Thumb from './Thumb.vue';

export default {
  components: { Thumb },

  props: {
    content: {
      id: String,
      slides: Array,
      slug: String,
      title: String,
    }
  }
}
</script>
