<template>
  <div>
    <v-head></v-head>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-foot-guide></v-foot-guide>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHead from '@/components/header/head'
  import VFootGuide from '@/components/footer/footGuide'
  import {movieComingSoon} from '@/service/getData'
  export default {
    data () {
      return {
        comingList: []
      }
    },
    components: {
      VHead,
      VFootGuide
    },
    mounted () {
      /* 即将上映 */
      movieComingSoon(this).then((res) => {
        this.comingList = res.data.subjects
      }, (res) => {
        console.log(res)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../style/index.styl'
</style>
