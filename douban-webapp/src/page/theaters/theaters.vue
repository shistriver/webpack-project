<template>
  <div class="theater-wrapper" ref="menu-list">
    <div @click="showDetail(item.id)" class="item-list borderBtm-1px" v-for="item in theaterList">
      <div class="item-left">
        <img :src="item.images.small" alt="">
      </div>
      <div class="item-middle">
        <h2 class="title">{{item.title}}</h2>
        <div class="star-wrapper">
          <div class="no-star" v-if="item.rating.average === 0">评价人数不足</div>
          <div v-else>
            <v-star :average="item.rating.average"></v-star>
            <span class="score">{{item.rating.average}}</span>
          </div>
        </div>
        <div class="director">导演：{{item.directors[0].name}}</div>
        <div class="casts">主演：<span v-for="(cast, index) in item.casts"><em v-if="index !== 0">/</em>{{cast.name}}</span>
        </div>
        <div class="look">{{item.collect_count}}人看过</div>
      </div>
      <div class="item-right">
        <div class="btn" @click.stop.prevent="">购票</div>
      </div>
    </div>
    <v-detail :details="detailsData" ref="detail"></v-detail>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {movieTheater, movieDetail} from '@/service/getData'
  import VStar from '@/page/star/star'
  import VDetail from '@/page/detail/detail'

  export default {
    data () {
      return {
        theaterList: [],
        detailsData: {}
      }
    },
    created () {
      /* 正在热映 */
      movieTheater().then((res) => {
        this.theaterList = res.data.subjects
        this.$nextTick(() => {
          this._initScroll()
        })
      }, (err) => {
        console.log(err)
      })
    },
    methods: {
      showDetail (id) {
        /* 清空之前的数据 */
        this.detailsData = {}
        movieDetail(id).then((res) => {
          this.detailsData = res.body
        }, (err) => {
          console.log(err)
        })
        this.$refs.detail.show()
      },
      _initScroll () {
        this.listScroll = new BScroll(this.$refs.menuList, {
          click: true
        })
      }
    },
    mounted () {
    },
    components: {
      VStar,
      VDetail
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../style/mixin.styl'
  .theater-wrapper
    .item-list
      display: flex
      padding: 10px 0;
      background: #fff;
      borderBtm-1px(rgba(7, 17, 27, 0.1))
      .item-left
        flex: 0 0 85px
        text-align: center
      .item-middle
        flex: 1
        .title
          font-size: 16px;
        .star-wrapper
          .no-star, .score
            font-size: 10px;
            color: #999;
          .no-star
            margin: 3px 0;
        .director, .casts
          font-size: 10px;
          color: #999;
          line-height: 16px;
        .casts
          span
            color: #999;
        .look
          font-size: 12px;
          margin-top: 4px;
      .item-right
        flex: 0 0 65px
        position: relative
        .btn
          display: inline-block
          position: absolute
          top: 50%
          left: 5px
          transform: translateY(-50%)
          border: 1px solid #FF4055
          border-radius: 0.25rem
          padding: 4px 8px
          font-size: 14px
          color: #FF4055
</style>
