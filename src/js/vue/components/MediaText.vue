<template lang="pug">
  div.text
    div.text__content(
      v-html="text",
    )
</template>

<script>
export default {
  props: {
    text: String,
  }
}
</script>
