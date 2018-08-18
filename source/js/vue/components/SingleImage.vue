<template lang="pug">
  figure.image
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

    srcset (image) {
      return `${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.image
  flex 1 0
  position relative

.image__placeholder
.image__hi-res
  animation fadeIn .5s ease
  position absolute

.image__placeholder
  filter blur(10px)

</style>