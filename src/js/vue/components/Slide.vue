<template lang="pug">
  .slide(
    v-if="content && content.media"
  )
    div(
      :class="className"
    )
      media-images(
        v-if="content.media[0].images"
        :images="content.media[0].images"
      )
      media-publication(
        v-if="content.media[0].publication"
        :publication="content.media[0].publication[0]"
      )
    .slide__copy
      .slide__copy__caption(
        v-html="content.caption"
      )
</template>

<script>
import MediaImages from './MediaImages.vue';
import MediaPublication from './MediaPublication.vue';

export default {
  components: {
    MediaImages,
    MediaPublication,
  },

  props: {
    content: {
      caption: String,
      media: Array,
    }
  },

  data() {
    return {
      baseClass: 'slide__media',
    }
  },

  computed: {
    /** @return {string} */
    className() {
      return (this.content.media[0].images && this.content.media[0].images.length > 1)
          ? `${this.baseClass} ${this.baseClass}--multiple` : this.baseClass;
    },
  }
}
</script>
