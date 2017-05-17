<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[currentIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[currentIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[currentIndex].src">
        </transition>
      </a>
    </div>
    <h2></h2>
    <ul class="slide-pages">
      <li @click="goTo(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides" @click="goTo(index)" >
        <a :class="{'on': index === currentIndex}">{{index + 1}}</a>
      </li>
      <li @click="goTo(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      slides: {
        type: Array,
        default: []
      },
      invTime: {
        type: Number,
        default: 1500
      }
    },
    data () {
      return {
        currentIndex: 0,
        isShow: true
      }
    },
    computed: {
      prevIndex () {
        if (this.currentIndex === 0) {
          return this.slides.length - 1
        } else {
          return this.currentIndex - 1
        }
      },
      nextIndex () {
        let length = this.slides.length - 1
        if (this.currentIndex === length) {
          return 0
        } else {
          return this.currentIndex + 1
        }
      }
    },
    methods: {
      goTo (index) {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.currentIndex = index
        }, 10)
      },
      runInv () {
        this.timer = setInterval(() => {
          this.goTo(this.nextIndex)
        }, this.invTime)
      },
      clearInv () {
        clearInterval(this.timer)
      }
    },
    mounted () {
      this.runInv()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-trans-enter-active {
  transition: all .5s;
  }

  .slide-trans-enter {
  transform: translateX(900px);
  }

  .slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
  }

  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }

  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }

  .slide-img {
    width: 100%;
  }

  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }

  .slide-pages li .on {
    text-decoration: underline;
  }
</style>
