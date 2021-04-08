<template>
  <div class="bg-primary">
    <loading :active.sync="isLoading"></loading>
    <OrderProgress :step="2" :title="'Order'"></OrderProgress>
    <div class="container d-block d-lg-flex justify-content-center py-5">
      <div class="mb-5 mr-lg-4">
        <div class="border-style table-responsive">
          <table class="table table-hover table-dark table-borderless bg-transparent mb-0">
            <thead>
              <tr class="text-c-brown">
                <th>項目</th>
                <th width="80">數量</th>
                <th width="100">金額</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in products" :key="i">
                <td>{{ item.product.title }}</td>
                <td>x {{ item.qty }}</td>
                <td class="text-right">{{ item.total | currency }}</td>
              </tr>
              <tr class="border-top">
                <td colspan="2"></td>
                <td class="text-right">
                  <div :class="{ 'text-delete': isCoupon }">
                    總額 {{ total | currency }}
                  </div>
                  <div v-if="isCoupon" class="text-right text-c-green">
                    優惠價 {{ finalTotal | currency }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="input-group w-100 mt-3">
          <input class="form-control bg-transparent text-white border-secondary" type="text" placeholder="請輸入優惠碼"
            v-model="code"/>
          <div class="input-group-append">
            <div class="btn btn-outline-secondary" @click="addCoupon">
              套用優惠券
            </div>
          </div>
        </div>
        <small class="text-danger" v-if="isError">{{ couponMessage }}</small>
      </div>
      <div>
        <div class="border-style p-3">
          <ValidationObserver v-slot="{ invalid }">
            <form class="needs-validation" novalidate>
              <div class="form-row">
                <ValidationProvider class="col-md-6" name="姓名" rules="required" v-slot="{ errors }">
                  <div class="form-group">
                    <label class="text-white" for="name">姓名</label>
                    <input class="form-control bg-transparent" type="text" id="name" placeholder="請輸入姓名"
                      v-model="form.user.name"
                      :class="{ 'is-invalid': errors[0] }"/>
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider class="col-md-6" name="電話" rules="required|tel" v-slot="{ errors }">
                  <div class="form-group">
                    <label class="text-white" for="tel">電話</label>
                    <input class="form-control bg-transparent" type="number" id="tel" placeholder="請輸入電話" inputmode="tel"
                      v-model="form.user.tel"
                      :class="{ 'is-invalid': errors[0] }"/>
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <ValidationProvider name="信箱" rules="required|email" v-slot="{ errors }">
                <div class="form-group">
                  <label class="text-white" for="useremail">信箱</label>
                  <input class="form-control bg-transparent" type="text" name="email" id="useremail" placeholder="請輸入信箱" inputmode="email"
                    v-model="form.user.email"
                    :class="{ 'is-invalid': errors[0] }"/>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider name="地址" v-slot="{ errors }" rules="required">
                <div class="form-group">
                  <label class="text-white" for="address">地址</label>
                  <input class="form-control bg-transparent" type="text" id="address" placeholder="請輸入地址"
                    :class="{ 'is-invalid': errors[0] }"
                    v-model="form.user.address"/>
                  <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider name="付款" rules="required" v-slot="{ errors }">
                <div class="form-group">
                  <label class="text-white" for="pay">付款方式</label>
                  <select id="pay" class="custom-select" v-model="form.user.pay" :class="{ 'is-invalid': errors[0] }">
                    <option selected disabled value="">--選擇一種付款方式--</option>
                    <option value="Credit">Credit</option>
                    <option value="ATM">ATM</option>
                    <option value="ApplePay">ApplePay</option>
                    <option value="LinePay">LinePay</option>
                    <option value="WebATM">WebATM</option>
                  </select>
                  <span v-if="errors[0]" class="invalid-feedback">請選擇一種付款方式</span>
                </div>
              </ValidationProvider>
              <div class="form-group">
                <label class="text-white" for="message">備註</label>
                <textarea class="form-control" name="message" id="message" cols="30" rows="10" placeholder="有什麼想跟我們說"
                  v-model="form.message"></textarea>
              </div>
              <div class="text-right">
                <!-- 如果驗證未通過則 disabled 該按鈕 -->
                <button class="btn btn-secondary" type="submit" :disabled="invalid" @click.prevent="addOrder">
                  送出訂單
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderProgress from '@/components/frontend/OrderProgress.vue'

export default {
  data () {
    return {
      products: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          pay: ''
        },
        message: ''
      },
      isLoading: false,
      code: '',
      isCoupon: false,
      isError: false,
      couponMessage: '',
      finalTotal: 0
    }
  },
  components: {
    OrderProgress
  },
  computed: {
    total () {
      const allCost = this.products.map(item => item.total)
      return allCost.reduce((sum, value) => sum + value, 0)
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.data.carts
          vm.$bus.$emit('navActive', '')
          vm.$bus.$emit('changeNum', 0)
          localStorage.setItem('carts', '[]')
          vm.isLoading = false
        }
      })
    },
    addCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const code = vm.code
      vm.$http.post(api, { data: { code: code } }).then((res) => {
        if (res.data.success) {
          vm.isCoupon = true
          vm.finalTotal = Math.ceil(res.data.data.final_total)
          vm.code = ''
          vm.$bus.$emit('message:push', '成功套用優惠券', 'success', 'fa-check-circle')
          vm.isError = false
        } else {
          vm.isError = true
          vm.couponMessage = res.data.message
        }
      })
    },
    addOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      vm.$http.post(api, { data: vm.form }).then((res) => {
        if (res.data.success) {
          vm.isLoading = false
          vm.$bus.$emit('message:push', '訂單成立', 'success', 'fa-check-circle')
          vm.$router.push(`/Customercheckout/${res.data.orderId}`)
          window.scroll(0, 0)
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger', 'fa-times-circle')
        }
      })
    },
    deletList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      let cartId = []
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          cartId = res.data.data.carts.map(item => item.id)
          cartId.forEach((item) => {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`
            vm.$http.delete(api)
          })
        }
      })
    }
  },
  created () {
    this.getProducts()
  },
  beforeDestroy () {
    this.deletList()
  }
}
</script>

<style scoped lang="scss">
.text-delete {
  text-decoration: line-through;
}
input {
  color: #fff !important;
}
</style>
