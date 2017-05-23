<template>
  <div class="cart-info">
    <div>
      <div class='item'>总数：<strong>{{cartInfos.total_nums}}</strong></div>
      <div class='item'>总价：<strong>{{cartInfos.total_price}}</strong></div>

      <div @click="clear_cart" class="item pull-right btn btn-danger">清空购物车</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      cartInfos() {
        return this.$store.getters.getInfos;
      }
    },
    methods: {
      clear_cart(){
        this.$store.dispatch('clear_local')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-info{
    font-size: 20px;
    text-align: left;

    .item{
      display: inline-block;
      margin-right: 20px;
    }
  }
</style>
