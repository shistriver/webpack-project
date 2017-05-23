<template>
  <transition name="move">
    <div v-show="showFlag" class="item-detail">
      <div class="content-wrap" ref="det">
        <div class="head">
          <div class="back" @click="hideDetail">
            <i class="icon-arrow_lift"></i>
          </div>
          <div class="text">{{head}}</div>
        </div>
        <div class="head-img">
          <img :src="details.images.large" alt="">
        </div>
        <div class="text-wrap">
          <h2 class="title">{{details.title}}</h2>
          <div class="text">
            <span>{{details.year}}</span>
            <span class="genres" v-for="genres in details.genres">/ {{genres}} </span>
          </div>
          <div class="text">原名：{{details.original_title}}</div>
          <div class="score-wrap">
            <h3 class="title">豆瓣评分</h3>
            <div class="score">{{details.rating.average}}</div>
            <v-star :average="details.rating.average"></v-star>
            <div class="people">{{details.ratings_count}}人</div>
          </div>
          <div class="summary">{{details.summary}}</div>
          <div>
            <h3>影人</h3>
          </div>
          <div>
            <h3>预告片 / 剧照</h3>
          </div>
          <div>
            <div class="hot-tab borderBtm-1px">
              <div class="tab-item">
                <router-link to="">评论</router-link>
              </div>
              <div class="tab-item">
                <router-link to="">讨论区</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import VStar from '../star/star'
  export default {
    props: {
      details: {
        type: Object
      }
    },
    data () {
      return {
        head: '电影',
        showFlag: false
      }
    },
    methods: {
      hideDetail () {
        this.showFlag = false
      },
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.det, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    mounted () {
      console.log(this.$refs)
    },
    components: {
      VStar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .item-detail
    position: fixed
    left: 0
    top: 0
    bottom: 0
    width: 100%;
    background: #fff;
    padding-top: 48px;
    transform: translate3d(0,0,0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .content-wrap
      position: relative
      .head
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: rgba(0,0,0,0.4)
        .text
          text-align: center;
          font-size: 18px;
          color: #fff;
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 5px 10px
            font-size: 20px
            color: #fff
            cursor: pointer
</style>
