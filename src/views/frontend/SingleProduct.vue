<template>
  <div class="single-bg py-5">
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5 detail-main" v-if="singleProduct.description">
      <ol class="breadcrumb bg-transparent letter-spacing">
        <li class="breadcrumb-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/productlist/all">Products</router-link>
        </li>
        <li class="breadcrumb-item active">{{ category }}</li>
      </ol>
      <div class="row detail-main">
        <div class="col-md-6">
          <div class="detail-img"><img :src="singleProduct.imageUrl" :alt="`${singleProduct.title}`" /></div>
        </div>
        <div class="col-md-6">
          <div class="detail-content letter-spacing">
            <h5 class="mt-4 mt-md-0">
              <span class="badge badge-secondary">
                {{ singleProduct.category }}</span>
            </h5>
            <div class="detail-title">{{ singleProduct.title }}</div>
            <hr class="bg-white" />
            <p class="mt-4 mb-0">【 商 品 說 明 】</p>
            <div class="product-description mt-3">
              <p class="mb-1" v-for="(item, i) in description" :key="i">- {{ item }}</p>
              <span v-if="singleProduct.category.split('-')[0] == '咖啡豆'">- {{ singleProduct.unit }}</span>
            </div>
            <div
              class="detail-price d-flex justify-content-between align-items-end mt-4 px-1">
              <span class="h6 original">原價NT{{ singleProduct.origin_price | currency }}</span>
              <span class="h5 sale text-c-red font-weight-bold">特價NT{{ singleProduct.price | currency }}</span>
            </div>
            <div class="add-cart d-lg-flex justify-content-between align-items-center">
              <div class="input-group my-3 mb-4 mb-lg-3">
                <div class="input-group-prepend">
                  <button class="btn btn-primary px-4" type="button"
                    :disabled="num == 1"
                    @click="num -= 1">
                    -
                  </button>
                </div>
                <input class="form-control text-center font-weight-bold" inputmode="numeric" v-model="num"/>
                <div class="input-group-append">
                  <button class="btn btn-primary px-4" type="button"
                    :disabled="num == 10"
                    @click="num += 1">
                    +
                  </button>
                </div>
              </div>
              <button class="btn btn-primary ml-lg-4 btn-block text-nowrap" type="button"
                @click="addCart(singleProduct.title, singleProduct.id, num, singleProduct.price)">
                <i v-if="cartLoading" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-shopping-cart mr-1"></i>加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-remark mt-4 pt-4">
        <div class="h5 letter-spacing font-weight-bold">- 相關產品 -</div>
        <div class="detail-relative">
          <ProductCard class="col-12 col-md-6 col-xl-4"
            :favor="favorId"
            :cart="carts"
            :product="item"
            v-for="(item, i) in relativeProduct"
            :key="i"
          ></ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/frontend/ProductCard.vue'

export default {
  data () {
    return {
      singleProduct: {},
      products: [],
      carts: JSON.parse(localStorage.getItem('carts')) || [],
      favorId: JSON.parse(localStorage.getItem('favorID')) || [],
      isDetail: true,
      isLoading: false,
      cartLoading: false,
      num: 1,
      itemCategory: ''
    }
  },
  components: {
    ProductCard
  },
  watch: {
    num () {
      if (this.num <= 1) {
        this.num = 1
      } else if (this.num >= 10) {
        this.num = 10
      }
    },
    $route () {
      this.getProduct(this.$route.params.id)
      this.num = 1
    }
  },
  computed: {
    category () {
      const vm = this
      let newCategory = ''
      const category = this.singleProduct.category.split('-')[0]
      vm.itemCategory = category
      if (category === '咖啡豆') {
        newCategory = 'Beans'
      } else if (category === '器具') {
        newCategory = 'Machine'
      } else if (category === '杯子') {
        newCategory = 'Cups'
      }
      return newCategory
    },
    description () {
      const newDescription = this.singleProduct.description.split('-').filter((item, index) => {
        if (index >= 1) {
          return item
        }
      })
      return newDescription
    },
    relativeProduct () {
      let showProdcuts = []
      const random = []
      const relative = this.singleProduct.category.split('-')[0]
      const newProdcuts = this.products.filter((item, index) => {
        if (relative === item.category.split('-')[0]) {
          return item
        }
      })

      // 取得隨機數字
      for (let i = 0; i < 6; i++) {
        random.push(Math.floor(Math.random() * newProdcuts.length) + 1)
      }

      // 顯示套入隨機數字的相關產品
      showProdcuts = newProdcuts.filter((item, index) => {
        if (random.indexOf(index) !== -1) {
          return item
        }
      })
      return showProdcuts
    }
  },
  methods: {
    getAllProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then((res) => { vm.products = res.data.products.reverse() })
    },
    getProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.singleProduct = res.data.product
        vm.isLoading = false
      })
    },
    addCart (title, id, qty = 1, price) {
      const carts = this.carts
      const cartId = carts.map((item) => item.id)
      const productItem = {
        title,
        id,
        qty,
        price
      }
      this.cartLoading = true
      if (cartId.indexOf(id) !== -1) {
        productItem.qty = carts.filter((item) => item.id === id)[0].qty + qty
        carts.splice(cartId.indexOf(id), 1)
        carts.unshift(productItem)
      } else if (cartId.indexOf(id) === -1) {
        carts.unshift(productItem)
      }
      this.$bus.$emit('message:push', '成功加入購物車', 'success', 'fa-check-circle')
      localStorage.setItem('carts', JSON.stringify(carts))

      // 傳送購物車數量給navbar
      const num = this.carts.map((item) => item.qty).reduce((sum, value) => (sum += value), 0)
      this.$bus.$emit('changeNum', num)

      // 放入購物車動畫
      setTimeout(() => { this.cartLoading = false }, 1000)
    }
  },
  created () {
    this.$bus.$emit('navActive', '')
    this.getProduct(this.$route.params.id)
    this.getAllProducts()
  }
}
</script>
