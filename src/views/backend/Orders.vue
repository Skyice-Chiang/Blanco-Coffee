<template>
  <div class="container p-0 p-md-4">
    <loading :active.sync="isLoading"></loading>
    <h3 class="text-white">訂單管理</h3>
    <div class="table-responsive">
      <table class="table table-hover mt-4 bg-white">
        <thead class="thead-dark">
          <tr>
            <th width="100">購買時間</th>
            <th width="100">Email</th>
            <th>購買款項</th>
            <th width="120">應付金額</th>
            <th width="100">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in orders" :key="i">
            <td class="align-middle">{{ item.create_at | date }}</td>
            <td class="align-middle">{{ item.user.email }}</td>
            <td class="align-middle">
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量 {{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="align-middle text-right">{{ item.total | currency }}</td>
            <td class="align-middle">
              <strong v-if="item.is_paid" class="text-success">已付款</strong>
              <span v-else class="text-mutes">未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :page="pagination" @update="getOrders" v-if="orders.length !== 0"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  data () {
    return {
      orders: [],
      isNew: false,
      pagination: {},
      isLoading: false
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.orders = res.data.orders
          vm.pagination = res.data.pagination
          vm.isLoading = false
        }
      })
    }
  },
  created () {
    this.$bus.$emit('sideNow', 'orders')
    this.getOrders()
  }
}
</script>
