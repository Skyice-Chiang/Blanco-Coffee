<template>
  <div>
    <div class="bg-color">
      <AlertMessage></AlertMessage>
      <loading :active.sync="isLoading"></loading>
      <form class="login" @submit.prevent="logIn">
        <div class="h3 text-light text-center mb-4 text-spacing">
          管理員登入
        </div>
        <div class="form-group input-icon">
          <div class="icon text-white"><i class="fas fa-user"></i></div>
          <input class="form-control input-style" type="email" inputmode="email" placeholder="Email"
          v-model="user.username"/>
        </div>
        <div class="form-group input-icon">
          <div class="icon text-white"><i class="fas fa-key"></i></div>
          <input class="form-control input-style" type="password" placeholder="Password"
            v-model="user.password"/>
        </div>
        <div class="checkbox mb-4">
          <input type="checkbox" id="remember" />
          <label for="remember" class="text-white">記住帳號與密碼</label>
        </div>
        <button class="btn btn-secondary btn-block btn-style font-weight-bold" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  components: {
    AlertMessage
  },
  methods: {
    logIn () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.isLoading = true
      vm.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `blancoToken=${token}; expires=${new Date(expired)};`
          vm.isLoading = false
          vm.$router.push('/admin')
        } else {
          vm.$bus.$emit('message:push', '登入失敗，請輸入正確的帳密', 'danger', 'fa-times-circle')
          vm.user.password = ''
          vm.isLoading = false
        }
      })
    }
  }
}
</script>
