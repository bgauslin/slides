<template lang="pug">
  div(
    :class="['image', 'image--' + orientation(image), className]",
  )
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

export default {
  props: [
    'className',
    'image',
  ],

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

    orientation (image) {
      return (image.large.height > image.large.width) ? 'portrait' : 'landscape';
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

// TODO: make image height fluid at large breakpoint
// .image
//   @media BREAKPOINT_LARGE
//     max-height 100%

// /shotgun/walk-in-closet
.image--portrait
  width 50%
  margin 0 auto

.image__frame
  overflow hidden
  position relative

.image__placeholder
.image__hi-res
  position absolute

.image__placeholder
  filter blur(5px)
  z-index -1

.image__hi-res
  animation fadeIn IMAGE_TRANSITION

// /shotgun/bedroom-to-laundry
.image--multiple
  padding IMAGE_GAP 0 0 0

.image--multiple:first-child
  padding 0

.image--multiple
.image--multiple:first-child
  @media BREAKPOINT_MEDIUM
    flex 0 0 50%
    padding IMAGE_GAP_MEDIUM 0 0 IMAGE_GAP_MEDIUM

</style>