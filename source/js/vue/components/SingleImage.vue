<template lang="pug">
  figure.image(
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
      loading: null, // override null while we test...
    }
  },

  mounted () {
    this.loadImages();
  },

  methods: {
    aspectRatio (image) {
      const ratio = (image.large.height / image.large.width) * 100;
      return `padding: 0 0 ${ratio}%;`;
    },

    loadImages () {
      this.loading = true;
      const self = this;
      imagesLoaded(this.$el.querySelector('.image__hi-res'), self, instance => {
        self.loading = false;
      });
    },

    placeholder (image) {
      return `background: url(${image.placeholder}) center center / cover no-repeat;`;
    },

    srcset (image) {
      return `${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`;
    },

    style (image) {
      let styles = '';
      styles += this.aspectRatio(image);
      styles += this.placeholder(image);
      return styles;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

// TODO: refactor image dimensions once grid layout is started...
.image
  overflow hidden
  position relative

.image__placeholder
.image__hi-res
  animation fadeIn .5s ease
  position absolute

.image__placeholder
  filter blur(10px)
  max-width none
  width 100%

// .image__hi-res
  // height 100%
  // max-width none
  // opacity 0 // hide the real image while we test...
  // width auto

</style>