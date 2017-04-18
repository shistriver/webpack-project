<template>
  <div>
    <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition v-for="ball in balls" :key="ball.id" name="drop" @before-enter="beforeEnter" @enter="enter"
                  @after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-1px" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span><b>￥</b>{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol @add="addFood" :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartControl/cartControl.vue'
  export default {
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      addFood(target) {
        this.drop(target)
      },
      hideList() {
        this.fold = true
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 50;
    .content {
      display: flex;
      background: #141d27;
    }
    .content-left {
      flex: 1;
      font-size: 0;
      .logo-wrapper {
        width: 56px;
        height: 56px;
        padding: 6px;
        display: inline-block;
        border-radius: 50%;
        box-sizing: border-box;
        background: #141d27;
        position: relative;
        margin: -10px 12px 0 12px;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: table;
          background: rgba(255, 255, 255, 0.1)
          text-align: center;
          &.highlight {
            background: rgb(0, 160, 220)
            .icon-shopping_cart {
              color: #fff;
            }
          }
          .icon-shopping_cart {
            font-size: 24px;
            display: table-cell;
            vertical-align: middle;
            color: rgba(255, 255, 255, 0.4)
          }
        }
        .num {
          position: absolute;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          color: #fff;
          font-size: 9px;
          border-radius: 6px;
          top: 0;
          right: -1px;
          background: rgb(240, 20, 20);
          box-show: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
        }
      }
      .price, .desc {
        color: rgba(255, 255, 255, 0.4)
        font-weight: 700;
        line-height: 24px;
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
      }
      .price {
        font-size: 16px;
        padding-right: 12px;
        margin-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.4);
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        font-size: 12px;

      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        font-size: 12px;
        font-weight: 700;
        line-height: 48px;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }

    .ball-container {
      .ball {
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner {
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -10;
      width: 100%;
      transition: all 0.5s;
      transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave-active {
        transform: translate3d(0, 0, 0)
      }
      .list-header {
        height: 40px;
        background: #f3f5f7;
        padding: 0 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 40px;
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
          line-height: 40px;
        }
      }
      .list-content {
        background: #fff;
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        .food {
          position: relative;
          padding: 12px 0;
          border-1px(rgba(7, 17, 27, 0.1))
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 10px;
            font-size: 14px;
            line-height: 24px;
            color: rgb(240, 20, 20);
            font-weight: 700;
            b {
              font-weight: 200;
              font-size: 10px;
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    background: rgba(7,17,27,0.6);
    transition: all 0.5s;
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
      background: rgba(7,17,27,0);
    }
  }
</style>
