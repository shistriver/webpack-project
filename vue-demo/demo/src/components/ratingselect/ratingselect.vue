<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block all" @click="select(2,$event)" :class="{'active':selectType===2}">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">
        {{desc.positive}}<span class="count">{{positive.length}}</span>
      </span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">
        {{desc.negative}}<span class="count">{{negative.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            negative: '满意',
            positive: '不满意'
          }
        }
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('select', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('toggle')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .rating-type {
    padding: 18px 0;
    margin-left: 18px;
    border-1px(rgba(7, 17, 27, 0.1));
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      margin-right: 8px;
      .count {
        font-size: 8px;
        margin-left: 2px;
      }
      &.all, &.positive {
        background: rgba(0, 160, 220, 0.2);
        &.active {
          background: rgb(0, 160, 220);
          color: #fff;
        }
      }
      &.negative {
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background: rgb(77, 85, 93);
          color: #fff;
        }
      }
    }
  }

  .switch {
    padding: 12px 0;
    font-size: 0;
    color: rgb(147, 153, 159);
    border-bottom: 1px solid rgba(7, 17, 27, 0.2)
    .icon-check_circle {
      display: inline-block;
      font-size: 24px;
      margin-left: 18px;
    }
    .text {
      font-size: 12px;
      line-height: 24px;
      margin-left: 4px;
      vertical-align: top;
    }
    &.on{
      .icon-check_circle{
        color: rgb(0, 160, 220)
      }
    }
  }
</style>
