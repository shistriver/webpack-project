<template>
  <div class="hot-movie">
    <div class="hot-tab borderBtm-1px">
      <div class="tab-item">
        <router-link to="/hot/theater">正在热映</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/hot/coming">即将上映</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    created () {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../style/mixin.styl'
  .hot-tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    background: #fff
    borderBtm-1px(rgba(7, 17, 27, 0.2))
    &.borderBtm-1px
      &.active
        border-bottom: 1px solid #333
    .tab-item
      flex: 1
      text-align: center
      cursor: pointer
      & > a
        display: block
        font-size: 14px
        color: #999
        &.active
          color: #333
          borderBtm-1px(rgba(7, 17, 27, 0.4))
</style>
