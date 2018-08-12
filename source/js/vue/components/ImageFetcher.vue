<template lang="pug">
  div.image-fetcher
    p.image-fetcher__label
      span.image-fetcher__message Fetching image...
</template>

<style lang="stylus">
@import '../../../stylus/_config/'

.image-fetcher
  align-items center
  bottom 0
  display flex
  justify-content center
  left 0
  position absolute
  right 0
  top 0
  z-index 9999

.image-fetcher__label
  background rgba(WHITE, .5)
  border-radius 2rem
  padding .75rem 1.5rem

.image-fetcher__message
  animation throb .3s infinite

</style>
