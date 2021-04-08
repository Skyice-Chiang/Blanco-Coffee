<template>
  <div>
    <AlertMessage></AlertMessage>
    <div class="navbar navbar-expand-sm navbar-pos align-items-center px-4 navbar-state"
      :class="{ 'nav-color': isScroll }">
      <h1>
        <router-link class="navbar-brand text-white d-flex align-items-end" to="/">
          <img class="blancoLogo" src="@/assets/images/blanco-coffee.png" alt="Blanco Coffee"/>
          <span class="logo-font">Blanco Coffee</span>
        </router-link>
      </h1>
      <button class="navbar-toggler icon-color" type="button" data-toggle="collapse" data-target="#mainNavbar">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse flex-row-reverse" id="mainNavbar"
        :class="{ 'nav-close': isClose }">
        <ul class="navbar-nav align-items-md-center font-weight-bold">
          <li class="nav-item">
            <router-link class="nav-link text-white font-set line-style" to="/"
              :class="{ active: nowNav === 'home' }"
              @click.native="scrollTop();isClose = !isClose;">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white font-set line-style" to="/productlist/all"
              :class="{ active: nowNav === 'productlist' }"
              @click.native="scrollTop();isClose = !isClose;">
              Product
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white font-set line-style" to="/favor"
              :class="{ active: nowNav === 'favor' }"
              @click.native="scrollTop();isClose = !isClose;">
              Favor
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white font-set line-style cart-icon" to="/cart"
              :class="{ active: nowNav === 'cart' }"
              @click.native="scrollTop();isClose = !isClose;">
              <span class="d-block d-md-none">Cart</span>
              <i class="fas fa-shopping-cart d-none d-md-block px-2"></i>
              <div class="cart-num" v-if="num >= 1">{{ num }}</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white font-set d-block d-md-none" to="/login">
              Login
            </router-link>
            <a class="nav-link text-white font-set d-none d-md-block" href="#"
              @click.prevent="isActive = !isActive">
              <i class="fas fa-ellipsis-h"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="container-fluid bg-primary text-white py-4 px-4 d-flex flex-column align-items-center">
        <div class="contact w-100 d-flex flex-column align-items-center mb-3">
          <h6 class="mb-3">現在訂閱即可獲得最新資訊與享有折扣優惠</h6>
          <div class="input-group input-size">
            <input type="text" class="form-control"
              inputmode="email"
              placeholder="custom@gmail.com"
              aria-label="custom@gmail.com"
              aria-describedby="button-sub"
              v-model="email"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-sub" @click="follow">
                訂閱
              </button>
            </div>
          </div>
        </div>
        <ul class="social">
          <li>
            <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
          </li>
          <li>
            <a href="#" class="text-white"><i class="fab fa-line"></i></a>
          </li>
          <li>
            <a href="#" class="text-white"
              ><i class="fab fa-facebook-square"></i>
            </a>
          </li>
        </ul>
        <p class="mb-0 text-center">
          © 僅作為個人網頁練習，所有資料皆來自網路，無商業用途
        </p>
      </div>
    </div>
    <!-- Subscribe modal -->
    <div id="subscribeModal" class="modal fade">
      <div class="modal-dialog modal-pos">
        <div class="modal-content subscribe letter-spacing bg-primary">
          <div class="sub-title h5 p-3 text-white mb-0 bg-c-red">
            感謝您的訂閱
          </div>
          <div class="sub-content px-3 py-3 text-white d-flex align-items-center">
            <span class="mr-2">訂閱優惠碼 : </span>
            <span class="coupon-code" @click="copyCoupon"> followcoffee </span>
            <i class="fas fa-copy ml-2"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- detail modal -->
    <div class="info letter-spacing" :class="{ active: isActive }">
      <button class="close text-white" type="button" @click="isActive = !isActive">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="detail-info text-white">
        <div class="logo">
          <img src="@/assets/images/blanco-coffee.png" alt="Blanco Coffee"/>
          <p class="mt-2 font-weight-bold">Blanco Coffee</p>
        </div>
        <p class="text-center mt-4">如有相關問題 <br/>歡迎與我們聯絡</p>
        <p class="text-center">
          <small>
            <a class="text-white" href="tel:+886-6-33xxxxx">06-33xxxxx</a>
            <br/>
            <a class="text-white" href="mailto:blancostudio222@gmail.com">blancostudio222@gmail.com</a>
          </small>
        </p>
        <div class="admin">
          <router-link class="btn btn-outline-secondary btn-sm" to="/login" target="_blank">
            管理員登入
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  data () {
    return {
      isClose: true,
      isScroll: false,
      email: '',
      customEmail: [],
      isActive: false,
      nowNav: 'home',
      num: 0,
      carts: JSON.parse(localStorage.getItem('carts')) || []
    }
  },
  components: {
    AlertMessage
  },
  methods: {
    follow () {
      const vm = this
      // eslint-disable-next-line no-useless-escape
      const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      const orderEmail = vm.email
      const customEmail = vm.customEmail

      if (emailRule.test(orderEmail)) {
        if (customEmail.indexOf(orderEmail) === -1) {
          customEmail.push(orderEmail)
          vm.email = ''
          $('#subscribeModal').modal('show')
        } else {
          vm.$bus.$emit('message:push', '已訂閱', 'danger', 'fa-times-circle')
        }
      } else {
        vm.$bus.$emit('message:push', '請輸入正確的Email格式', 'danger', 'fa-times-circle')
      }
    },
    getCartNum () {
      const carts = this.carts
      this.num = carts.map(item => item.qty).reduce((sum, value) => (sum += value), 0)
    },
    copyCoupon () {
      const textRange = document.createRange()
      const select = window.getSelection()
      textRange.selectNode(document.querySelector('.coupon-code'))
      select.removeAllRanges()
      select.addRange(textRange)
      document.execCommand('copy')
      $('#subscribeModal').modal('hide')
      this.$bus.$emit('message:push', '已複製優惠碼', 'success', 'fa-check-circle')
    },
    scrollTop () {
      window.scroll(0, 0)
    },
    scroll () {
      const scrollPos = window.scrollY
      if (scrollPos === 0) {
        this.isScroll = false
      } else {
        this.isScroll = true
      }
    }
  },
  created () {
    const vm = this
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)blancoToken\s*\\s*([^;]*).*$)|^.*$/, '$1')
    vm.$http.defaults.headers.common.Authorization = myCookie
    vm.getCartNum()

    // 標示所在頁面
    vm.$bus.$on('navActive', (nav) => {
      vm.nowNav = nav
      if (nav === 'cart') {
        vm.num = 0
      }
    })
    // 顯示購物車數量
    vm.$bus.$on('changeNum', (num) => { vm.num = num })
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
  },
  beforeDestroy () {
    this.$bus.$off('navActive')
    this.$bus.$off('changeNum')
  }
}
</script>
