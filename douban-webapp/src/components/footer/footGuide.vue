<template>
  <div class="foot-tab">
    <div class="tab-list borderTop-1px">
      <div class="tab-item">
        <router-link to="/hot/theater">热映</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/find">找片</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/user">我的</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../style/mixin.styl'
  .foot-tab
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%
    height: 40px
    line-height: 40px
    background: #fff
    .tab-list
      display: flex
      borderTop-1px(rgba(7, 17, 27, 0.2))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
