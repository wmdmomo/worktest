<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>

import Login from '@/components/login'
export default {
  name: 'App',
  components: {Login}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:20%;
  margin: 0 auto;
  padding-top: 5%;
}
</style>
