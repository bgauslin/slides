<template lang="pug">
  div.cover(
    v-if="content",
    :style="coverImage",
  )
    div.cover__frame
      header.cover__header
        h2.cover__heading {{ content.title }}
        p.cover__summary {{ content.summary }}
        router-link(
          class="cover__link",
          :title="content.title",
          :to="{ name: 'slide', params: { slideshow: content.slug, slug: slideFirst.slug } }",
        ) Start slideshow
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    content: {
      image: Array[Object],
      slug: String,
      summary: String,
      title: String,
    }
  },

  computed: {
    ...mapGetters(['slideFirst']),

    /** 
     * Inline 'style' attribute value for a background image.
     * @return {string} 
     */
    coverImage() {
      return `background: url(${this.content.image[0].src}) center / cover no-repeat;`;
    },
  }
}
</script>
