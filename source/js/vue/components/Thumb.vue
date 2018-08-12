<template lang="pug">
  div.preview
    router-link(
      class="preview__link",
      :title="preview.title",
      :to="{ name: 'slide', params: { id: preview.id } }",
    )
      //- TODO: update API with 'title' for each preview image
      figure.preview__figure
        img(
          class="preview__image",
          :alt="preview.title",
          :height="preview.thumb.height",
          :src="preview.thumb.src",
          :width="preview.thumb.width",
        )
</template>

<script>
export default {
  props: [
    'index',
    'preview',
  ],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.preview
  padding 1rem 0 0 1rem
  flex 0 0 50%

  @media BREAKPOINT_MEDIUM
    flex 0 0 33.3333%

  @media BREAKPOINT_LARGE
    flex 0 0 25%

.preview__link
  display block

</style>
