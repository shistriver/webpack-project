<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default{
    pops: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClass() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star {
    .star-item {
      display: inline-block;
    }
    &.star-48 {
      .star-item {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          bg-image('star48-on');
        }
        &.off {
          bg-image('star48-off');
        }
        &.half {
          bg-image('star48-half');
        }
      }
    }
    &.star-36 {
      .star-item {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          bg-image('star36-on');
        }
        &.off {
          bg-image('star36-off');
        }
        &.half {
          bg-image('star36-half');
        }
      }
    }
    &.star-24 {
      .star-item {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          bg-image('star24-on');
        }
        &.off {
          bg-image('star24-off');
        }
        &.half {
          bg-image('star24-half');
        }
      }
    }
  }
</style>
