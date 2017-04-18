<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-descrease" v-show="food.count > 0" @click.stop.prevent="cartDescrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('add', event.target)
      },
      cartDescrease(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol {
    font-size: 0;
    .cart-descrease{
      display: inline-block;
      transition: all 0.4s linear;
      .inner{
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translateX(24px);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-descrease .inner, .cart-add {
      display: inline-block;
      font-size: 24px;
      padding: 6px;
      color: rgb(0, 160, 220);
      vertical-align: top;
    }

    .cart-count {
      display: inline-block;
      font-size: 10px;
      width: 12px;
      color: rgb(147, 153, 159);
      line-height: 24px;
      vertical-align: top;
      padding-top: 6px;
      text-align: center;
    }
    .cart-add {

    }
  }
</style>
