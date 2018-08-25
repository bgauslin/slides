<template lang="pug">
  div.thumb
    router-link(
      class="thumb__link",
      :title="thumb.title",
      :to="{ name: 'slide', params: { slideshow: slideshow, slug: slug } }",
    )
      figure.thumb__frame
        img.thumb__image(
          :alt="thumb.alt",
          :height="thumb.height",
          :src="thumb.src",
          :width="thumb.width",
        )
</template>

<script>
export default {
  props: [
    'index',
    'thumb',
    'slideshow',
    'slug',
  ],

  computed: {
    count () {
      return this.index + 1;
    }
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.thumb
  padding THUMB_GAP 0 0 THUMB_GAP
  flex '0 0 %s%' % (1 / 3 * 100)

  @media BREAKPOINT_SMALL
    padding THUMB_GAP_SMALL 0 0 THUMB_GAP_SMALL
    flex '0 0 %s%' % (1 / 4 * 100)

  @media BREAKPOINT_MEDIUM
    padding THUMB_GAP_MEDIUM 0 0 THUMB_GAP_MEDIUM
    flex '0 0 %s%' % (1 / 6 * 100)

  @media BREAKPOINT_LARGE
    flex '0 0 %s%' % (1 / 8 * 100)

.thumb__link
  display block

</style>
