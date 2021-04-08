<template>
  <div class="bg-primary">
    <loading :active.sync="isLoading"></loading>
    <OrderProgress :step="3" :title="'Payment'"></OrderProgress>
    <div class="container">
      <div class="row py-5 justify-content-center mx-2 mx-md-0">
        <form class="col-md-9 border-style p-4" @submit.prevent="payOrder">
          <div class="h5 text-secondary mb-3">
            <i class="fas fa-clipboard-list mr-2"></i>訂單明細
          </div>
          <div class="table-responsive">
            <table class="table mb-3 bg-transparent text-white">
              <thead>
                <tr>
                  <th>項目</th>
                  <th>數量</th>
                  <th>金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">x {{ item.qty }}</td>
                  <td class="align-middle text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right font-weight-bold">總計</td>
                  <td class="text-right font-weight-bold">
                    {{ order.total | currency }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="h5 text-secondary mb-3">
            <i class="fas fa-pen mr-2"></i>收件人資訊
          </div>
          <div class="table-responsive">
            <table class="table bg-transparent text-white mb-0">
              <tbody>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人信箱</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款方式</th>
                  <td>{{ order.user.pay }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="order.is_paid" class="text-success">已付款</span>
                    <span v-else class="text-danger">尚未付款</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-right mt-4" v-if="order.is_paid === false">
            <button class="btn btn-secondary" type="submit">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 付款成功modal -->
    <div id="checkmodal" class="modal fade">
      <div class="modal-dialog check-pos">
        <div class="modal-content check-space d-flex flex-column align-items-center">
          <CheckState :state="'success'"></CheckState>
          <div class="m-3 text-success font-weight-bold">{{ payState }}</div>
          <router-link :to="{ name: 'Index' }" class="btn btn-primary" data-dismiss="modal" @click.native="scrollTop">回首頁再逛逛吧</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import OrderProgress from '@/components/frontend/OrderProgress.vue'
import CheckState from '@/components/frontend/CheckState.vue'

export default {
  data () {
    return {
      order: {
        user: {},
        total: 0
      },
      orderId: '',
      isLoading: false,
      payState: ''
    }
  },
  components: {
    OrderProgress,
    CheckState
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.order = res.data.order
          vm.isLoading = false
        }
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.payState = res.data.message
          $('#checkmodal').modal('show')
          vm.getOrder()
        }
      })
    },
    scrollTop () {
      window.scroll(0, 0)
    }
  },
  created () {
    this.orderId = this.$route.params.id
    this.getOrder()
  }
}
</script>

<style scoped lang="scss">
.check-pos {
  top: 50%;
  transform: translateY(-50%) !important;
  z-index: 2;
}
.check-space {
  margin: 0 auto;
  width: 300px;
  background-color: #fff;
  padding: 50px;
}
</style>
