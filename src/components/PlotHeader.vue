<template>
  <div class="plot-header">
    <router-link to="/">&lt;&lt;&lt; Back Home</router-link>
  <h2>{{ desc }}</h2>
  </div>
</template>

<script>
export default {
  name: 'PlotHeader',
  props: ['desc']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
