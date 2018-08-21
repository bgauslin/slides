<template lang="pug">
  div.thumb
    router-link(
      class="thumb__link",
      :title="thumb.title",
      :to="{ name: 'slide', params: { slug: slug, count: count } }",
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
  padding 1rem 0 0 1rem
  flex 0 0 50%

  @media BREAKPOINT_MEDIUM
    flex 0 0 33.3333%

  @media BREAKPOINT_LARGE
    flex 0 0 25%

.thumb__link
  display block

</style>
