<template>
  <div class="bg-c-red">
    <div class="container-fluid bg-c-brown">
      <AlertMessage></AlertMessage>
      <div class="row">
        <Sidebar></Sidebar>
        <div class="col-md-9 bg-c-red main-set">
          <Navbar></Navbar>
          <div class="main mt-5">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/backend/AdminNavbar.vue'
import Sidebar from '@/components/backend/AdminSidebar.vue'
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  components: {
    Navbar,
    Sidebar,
    AlertMessage
  },
  created () {
    // eslint-disable-next-line no-useless-escape
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)blancoToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
