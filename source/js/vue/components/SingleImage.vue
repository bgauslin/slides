<template lang="pug">
  div(
    :class="['image', 'image--' + orientation(image)]",
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

IMAGE_TRANSITION = fadeIn .3s ease-out

// TODO: refactor quantity query selectors and
// use classes with equal specificity instead
.image:only-child
  @media BREAKPOINT_MEDIUM
    flex 0 0 100%

.image:nth-last-child(2)
  margin 1rem auto
  width 50%

  @media BREAKPOINT_MEDIUM
    flex 1 1 50%
    margin 0 .5rem 0 1rem
    width auto

.image:nth-last-child(2) ~ .image
  margin 0 auto
  width 50%

  @media BREAKPOINT_MEDIUM
    flex 1 1 50%
    margin 0 1rem 0 .5rem
    width auto

.image--portrait:only-child
  margin 0 auto 
  flex 0 0 50%
  width 50%

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
  animation IMAGE_TRANSITION

</style>