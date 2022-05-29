<template>
  <div class="login">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
    <van-field
    v-model="form.phone"
    name="phone"
    label="手机号"
    placeholder="请输入手机号"
    :rules="[
      { required: true, message: '请填写手机号' },
      { validator:pnoneText, message: '请输入正确手机号' }
      ]"
  />
  <van-field
    v-model="form.password"
    type="password"
    name="password"
    autocomplete
    label="密码"
    placeholder="密码"
    :rules="[
      { required: true, message: '请填写密码' },
      { validator:passwordText, message: '密码错误' }
      ]"
  />
  <div style="margin: 16px;">
    <van-button
    round
    block
    type="info"
    native-type="submit"
    :loading="isLoading" 
    >提交</van-button>
  </div>
  </van-form>
</div>
</template>
<script>
import { Login } from '@/services/user'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      // 登录按钮加载中状态
      isLoading: false
    }
  },
  methods: {
    passwordText (value) {
      return /\d{6}/.test(value)
    },
    pnoneText (value) {
      return /^[a-zA-Z0-9]{6,12}$/.test(value)
    },
   async onSubmit () {
     this.isLoading = true
     const { data } = await Login(this.form)
     if (data.state === 1) {
      //  将用户信息存到state中
      console.log(data.status)
      this.$store.commit('setUser', data.content)
      this.$toast.success('登录成功!')
      this.$router.push(this.$route.query.redirect || '/')
     } else {
       this.$toast.fail('登录失败')
     }
     this.isLoading = false
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="sass">

</style>
