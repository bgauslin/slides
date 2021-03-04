<template lang="pug">
  .cover(
    v-if="content && content.image",
  )
    single-image(
      :image="content.image[0]",
      :srcset="srcset",
      type="cover",
    )    
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
import { ImageWidth } from '../../queries/imageSizing';
import { mapGetters } from 'vuex';
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: {
    content: {
      image: Array[Object],
      slug: String,
      summary: String,
      title: String,
    }
  },

  data() {
    return {
      srcset: {
        small: ImageWidth.SMALL,
        medium: ImageWidth.MEDIUM,
        large: ImageWidth.LARGE,
      },
    }
  },

  computed: {
    ...mapGetters([
      'slideFirst',
    ]),
  }
}
</script>
