<template>
  <div id="app">
    <h3>购物车（用Vuex实现）</h3>
    <v-list></v-list>
    <v-cart></v-cart>
    <cart-info></cart-info>
  </div>
</template>

<script>
  import VList from '@/components/shop/list/list'
  import VCart from '@/components/shop/cart/cart'
  import CartInfo from '@/components/shop/info/info'
  export default {
    components: {
      VCart,
      CartInfo,
      VList
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
