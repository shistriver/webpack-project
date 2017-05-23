<template>
  <div>coming soon</div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    data () {
      return {}
    },
    mounted () {
      console.log(this.$store.dispatch('getMovieData'))
    },
    computed: {
      ...mapState([
        'infoList'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
