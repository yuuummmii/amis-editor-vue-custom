<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

#app {
  display: flex;
  height: 100vh;
  width: 100vw;
}
</style>
