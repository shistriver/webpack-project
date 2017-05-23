<template>
  <div id="app">
    <h2>购物车</h2>
    <product-list></product-list>
    <v-info></v-info>
    <v-cart></v-cart>
  </div>
</template>

<script>
  import productList from '@/components/shop/list/list'
  import VInfo from '@/components/shop/info/info'
  import VCart from '@/components/shop/cart/cart'
  export default {
    components: {
      productList,
      VInfo,
      VCart
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
