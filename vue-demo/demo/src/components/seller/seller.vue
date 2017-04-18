<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
          </div>
          <span class="rating-count">({{seller.ratingCount}})</span>
          <span class="seller-count">月销售{{seller.sellCount}}单</span>
        </div>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="price">{{seller.minPrice}}</span>元




          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="price">{{seller.deliveryPrice}}</span>元




          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="price">{{seller.deliveryTime}}</span>元




          </div>
        </li>
      </ul>
      <split></split>
      <div class="bulletin">
        <h2>公告与活动</h2>
        <div class="detail">{{seller.bulletin}}</div>
        <ul class="supports">
          <li v-for="item in seller.supports" class="supports-list border-1px">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="pic in seller.pics" class="pic-item">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  export default{
    data() {
      return {
        favorite: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll()
          this._initPics()
        })
      }
    },
    methods: {
      toggleFavorite() {
        this.favorite = !this.favorite
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    components: {
      star,
      split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .seller {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .seller-content {
      .overview {
        position: relative;
        .title {
          padding: 18px 18px 8px 18px;
          font-size: 14px;
          color: rgb(7, 17, 27)
        }
        .desc {
          margin: 0px 18px;
          padding-bottom: 18px;
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0;
          .star-wrapper {
            display: inline-block;
          }
          .rating-count, .seller-count {
            font-size: 10px;
            color: rgb(77, 85, 93);
            vertical-align: top;
            margin-top: 2px;
            display: inline-block;
          }
          .rating-count {
            margin-left: 8px;
          }
          .seller-count {
            margin-left: 12px;
          }
        }
        .favorite {
          position: absolute;
          top: 12px;
          right: 18px;
          width: 40px;
          color: rgb(77, 85, 93);
          text-align: center;
          .icon-favorite {
            display: block;
            font-size: 24px;
            &.active {
              color: rgb(240, 20, 20)
            }
          }
          .text {
            font-size: 10px;
          }
        }
      }
      .remark {
        display: flex;
        padding: 18px 0;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child {
            border-right: none;
          }
          h2 {
            font-size: 10px;
            color: rgb(147, 153, 159)
            margin-bottom: 4px;
          }
          .content {
            font-size: 10px;
            color: rgb(7, 17, 27)
            .price {
              font-size: 24px;
            }
          }
        }

      }
      .bulletin {
        h2 {
          padding: 18px 18px 8px 18px;
          font-size: 14px;
          color: rgb(7, 17, 27)
        }
        .detail {
          padding: 0px 18px 16px 18px;
          font-size: 12px;
          color: rgb(240, 20, 20);
          line-height: 24px;
          border-1px(rgba(7, 17, 27, 0.1))
        }
        .supports {
          padding: 0px 18px;
          .supports-list {
            padding: 16px;
            border-1px(rgba(7, 17, 27, 0.1))
            .icon {
              width: 16px;
              height: 16px;
              background-size: 16px 16px
              background-repeat: no-repeat;
              display: inline-block;
              vertical-align: top
              &.decrease {
                bg-image('decrease_4')
              }
              &.discount {
                bg-image('discount_4')
              }
              &.guarantee {
                bg-image('guarantee_4')
              }
              &.invoice {
                bg-image('invoice_4')
              }
              &.special {
                bg-image('special_4')
              }
            }
            .text {
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 16px;
            }
          }
        }
      }
      .pics {
        padding: 18px;
        .title {
          font-size: 14px;
          color: rgb(7, 17, 27)
          margin-bottom: 12px;
        }
        .pic-wrapper {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          .pic-list {
            font-size: 0;
            .pic-item {
              display: inline-block;
              width: 120px;
              height: 90px;
              margin-right: 6px;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
      .info{
        padding: 18px 18px 0px 18px;
        .title{
          font-size: 14px;
          color: rgb(7, 17, 27);
          padding-bottom: 6px;
          border-1px(rgba(7, 17, 27,0.1))
        }
        .info-item{
          padding: 16px 12px;
          border-1px(rgba(7, 17, 27,0.1))
          font-size: 12px;
          color: rgb(7,17,27);
          line-height: 16px;
        }
      }
    }
  }
</style>
