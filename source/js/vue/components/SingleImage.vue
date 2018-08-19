<template lang="pug">
  div.image
    figure.image__frame(
      :style="aspectRatio(image)",
    )
      img.image__placeholder(
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
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

IMAGE_TRANSITION = fadeIn .5s ease 

img
  height auto
  // height 100%
  // max-height 100%
  // max-width 100%
  width 100%
  // width auto

.image:only-child
  flex 0 0 100%

.image:nth-last-child(2)
.image:nth-last-child(2) ~ .image
  flex 0 0 50%

// TODO: set different image dimensions:
// - single landscape
// - single portrait
// - multiple in a row
.image__frame
  position relative

.image__placeholder
  animation IMAGE_TRANSITION
  position absolute

.image__hi-res
  animation IMAGE_TRANSITION
  position absolute
  z-index 1

</style>