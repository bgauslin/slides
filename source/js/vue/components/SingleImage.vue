<template lang="pug">
  figure.image(
    :style="placeholder(image)",
  )
    //- img.image__photo(
    //-   v-if="!loading",
    //-   :alt="image.alt",
    //-   :src="image.small.src",
    //-   :srcset="srcset(image)",
    //- )
</template>

<script>
import imagesLoaded from 'imagesloaded';
// import ImageFetcher from './ImageFetcher.vue';

export default {
//   components: { ImageFetcher },

  props: ['image'],

  data () {
    return {
      loading: true, // override null while we test...
    }
  },

  mounted () {
    // this.loadImages();
  },

  methods: {
    placeholder(image) {
      return `background: url(${image.placeholder}) center center / cover no-repeat`;
    },

    srcset (image) {
      return `${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`;
    },

    loadImages () {
      this.loading = true;
      const self = this;
      imagesLoaded(this.$el.querySelector('.image__photo'), self, instance => {
        self.loading = false;
      });
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

// TODO: refactor image dimensions once grid layout is started...
.image
  padding-bottom 50% // force an aspect ratio while we test...
  // height 100%

// .placeholder
//   animation fadeIn .5s ease
//   filter blur(5px)

// Invert typical responsive image properties
.image__photo
  animation fadeIn .5s ease
  height 100%
  max-width none
  opacity 0 // hide the real image while we test...
  width auto

</style>