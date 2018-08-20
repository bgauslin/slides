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

.image
  @media BREAKPOINT_MEDIUM
    flex 0 0 100%

// TODO: refactor with lower specificity
.images--multiple .image
  margin 1rem auto
  width 50%

  @media BREAKPOINT_MEDIUM
    flex 1 1 50%
    margin 0 .5rem 0 1rem
    width auto

// TODO: refactor with lower specificity
.images--multiple .image:last-child
  margin 0 auto

  @media BREAKPOINT_MEDIUM
    margin 0 1rem 0 .5rem

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

.image--portrait
  margin 0 auto 
  width 50%

</style>