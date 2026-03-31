<template>
  <div style="text-align: left;">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./Home";

export default {
  name: 'App',
  components: {Home},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body, html {
  overflow-x: hidden; /* empêche le scroll horizontal */
  width: 100vw;
  height: 100vh;
}
</style>
