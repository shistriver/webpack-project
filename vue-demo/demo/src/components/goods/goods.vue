<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, $index) in goods" class="menu-item"
              :class="{'current':currentIndex === $index}" @click="selectMenu($index, $event)">
            <div class="text border-1px">
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
              {{item.name}}




            </div>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food, $event)" class="food-item border-1px" v-for="food in item.foods">
                <div class="img-box">
                  <img :src="food.icon" width="57" height="57" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="count"><b>￥</b>{{food.price}}</span>
                    <span class="discount" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontral-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"></shopCart>
    </div>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import ShopCart from '../shopCart/shopCart.vue'
  import cartcontrol from '../cartControl/cartControl.vue'
  import food from '../food/food.vue'
  const ERR_OK = 0
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.$http.get('/api/goods').then(response => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      addFood(target) {
        this._drop(target)
      },
      _drop(target) {
        /* 体验优化 异步执行下落动画 */
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      }
    },
    components: {
      'shopCart': ShopCart,
      cartcontrol,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        width: 56px;
        height: 54px;
        padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          font-weight: 700;
          z-index: 1;
          background: #fff;
          .text {
            border-none();
          }
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          line-height: 14px;
          color: rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
        }
        .icon {
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          display: inline-block;
          vertical-align middle;
          &.decrease {
            bg-image('decrease_3');
          }
          &.discount {
            bg-image('discount_3');
          }
          &.guarantee {
            bg-image('guarantee_3');
          }
          &.invoice {
            bg-image('invoice_3');
          }
          &.special {
            bg-image('./special_3');
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
        padding-left: 17px;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child {
          border-none();
          margin-bottom: 0;
        }
        .img-box {
          flex: 0 0 57px;
        }
        .content {
          flex: 1;
          padding-left: 10px;
          .name {
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            margin-top: 2px;
          }
          .desc, .extra {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            margin: 8px 0;
          }
          .extra {
            margin-bottom: 4px;
          }
          .price {
            font-weight: 700;
            .count {
              color: rgb(240, 20, 20);
              font-size: 14px;
              b {
                font-size: 10px;
              }
            }
            .discount {
              font-size: 10px;
              color: rgb(147, 153, 159);
              text-decoration: line-through;
            }
          }
          .cartcontral-wrapper {
            position: absolute;
            right: 0;
            bottom: 10px;
          }
        }
      }
    }
  }
</style>
