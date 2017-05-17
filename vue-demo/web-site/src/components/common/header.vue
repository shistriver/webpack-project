<template>
  <div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button class="navbar-toggle collapsed" type="button" data-toggle="collapse"
                data-target=".navbar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand hidden-sm logo" href="/">
          <img src="../../assets/logo.png" width="40" height="40">
        </a>
      </div>
      <div class="navbar-collapse collapse" role="navigation">
        <ul class="nav navbar-nav">
          <li><a href="#">首页</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right hidden-sm">
          <li><a href="#">{{username}}</a></li>
          <li v-if="username !== ''" @click="quit"><a href="#">退出</a></li>
          <li v-if="username === ''" @click="showDialog('isShowLogin')"><a href="javascript:;">登录</a></li>
          <li v-if="username === ''"><a href="javascript:;">注册</a></li>
          <li  @click="showDialog('isShowAbout')"><a href="javascript:;">关于</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      username: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isShowAbout: false,
        isShowLogin: false
      }
    },
    methods: {
      showDialog (params) {
        this[params] = true
        this.$emit('show-login', params, this[params])
        // console.log(this.userName)
      },
      quit () {
        this.username = ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
