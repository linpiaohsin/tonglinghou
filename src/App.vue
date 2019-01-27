<template>
  <div id="app">
    <!-- <Header></Header> -->
    <router-view/>
    <!-- <Footer></Footer> -->
  </div>

</template>

<script>
import Header from '@/views/template/header.vue'
import Footer from '@/views/template/footer.vue'

export default {
  name: 'App',
  components: { Header, Footer }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: white
}
@media screen and(min-width:1024px){
  body{
    background-color: aquamarine
  }
}
</style>
