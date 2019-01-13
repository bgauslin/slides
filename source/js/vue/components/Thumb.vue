<template lang="pug">
  div.thumb
    router-link(
      class="thumb__link",
      :title="thumb.alt",
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
// TODO: Use SingleImage component for thumb images (TBD).
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
@import '../../../stylus/config/'

.thumb
  padding '%s %s %s %s' % (Layout.ThumbGap.BASE 0 0 Layout.ThumbGap.BASE)
  flex '0 0 %s%' % (1 / 4 * 100)

  @media Breakpoints.SMALL
    padding '%s %s %s %s' % (Layout.ThumbGap.SMALL 0 0 Layout.ThumbGap.SMALL)
    flex '0 0 %s%' % (1 / 5 * 100)

  @media Breakpoints.MEDIUM
    padding '%s %s %s %s' % (Layout.ThumbGap.MEDIUM 0 0 Layout.ThumbGap.MEDIUM)
    flex '0 0 %s%' % (1 / 6 * 100)

  @media Breakpoints.LARGE
    flex '0 0 %s%' % (1 / 7 * 100)

.thumb__link
  display block
  shadow(0)
  transition 'box-shadow %s, transform %s' % (Transitions.THUMB Transitions.THUMB)

[no-touch] .thumb__link:hover
  shadow(2)
  transform scale(1.05)

.thumb__link:active
[no-touch] .thumb__link:hover:active
  transform scale(.9)

</style>
