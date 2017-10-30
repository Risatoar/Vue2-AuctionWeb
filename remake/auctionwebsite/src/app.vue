<template>
  <div id="app">
  <componentA></componentA>
  <NavigationBar></NavigationBar>
  </div>
</template>

<script>
import componentA from './components/LoadingPage.vue'
import NavigationBar from './components/NavigationBar.vue'
import Vue from 'vue'
export default {
  name: 'app',
  components: {componentA,NavigationBar}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
