<template>
  <div :class="{ 'favor-set': favorId.length === 0 }">
    <loading :active.sync="isLoading"></loading>
    <div class="favor-banner"></div>
    <div class="container-fluid pb-4" :class="{ 'favor-bg-color': favorId.length !== 0 }">
      <div class="text-center letter-spacing" v-if="favorId.length === 0">
        <div class="h5 text-white pt-5 mb-4">
          目前還沒有關注的項目，趕緊來去挑選吧!
        </div>
        <router-link class="btn btn-outline-secondary" to="/productlist/all">
          → 前往商品區
        </router-link>
      </div>
      <div class="favor-content row">
        <ProductCard class="col-md-6 col-lg-4 col-xl-3"
          :favor="favorId"
          :cart="carts"
          :product="item"
          v-for="(item, i) in favorProduct"
          :key="i">
        </ProductCard>
      </div>
      <div
        class="d-flex justify-content-center mt-4"
        v-if="favorId.length !== 0">
        <Pagination :page="pagination" @update="switchPage"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/frontend/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      isLoading: false,
      pagination: {
        current_page: 1,
        has_next: true,
        has_pre: false,
        total_pages: 1
      },
      favorId: JSON.parse(localStorage.getItem('favorID')) || [],
      carts: JSON.parse(localStorage.getItem('carts')) || []
    }
  },
  components: {
    ProductCard,
    Pagination
  },
  watch: {
    $route () {
      this.pagination.current_page = 1
      this.pagination.has_next = true
      this.pagination.has_pre = false
    }
  },
  computed: {
    favorProduct () {
      const vm = this
      const favorId = vm.favorId
      const currentPage = vm.pagination.current_page
      vm.$bus.$on('favorChange', (item) => { vm.favorId = item })

      const newProduct = vm.products.filter((item) => {
        if (favorId.indexOf(item.id) !== -1) {
          return item
        }
      })

      // 總頁數
      vm.pagination.total_pages = Math.ceil(newProduct.length / 9)
      if (vm.pagination.total_pages === 1) {
        vm.pagination.has_next = false
      }

      return newProduct.filter((item, index) => { return index >= currentPage * 9 - 9 && index <= currentPage * 9 - 1 })
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.products = res.data.products.reverse()
        vm.isLoading = false
      })
    },
    switchPage (page = 1) {
      this.pagination = {
        current_page: page,
        has_next: this.pagination.total_pages > page,
        has_pre: this.pagination.total_pages - page < this.pagination.total_pages - 1,
        total_pages: this.pagination.total_pages
      }
      window.scroll(0, 0)
    }
  },
  created () {
    this.getProducts()
    this.$bus.$emit('navActive', 'favor')
  },
  beforeDestroy () {
    this.$bus.$off('favorChange')
  }
}
</script>
