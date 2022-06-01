<template>
  <div id="app" >
    <img alt="Vue logo" src="./assets/logo.png">
    <CatalogPage />
    <CartPage />

  </div>
</template>

<script>
import CatalogPage from './components/Catalog/CatalogPage.vue'
import CartPage from '@/components/Cart/CartPage.vue'

export default {
  name: 'App',
  components: {
    CatalogPage,
    CartPage,
  },
  setup() {

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
