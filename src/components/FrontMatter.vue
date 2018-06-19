<template>
  <div class="frontmatter">
    <h1>{{ msg }}</h1>
    <h2>Introduction</h2>
    <p>This app demonstrates plots in dmicros services.</p>
  </div>
</template>

<script>
export default {
  name: 'FrontMatter',
  data () {
    return {
      msg: 'Welcome dmicros-vplots App.'
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
