<template lang="pug">
  figure.image(
    :style="placeholder(image)",
  )
    img.image__hi-res(
      v-if="!loading",
      :alt="image.alt",
      :src="image.small.src",
      :srcset="srcset(image)",
    )
</template>

<script>
import imagesLoaded from 'imagesloaded';
// import ImageFetcher from './ImageFetcher.vue';

export default {
//   components: { ImageFetcher },

  props: ['image'],

  data () {
    return {
      loading: null, // override null while we test...
    }
  },

  mounted () {
    this.loadImages();
  },

  methods: {
    loadImages () {
      this.loading = true;
      const self = this;
      imagesLoaded(this.$el.querySelector('.image__hi-res'), self, instance => {
        self.loading = false;
      });
    },

    // TODO: refactor placeholder background sizing...
    placeholder (image) {
      return;
      // return `background: url(${image.placeholder}) center center / cover no-repeat`;
    },

    srcset (image) {
      return `${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

// NOTE: responsive image sizing is inverted for the occasional portrait image
.image:only-child .image__hi-res
  max-height 100%
  max-width 100%
  width auto

.image__hi-res
  animation fadeIn .5s ease // TODO: make speed a constant
  height auto
  width 100%

</style>