<template>
  <div class="col-md-3 d-md-block bg-c-brown sidebar collapse" id="sidebarMenu">
    <nav>
      <h6 class="sidebar-heading text-center mt-4 mb-1 text-white font-weight-bold bg-set d-none d-md-block">
        <img class="img-fluid mb-3" src="@/assets/images/blanco-coffee.png" alt="Coffee Logo" style="width: 100px"/>
        <br />
        <span>管理員後台設定</span>
      </h6>
      <ul class="nav flex-column nav-set">
        <li class="nav-item">
          <router-link id="productList" class="nav-link" to="/admin" data-toggle="collapse" data-target="#sidebarMenu"
            :class="{ active: active === 'admin' }">
            <i class="fas fa-box-open"></i>
            產品清單
          </router-link>
        </li>
        <li class="nav-item">
          <router-link id="orderList" class="nav-link" to="/admin/orders" data-toggle="collapse" data-target="#sidebarMenu"
            :class="{ active: active === 'orders' }">
            <i class="fas fa-clipboard-list"></i>
            客戶訂單
          </router-link>
        </li>
        <li class="nav-item">
          <router-link id="coupon" class="nav-link" to="/admin/coupon" data-toggle="collapse" data-target="#sidebarMenu"
            :class="{ active: active === 'coupon' }">
            <i class="fas fa-ticket-alt"></i>
            優惠券管理
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'admin'
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('sideNow', (nav) => { vm.active = nav })
  },
  beforeDestroy () {
    this.$bus.$off('sideNow')
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
}
@media (max-width: 767.98px) {
  .sidebar {
    top: 6rem;
    z-index: 100;
  }
}
.bg-set {
  margin: -15px !important;
  padding: 40px 0;
  background-color: #88694b;
}
.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}
.sidebar-heading {
  font-size: 0.85rem;
  text-transform: uppercase;
}
.sidebar .nav-link.active {
  color: #ffb141;
  background-color: #252525;
}
.nav-set {
  padding-top: 24px;
  margin: 0 -15px !important;
  a:hover {
    color: #e7b164;
    background-color: #646b5b;
    transition: all 0.5s;
  }
  i {
    width: 18px;
    height: 18px;
    text-align: center;
    margin-right: 6px;
  }
}
@media (max-width: 767.98px) {
  .nav-set {
    padding-top: 0;
  }
}
</style>
