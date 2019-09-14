<template lang="pug">
  div.slide(
    v-if="content",
  )
    div(
      :class="className('slide__media')"
    )
      media-images(
        v-if="content.media[0].images",
        :images="content.media[0].images",
      )
      media-publication(
        v-if="content.media[0].publication",
        :publication="content.media[0].publication",
      )
    div.slide__caption(
      v-html="content.caption",
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

  methods: {
    /**
     * @param {!string} name - Base classname for the element.
     * @return {string}
     */
    className(name) {
      return (this.content.media[0].images && this.content.media[0].images.length > 1)
          ? `${name} ${name}--multiple` : name;
    },
  }
}
</script>
