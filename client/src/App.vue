<template>
  <h1>Sybill</h1>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <PartsToolkit></PartsToolkit>
  <PaperLayout></PaperLayout>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import PartsToolkit from './components/PartsToolkit.vue'
import PaperLayout from './components/PaperLayout.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    PartsToolkit,
    PaperLayout
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
