<template lang="pug">
  div.slide(
    v-if="content",
  )
    div(
      :class="['slide__media', className]"
    )
      media-images(
        v-if="content.media.images",
        :images="content.media.images",
      )
      media-publication(
        v-if="content.media.publication",
        :publication="content.media.publication",
      )
      media-text(
        v-if="content.media.text",
        :text="content.media.text",
      )
    div.slide__caption(
      v-html="content.caption",
    )
</template>

<script>
import MediaImages from './MediaImages.vue';
import MediaText from './MediaText.vue';
import MediaPublication from './MediaPublication.vue';

export default {
  components: {
    MediaImages,
    MediaText,
    MediaPublication,
  },

  props: {
    content: {
      caption: String,
      media: {
        images: Array,
        publication: String,
        text: String,
      }
    }
  },

  computed: {
    /** @return {string} */
    className() {
      if (this.content.media.images && this.content.media.images.length > 1) {
        return 'slide__media--multiple';
      }
    },
  }
}
</script>
