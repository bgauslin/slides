<template lang="pug">
  div.error-404
    p.error-404__message {{ errorMessage }}
</template>

<script>
export default {
  data() {
    return {
      errorMessage: '404',
      summary: 'That page cannot be found. :(',
      title: 'Uh oh!',
    }
  },
}
</script>
