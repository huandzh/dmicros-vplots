<template>
  <div class="frontmatter">
    <p>This app demonstrates plots in dmicros services.</p>
    <h2>Plots</h2>
    <router-link v-for="plot in plots" :to="plot" :key="plot">{{plot}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'FrontMatter',
  data () {
    return {
      plots: ['ConsumerSegment']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
