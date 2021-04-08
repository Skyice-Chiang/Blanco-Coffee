<template>
  <div class="nav-set">
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-dark position-sticky p-0 pt-2 pt-md-0 bg-primary flex-md-nowrap shadow">
      <a class="navbar-brand mr-0 px-3 d-flex align-items-center d-block d-md-none font-weight-bold" href="#">
        <img class="img-fluid mr-1" src="@/assets/images/blanco-coffee.png" alt="Coffee Logo" style="width: 20px"/>
        管理員後台設定
      </a>
      <button class="navbar-toggler d-md-none collapsed mr-3" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="signout ml-auto">
        <a class="nav-link" href="#" @click.prevent="logout">
          <i class="fas fa-user mr-1"></i>
          <span>Sign out</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    logout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.isLoading = true
      vm.$http.post(api).then(res => {
        if (res.data.success) {
          vm.isLoading = false
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-set {
  margin: 0 -15px;
  a.navbar-brand {
    pointer-events: none;
  }
}
.position-sticky {
  position: absolute !important;
  top: 0;
  right: 0;
  left: 0;
  z-index: 80;
}
.signout {
  a {
    color: #fff;
    &:hover {
      color: #ffb141;
    }
  }
}
@media (max-width: 767.9px) {
  .signout {
    width: 100%;
    background-color: rgb(82, 82, 82);
    margin-top: 10px;
  }
}
</style>
