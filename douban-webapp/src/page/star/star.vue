<template>
  <div class="star star-24">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_OFF = 'off'
  const CLS_HALF = 'half'
  export default {
    props: {
      average: {
        type: Number
      }
    },
    data () {
      return {}
    },
    computed: {
      itemClasses () {
        let result = []
        let average = Math.floor(this.average * 2) / 4
        let hasDecimal = average % 1 !== 0
        let total = Math.floor(average)
        for (let i = 0; i < total; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../style/mixin.styl'
  .star
    font-size: 0
    margin: 3px 0;
    display: inline-block
    .score
      font-size: 10px
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-24
      .star-item
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child
          margin-right: 0;
        &.on
          font-size: 12px;
          bg-image('images/star24_on')
        &.off
          font-size: 12px;
          bg-image('images/star24_off')
        &.half
          font-size: 12px;
          bg-image('images/star24_half')

</style>
