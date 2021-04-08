<template>
  <div class="container p-0 p-md-4 responsive-set">
    <loading :active.sync="status.isLoading"></loading>
    <h3 class="text-white">優惠券管理</h3>
    <div class="text-right mt-4">
      <button class="btn btn-secondary" type="button" @click="openModal(true)">
        新增優惠券
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-hover mt-4 bg-white">
        <thead class="thead-dark">
          <tr>
            <th>名稱</th>
            <th width="80">打折百分比</th>
            <th width="120">到期日</th>
            <th width="150">是否啟用</th>
            <th width="180">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in coupons" :key="index">
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle">{{ item.percent | percent }}</td>
            <td class="align-middle">{{ item.due_date | date }}</td>
            <td class="align-middle">
              <span v-if="item.is_enabled === 0">未啟用</span>
              <span v-else class="text-success">已啟用</span>
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button class="btn btn-c-green" type="button" @click="openModal(false, item)">
                  編輯
                </button>
                <button class="btn btn-c-red" type="button" @click="deleteModal(item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :page="pagination" @update="getCoupons" v-if="coupons.length !== 0"></Pagination>
    <!--update Coupon modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="couponModalLabel">
              {{ status.label }}
            </h5>
            <button class="close text-white" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input class="form-control" id="title" type="text" placeholder="請輸入標題" v-model="tempCoupon.title"/>
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input class="form-control" id="code" type="text" placeholder="請輸入優惠碼" v-model="tempCoupon.code"/>
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input class="form-control" id="percent" type="number" placeholder="請輸入折扣" v-model="tempCoupon.percent"/>
            </div>
            <div class="form-group">
              <label for="date">到期日</label>
              <input class="form-control" id="date" type="date" placeholder="請輸入日期" v-model="date"/>
            </div>
            <input id="is_enable" type="checkbox" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0"/>
            <label for="is_enable">是否啟用</label>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" type="button" data-dismiss="modal">
              取消
            </button>
            <button class="btn btn-secondary" type="button" @click="updateCoupon">
              更新
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete Coupon modal -->
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
              <span class="font-weight-bold text-c-red">{{ tempCoupon.title }}</span>
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" data-dismiss="modal">
              取消
            </button>
            <button class="btn btn-c-red" type="button" @click="deleteCoupon">
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
import Pagination from '@/components/Pagination'

export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      status: {
        isLoading: false,
        isNew: false,
        label: ''
      },
      date: ''
    }
  },
  components: {
    Pagination
  },
  filters: {
    percent (num) {
      return `${num} %`
    }
  },
  watch: {
    date () {
      const vm = this
      const date = new Date(vm.date)
      const timestamp = Math.floor(date / 1000)
      vm.tempCoupon.due_date = timestamp
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.status.isLoading = true
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.status.isLoading = false
          vm.tempCoupon = {}
          vm.pagination = res.data.pagination
          vm.coupons = res.data.coupons
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger', 'fa-times-circle')
        }
      })
    },
    updateCoupon () {
      const vm = this
      let httpMethod = 'post'
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      vm.status.isLoading = true
      if (!vm.status.isNew) {
        httpMethod = 'put'
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((res) => {
        if (res.data.success) {
          vm.status.isLoading = false
          vm.tempCoupon = {}
          vm.getCoupons()
          $('#couponModal').modal('hide')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger', 'fa-times-circle')
        }
      })
    },
    deleteCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.status.isLoading = false
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.status.isLoading = true
          vm.tempCoupon = {}
          vm.getCoupons()
          $('#deleteModal').modal('hide')
        } else {
          vm.$bus.$emit('message:push', '刪除失敗', 'danger', 'fa-times-circle')
        }
      })
    },
    openModal (isNew, item) {
      this.status.isNew = isNew
      if (isNew) {
        this.tempCoupon = {}
        this.status.label = '新增優惠券'
      } else {
        this.tempCoupon = { ...item }
        this.status.label = '編輯優惠券'
      }
      $('#couponModal').modal('show')
    },
    deleteModal (item) {
      this.tempCoupon = { ...item }
      $('#deleteModal').modal('show')
    }
  },
  created () {
    this.$bus.$emit('sideNow', 'coupon')
    this.getCoupons()
  }
}
</script>

<style scoped lang="scss">
.responsive-set {
  height: 100vh;
}
</style>
