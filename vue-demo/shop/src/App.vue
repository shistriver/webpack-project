<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  .tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    //border-bottom: 1px solid rgba(7,17,27,0.1);
    border-1px(rgba(7,17,27,0.1))
    .tab-item {
      flex: 1;
      text-align: center;
      a{
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
      }
      .active{
        color: rgb(240,20,20);
      }
    }
  }
</style>
