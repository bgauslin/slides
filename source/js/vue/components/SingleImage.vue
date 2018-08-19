<template lang="pug">
  figure.image(
    :style="aspectRatio(image)",
  )
    img.image__placeholder(
      v-if="loading",
      :src="image.placeholder",
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
      loading: null,
    }
  },

  mounted () {
    this.loadImages();
  },

  methods: {
    aspectRatio(image) {
      const ratio = image.large.height / image.large.width * 100;
      return `padding-bottom: ${ratio}%;`;
    },

    loadImages () {
      this.loading = true;
      const self = this;
      imagesLoaded(this.$el.querySelector('.image__hi-res'), self, instance => {
        self.loading = false;
      });
    },

    placeholder (image) {
      return `background: url(${image.placeholder}) center center / contain no-repeat;`;
    },

    srcset (image) {
      return `${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`;
    },

    style (image) {
      return `${this.aspectRatio(image)}${this.placeholder(image)}`;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

img
  height auto
  width 100%

// TODO: set different image dimensions:
// - single landscape
// - single portrait
// - multiple in a row
.image
  // height 100%
  position relative
  width 100% // NOTE: child 'img' doesn't display unless container has a width

// NOTE: responsive image sizing is inverted for the occasional portrait image
// .image:only-child .image__hi-res
//   max-height 100%
//   max-width 100%
//   width auto

.image__placeholder
  animation fadeIn .5s ease // TODO: make speed a constant
  position absolute

.image__hi-res
  animation fadeIn .5s ease // TODO: make speed a constant
  position absolute
  z-index 1

</style>