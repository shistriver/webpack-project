<template>
  <transition name="fade">
    <div class="food" v-show="foodFlag" ref="foodEl">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back">
            <i class="icon-arrow_lift" @click="hide"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now"><b>￥</b>{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType"
                        :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,
                  'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              <p>暂无评价</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from '../cartControl/cartControl.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/date'
  /* eslint-disable no-unused-vars */
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    data() {
      return {
        foodFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          negative: '吐槽',
          positive: '推荐'
        }
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show() {
        this.foodFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodEl, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.foodFlag = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      },
      addFood(target) {
        this.$emit('add', target)
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      selectRating(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    transition: all 0.4s;
    transform: translate3d(0, 0, 0);
    &.fade-enter, &.fade-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    .food-content {
      .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift {
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
          }
        }
      }
      .content {
        position: relative;
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
          line-height: 14px;
        }
        .detail {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          margin: 8px 0 18px 0;
        }
        .price {
          font-weight: 700;
          .now {
            color: rgb(240, 20, 20);
            font-size: 14px;
            b {
              font-size: 10px;
            }
          }
          .old {
            font-size: 10px;
            color: rgb(147, 153, 159);
            text-decoration: line-through;
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .buy {
          position: absolute;
          right: 18px;
          bottom: 18px;
          height: 24px;
          line-height: 24px;
          font-size: 10px;
          color: #fff;
          padding: 0 12px;
          text-align: center;
          border-radius: 16px;
          background: rgb(0, 160, 220);
          tansition: all 0.2s;
          &.fade-enter, &.fade-leave-active {
            opacity: 0;
          }
        }
      }

      .info {
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27)
          line-height: 14px;
          margin-bottom: 6px;
        }
        .text {
          font-size: 12px;
          color: rgb(77, 85, 93);
          line-height: 24px;
          padding: 0 8px;
        }
      }
      .rating {
        padding-top: 18px;
        .title {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27)
          line-height: 14px;
          margin-left: 18px;
        }
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          border-1px(rgba(7, 17, 27, 0.1));
          padding: 16px 0;
          .user {
            position: absolute;
            top: 16px;
            right: 0;
            font-size: 0;
            .name {
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 16px;
              margin-right: 6px;
              vertical-align: top;
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            font-size: 10px;
            color: rgb(147, 153, 159);
            margin-bottom: 12px;
          }
          .text {
            color: rgb(7, 17, 27)
            .icon-thumb_up {
              font-size: 12px;
              color: rgb(0, 160, 220)
              margin-right: 4px;
            }
            .icon-thumb_down {
              font-size: 12px;
              color: rgb(147, 153, 159);
              margin-right: 4px;
            }
          }
        }
        .no-rating{
          padding: 16px 0;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
</style>
