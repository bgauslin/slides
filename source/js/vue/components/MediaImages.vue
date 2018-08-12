<template lang="pug">
  div.images
    figure.image(
      v-for="image in images",
    )
      img(
        :alt="alt(image)",
        :src="src(image)",
        :srcset="srcset(image)",
      )
</template>

<script>
import imagesLoaded from 'imagesloaded';
import ImageFetcher from './ImageFetcher.vue';

export default {
  components: { ImageFetcher },

  props: ['images'],

  data () {
    return {
      loading: false,
    }
  },

  mounted () {
    this.loadImages();
  },

  methods: {
    alt (image) {
      return image.alt;
    },

    src (image) {
      return image.small.src;
    },

    srcset (image) {
      return `${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`;
    },

    loadImages () {
      this.loading = true;
      imagesLoaded(this.$el.querySelectorAll('.media__image'), this, instance => {
        this.loading = false;
      });
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

// TODO: refactor image dimensions once grid layout is started...
.images
  align-items center
  display flex
  height 100%
  justify-content center

.image
  height 100%

// Invert typical responsive image properties
.image img
  height 100%
  max-width none
  width auto

.placeholder
  animation fadeIn .5s ease
  filter blur(5px)

.hi-res
  animation fadeIn .5s ease

</style>
