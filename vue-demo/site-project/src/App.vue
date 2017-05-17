<template>
    <div id="app">
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
                    <a class="navbar-brand hidden-sm" href="/">
                        <img src="./assets/logo.png" width="40" height="40">
                    </a>
                </div>
                <div class="navbar-collapse collapse" role="navigation">
                    <ul class="nav navbar-nav">
                        <li><a href="#">首页</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right hidden-sm">
                        <li><a href="#">登录</a></li>
                        <li><a href="#">注册</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="masthead">
            <div class="container">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <div class="footer">footer</div>

    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .navbar-brand img {
        margin-top: -10px;
    }

    a {
        cursor: pointer;
    }

    .masthead {
        padding-top: 60px;
        color: #fff;
    }

</style>
