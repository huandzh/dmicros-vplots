<template>
  <div id="app">
    <img id="logo" src="./assets/logo.svg">
    <router-view/>
    <h2>Plots</h2>
    <router-link to="/2">To 2</router-link>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
  height: 200px;
}
</style>
