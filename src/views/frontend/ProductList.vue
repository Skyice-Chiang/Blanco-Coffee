<template>
  <div class="bg-c-red">
    <loading :active.sync="isLoading"></loading>
    <div class="product-banner">
      <div class="text-sale letter-spacing">
        <div class="h2 font-weight-bold">正逢週年慶，全館打折</div>
        <div class="h5">
          輸入優惠碼
          <span class="text-secondary font-weight-bold">blanco222</span>
          <span class="breakpoints">即享有六折優惠</span>
        </div>
      </div>
    </div>
    <div class="container-fluid py-5 px-md-5">
      <div class="row">
        <div class="col-lg-3 d-inline-block mb-4 mb-lg-0">
          <!-- 產品選單 -->
          <div class="product-side">
            <ul class="productlist letter-spacing">
              <li @click="addActive">
                <router-link class="font-weight-bold all-size" to="/productlist/all"
                  :class="{ active: isActive === 'all' }">
                  <div class="icon-align">
                    <i class="fab fa-product-hunt"></i>
                  </div>
                  全部商品
                </router-link>
              </li>
              <li class="second-menu" data-menu="0" @click="isActive = 'bean'">
                <router-link class="font-weight-bold d-flex justify-content-between align-items-center" to="/productlist/bean"
                  :class="{ active: isActive === 'bean' }">
                  <span>
                    <div class="icon-align">
                      <i class="fas fa-tablets "></i>
                    </div>
                    咖啡豆系列
                  </span>
                  <i class="fas fa-caret-down caret-size" :class="{ active: isRotate.bean }"></i>
                </router-link>
                <ul class="dropdown" @click="addActive">
                  <li>
                    <router-link to="/productlist/bean-deep">深焙</router-link>
                  </li>
                  <li>
                    <router-link to="/productlist/bean-middledeep">中深焙</router-link>
                  </li>
                  <li>
                    <router-link to="/productlist/bean-middle">中焙</router-link>
                  </li>
                  <li>
                    <router-link to="/productlist/bean-light">淺焙</router-link>
                  </li>
                </ul>
              </li>
              <li class="second-menu" data-menu="1" @click="isActive = 'cup'">
                <router-link class="font-weight-bold d-flex justify-content-between align-items-center" to="/productlist/cup"
                  :class="{ active: isActive === 'cup' }">
                  <span>
                    <div class="icon-align">
                      <i class="fas fa-coffee"></i>
                    </div>
                    杯子系列
                  </span>
                  <i class="fas fa-caret-down caret-size" :class="{ active: isRotate.cup }"></i>
                </router-link>
                <ul class="dropdown" @click="addActive">
                  <li>
                    <router-link to="/productlist/cup-group">咖啡杯組</router-link>
                  </li>
                  <li>
                    <router-link to="/productlist/cup-mental">鋼杯</router-link>
                  </li>
                </ul>
              </li>
              <li class="second-menu" data-menu="2" @click="isActive = 'machine'">
                <router-link class="font-weight-bold d-flex justify-content-between align-items-center" to="/productlist/machine"
                  :class="{ active: isActive === 'machine' }">
                  <span>
                    <div class="icon-align">
                      <i class="fas fa-cog"></i>
                    </div>
                    器具系列
                  </span>
                  <i class="fas fa-caret-down caret-size" :class="{ active: isRotate.machine }"></i>
                </router-link>
                <ul class="dropdown" @click="addActive">
                  <li>
                    <router-link to="/productlist/machine-hand">手沖/研磨</router-link>
                  </li>
                  <li>
                    <router-link to="/productlist/machine-halfauto">半自動</router-link>
                  </li>
                  <li>
                    <router-link to="/productlist/machine-auto">全自動</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <!-- 產品顯示 -->
          <div class="row product-area">
            <ProductCard class="col-12 col-sm-6 col-xl-4"
              :favor="favorId"
              :cart="carts"
              :product="item"
              v-for="(item, i) in currentProduct"
              :key="i">
            </ProductCard>
          </div>
          <div class="d-flex justify-content-center mt-4">
            <Pagination :page="pagination" @update="switchPage"></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import ProductCard from '@/components/frontend/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      carts: JSON.parse(localStorage.getItem('carts')) || [],
      favorId: JSON.parse(localStorage.getItem('favorID')) || [],
      pagination: {
        current_page: 1,
        has_next: true,
        has_pre: false,
        total_pages: 1
      },
      isLoading: false,
      isActive: 'all',
      isRotate: {
        bean: false,
        cup: false,
        machine: false
      },
      filterTarget: ''
    }
  },
  components: {
    ProductCard,
    Pagination
  },
  watch: {
    $route () {
      this.filterTarget = this.$route.params.id
      this.pagination.current_page = 1
      this.pagination.has_next = true
      this.pagination.has_pre = false
    }
  },
  computed: {
    currentProduct () {
      const vm = this
      let newShow = []
      const target = vm.filterTarget
      const currentPage = vm.pagination.current_page

      // 過濾項目
      const newProduct = vm.products.filter((item) => {
        const itemCategory = item.category.split('-')
        if (target === 'all') {
          return item
        } else if (target === 'bean') {
          if (itemCategory[0] === '咖啡豆') {
            return item
          }
        } else if (target === 'cup') {
          if (itemCategory[0] === '杯子') {
            return item
          }
        } else if (target === 'machine') {
          if (itemCategory[0] === '器具') {
            return item
          }
        } else if (target === 'bean-deep') {
          if (itemCategory[1] === '深') {
            return item
          }
        } else if (target === 'bean-middledeep') {
          if (itemCategory[1] === '中深') {
            return item
          }
        } else if (target === 'bean-middle') {
          if (itemCategory[1] === '中') {
            return item
          }
        } else if (target === 'bean-light') {
          if (itemCategory[1] === '淺') {
            return item
          }
        } else if (target === 'cup-group') {
          if (itemCategory[1] === '咖啡杯組') {
            return item
          }
        } else if (target === 'cup-mental') {
          if (itemCategory[1] === '鋼杯') {
            return item
          }
        } else if (target === 'machine-hand') {
          if (itemCategory[1] === '手動') {
            return item
          }
        } else if (target === 'machine-halfauto') {
          if (itemCategory[1] === '半自動') {
            return item
          }
        } else if (target === 'machine-auto') {
          if (itemCategory[1] === '全自動') {
            return item
          }
        }
      })

      vm.pagination.total_pages = Math.ceil(newProduct.length / 6)

      newShow = newProduct.filter((item, index) => index >= currentPage * 6 - 6 && index <= currentPage * 6 - 1)
      return newShow
    }
  },
  methods: {
    addActive (e) {
      const target = e.target
      if (target.innerText === ' 全部商品') {
        this.isActive = 'all'
        $(target).parents('.productlist').find('a').removeClass('active')
      } else {
        const targetIndex = $(target).parents('.second-menu')[0].dataset.menu
        $(target).addClass('active').parent().siblings().find('a').removeClass('active').parents().siblings().find('.dropdown a').removeClass('active')
        if (targetIndex === 0) {
          this.isActive = 'bean'
        } else if (targetIndex === 1) {
          this.isActive = 'cup'
        } else if (targetIndex === 2) {
          this.isActive = 'machine'
        }
      }
    },
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
    this.filterTarget = this.$route.params.id
    this.$bus.$emit('navActive', 'productlist')
  },
  mounted () {
    const vm = this
    const dropdown = document.querySelectorAll('.dropdown')
    // 第二層選單
    $('.second-menu').click(function (e) {
      const menuIndex = e.currentTarget.dataset.menu
      const menuTitle = $(e.target).parent()[0].innerText
      e.preventDefault()
      if (e.target.nodeName === 'I') {
        // 選單icon開關動畫
        if (menuTitle === ' 咖啡豆系列') {
          vm.isRotate.bean = !vm.isRotate.bean
        } else if (menuTitle === ' 杯子系列') {
          vm.isRotate.cup = !vm.isRotate.cup
        } else if (menuTitle === ' 器具系列') {
          vm.isRotate.machine = !vm.isRotate.machine
        }
        // 選單開關
        dropdown.forEach((item, index) => {
          if (index === Number(menuIndex)) {
            $(item).slideToggle()
          }
        })
      }
    })
  }
}
</script>
