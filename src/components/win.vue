<template>
  <div style="display: flex; align-items: center; justify-content: center; width: 100vw; height: 100vh;">
    <img width=700 src="../assets/win.png">
    <button class="btn btn-danger" style="position: absolute; bottom: 2rem; right: 2rem;" @click.prevent="toHome">HOME</button>
  </div>
</template>

<script>
export default {
  name: 'win',
  methods: {
    toHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
