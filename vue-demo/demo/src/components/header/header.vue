<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达





        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="header-bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <star :size="48" :score="seller.score"></star>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="closeDetail"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star.vue'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      closeDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header {
    position: relative;
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.5);
    .content-wrapper {
      padding-top: 24px;
      font-size: 0;
      position: relative;
      .avatar {
        padding: 0 16px 18px 24px;
        display: inline-block
      }
      .content {
        display: inline-block
        color: #fff;
        vertical-align: top;
        .title {
          margin-top: 2px;
          .brand {
            width: 30px;
            height: 18px;
            display: inline-block;
            bg-image('brand');
            background-repeat: no-repeat;
            background-size: 30px 18px;
            vertical-align middle;
          }
          .name {
            font-size: 16px;
            font-weight: bold;
            margin-left: 6px;
            vertical-align middle;

          }
        }
        .description {
          font-size: 12px;
          margin-top: 8px;
        }
        .supports {
          font-size: 10px;
          margin-top: 10px;
          .icon {
            width: 12px;
            height: 12px;
            background-size: 12px 12px;
            display: inline-block;
            vertical-align middle;
            &.decrease {
              bg-image('decrease_1');
            }
            &.discount {
              bg-image('discount_1');
            }
            &.guarantee {
              bg-image('guarantee_1');
            }
            &.invoice {
              bg-image('invoice_1');
            }
            &.special {
              bg-image('./special_1');
            }
          }
          .text {
            vertical-align bottom;
            margin-left: 2px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 15px;
        color: #fff;
        font-size: 10px;
        padding: 0 8px 0 10px;
        height: 24px;
        line-height 24px;
        text-align: center;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.2)
        .count {
          vertical-align: middle;
        }
        .icon-keyboard_arrow_right {
          vertical-align: middle;
        }
      }
    }
    .bulletin-wrapper {
      height: 28px;
      line-height: 28px;
      padding: 0 26px 0 12px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: rgba(7, 17, 27, 0.2);
      position: relative;
      .bulletin-title {
        width: 22px;
        height: 12px;
        bg-image('bulletin');
        background-size: 22px 12px;
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
      }
      .bulletin-text {
        font-size: 10px;
        vertical-align: middle;
      }
      .icon-keyboard_arrow_right {
        font-size: 10px;
        position: absolute;
        top: 10px;
        right: 12px;
      }
    }
    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(6px);
      z-index: -1;
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      color: #fff;
      background: rgba(7, 17, 27, 0.8);
      z-index: 100;
      .detail-wrapper {
        min-height: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            font-size: 16px;
            font-weight 700;
            color: #fff;
            text-align: center;
            line-height: 16px;
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -48px auto 0 auto;
        clear: both;
        font-size: 32px;
        color: #fff;
      }
    }
  }
</style>
