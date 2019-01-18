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
export default {
  props: [
    'index',
    'thumb',
    'slideshow',
    'slug',
  ],

  computed: {
    /** @return {number} */
    count() {
      return this.index + 1;
    }
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.thumb__link
  display block
  shadow(0)
  transition 'box-shadow %s, transform %s' % (Transition.THUMB Transition.THUMB)

[no-touch] .thumb__link:hover
  shadow(2)
  transform scale(1.05)

.thumb__link:active
[no-touch] .thumb__link:hover:active
  transform scale(.9)

</style>
