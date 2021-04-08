<template>
  <div class="bg-primary">
    <loading :active.sync="isLoading"></loading>
    <OrderProgress :step="1" :title="'Cart'"></OrderProgress>
    <div class="container py-4 cart-set">
      <div class="h3 letter-spacing text-white text-center my-4">- 購物清單確認 -</div>
      <div class="border-style mt-5 table-responsive">
        <table class="table table-hover table-dark table-borderless bg-transparent mb-0">
          <thead>
            <tr class="text-c-brown">
              <th width="200">項目</th>
              <th width="100">數量</th>
              <th width="100">金額</th>
              <th width="20">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in carts" :key="i">
              <td class="align-middle text-wrap">{{ item.title }}</td>
              <td class="align-middle">
                <div class="input-group flex-nowrap d-none d-md-flex" style="width: 160px">
                  <div class="input-group-prepend">
                    <button class="btn btn-secondary" type="button" @click="item.qty -= 1" :disabled="item.qty <= 1">
                      -
                    </button>
                  </div>
                  <input class="form-control text-center border-0" type="text" disabled
                    v-model="item.qty"/>
                  <div class="input-group-append">
                    <button class="btn btn-secondary" type="button" @click="item.qty += 1" :disabled="item.qty >= 10">
                      +
                    </button>
                  </div>
                </div>
                <span class="d-block d-md-none"> x {{ item.qty }}</span>
              </td>
              <td class="align-middle text-right">
                {{ (item.price * item.qty) | currency }}
              </td>
              <td class="align-middle">
                <button class="btn btn-c-red" type="button" @click="openDelete(item)">
                  刪除
                </button>
              </td>
            </tr>
            <tr class="border-top">
              <td colspan="3"></td>
              <td>小計 {{ total | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-end my-4">
        <router-link class="btn btn-outline-secondary mr-2" to="/productlist/all">
          ← 繼續購物
        </router-link>
        <button class="btn btn-outline-c-green" type="button" @click="comfirmList" :disabled="carts.length === 0">
          → 確認送出
        </button>
      </div>
    </div>

    <!-- delet product modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h5 class="modal-title font-weight-bold" id="deleteTile">
              刪除產品
            </h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              確定要刪除
              <span class="font-weight-bold text-c-red">
                {{ cartTemp.title }}
              </span>
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" data-dismiss="modal">
              取消
            </button>
            <button class="btn btn-c-red" type="button" @click="deleteProduct">
              確定刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import OrderProgress from '@/components/frontend/OrderProgress.vue'

export default {
  data () {
    return {
      carts: JSON.parse(localStorage.getItem('carts')) || [],
      cartTemp: {
        product: ''
      },
      isLoading: false
    }
  },
  components: {
    OrderProgress
  },
  computed: {
    total () {
      let newTotal = 0
      if (this.carts.length !== 0) {
        const allCost = this.carts.map(item => Number(item.price) * Number(item.qty))
        newTotal = allCost.reduce((sum, value) => sum + value, 0)
      } else if (this.carts.length === 0) {
        newTotal = 0
      }
      return newTotal
    }
  },
  methods: {
    openDelete (item) {
      this.cartTemp = item
      $('#deleteModal').modal('show')
    },
    deleteProduct () {
      const carts = this.carts
      const allID = carts.map((item) => item.id)
      const itemID = this.cartTemp.id
      carts.splice(allID.indexOf(itemID), 1)
      localStorage.setItem('carts', JSON.stringify(carts))
      $('#deleteModal').modal('hide')
      this.$bus.$emit('message:push', '成功刪除產品', 'success', 'fa-check-circle')
    },
    comfirmList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      const cartData = vm.carts.map((item) => { return { data: { product_id: item.id, qty: item.qty } } })
      // 加入後端購物車清單
      cartData.forEach(item => vm.$http.post(api, item))

      // 跳轉結帳頁面到資料填寫畫面
      setTimeout(() => {
        vm.$router.push('/customerorders')
        window.scroll(0, 0)
      }, 1000)
    }
  },
  created () {
    const vm = this
    vm.$bus.$emit('navActive', 'cart')
    vm.isLoading = true
    setTimeout(() => { vm.isLoading = false }, 500)
  },
  beforeDestroy () {
    const vm = this
    const num = vm.carts.map((item) => item.qty).reduce((sum, value) => (sum += value), 0)
    // 當不是進入下一步填寫資料時，恢復顯示購物車數量
    if (vm.$route.name !== 'customerOrders') {
      vm.$bus.$emit('changeNum', num)
      localStorage.setItem('carts', JSON.stringify(vm.carts))
    }
  }
}
</script>
