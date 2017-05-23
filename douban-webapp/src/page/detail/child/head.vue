<template>
  <div class="head">
    <div class="back">
      <i class="icon-arrow_lift"></i>
    </div>
    <div class="text">{{head}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      head: {
        type: String,
        default: '电影'
      }
    },
    data () {
      return {}
    },
    created () {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .head
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: rgba(0,0,0,0.4)
    .text
      text-align: center;
      font-size: 18px;
      color: #fff;
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_lift
        display: block
        padding: 5px 10px
        font-size: 20px
        color: #fff
        cursor: pointer
</style>
