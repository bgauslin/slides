<template lang="pug">
  div.thumbs
    div.thumbs__group
      thumb(
        v-for="(thumb, index) in content.thumbs",
        :index="index",
        :key="thumb.slug",
        :slideshow="content.slug",
        :slug="thumb.slug",
        :thumb="thumb.thumb",
      )
</template>

<script>
import Thumb from './Thumb.vue';

export default {
  components: { Thumb },

  props: {
    content: {
      slug: String,
      thumbs: Array,
    }
  }
}
</script>
