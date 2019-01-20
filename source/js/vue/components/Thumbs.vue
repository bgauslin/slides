<template lang="pug">
  div.thumbs
    div.thumbs__frame
      div.thumbs__group
        thumb(
          v-for="(thumb, index) in content.thumbs",
          :index="index",
          :slideshow="content.slug",
          :slug="thumb.slug",
          :thumb="thumb.thumb",
        )
</template>

<script>
import Thumb from './Thumb.vue';

export default {
  components: { Thumb },
  props: ['content'],
}
</script>
