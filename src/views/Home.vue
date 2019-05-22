<template>
  <div class="home">
    <h1>Sliding puzzle game</h1>
    <p>4x4 puzzle game built with Vue</p>
    <router-link type="button" class="nes-btn is-primary" to="/game"
      >Start game</router-link
    >
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
