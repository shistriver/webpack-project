<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{userErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{passwordError.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn" @click="login">
          <a class="button">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data () {
      return {
        username: '',
        password: '',
        errorText: ''
      }
    },
    computed: {
      userErrors () {
        /* eslint-disable no-unused-vars */
        let errorText, status
        if (!/@/g.test(this.username)) {
          status = false
          errorText = '不包含@符号'
        } else {
          status = true
          errorText = ''
        }
        if (!this.userFlag) {
          errorText = ''
          this.userFlag = true
        }
        return {
          status,
          errorText
        }
      },
      passwordError () {
        /* eslint-disable no-unused-vars */
        let errorText, status
        if (!/^\w{1,6}$/g.test(this.password)) {
          status = false
          errorText = '密码不是1-6位'
        } else {
          errorText = ''
          status = true
        }
        if (!this.passwordFlag) {
          errorText = ''
          this.passwordFlag = true
        }
        return {
          status, errorText
        }
      }
    },
    methods: {
      login () {
        if (!this.userErrors.status || !this.passwordError.status) {
          this.errorText = '部分选项未通过'
        } else {
          this.errorText = ''
          this.$http.get('api/login').then(res => {
            res = res.body
            if (res.errno === ERR_OK) {
              this.$emit('has-log', res.data)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
