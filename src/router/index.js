import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/frontend/Home.vue'),
      children: [
        {
          path: '',
          name: 'Index',
          component: () => import('../views/frontend/Index.vue')
        },
        {
          path: 'productlist/:id',
          name: 'ProductList',
          component: () => import('../views/frontend/ProductList.vue')
        },
        {
          path: 'singleproduct/:id',
          name: 'SingleProduct',
          component: () => import('../views/frontend/SingleProduct.vue')
        },
        {
          path: 'favor',
          name: 'Favor',
          component: () => import('../views/frontend/Favor.vue')
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/frontend/Cart.vue')
        },
        {
          path: 'customerorders',
          name: 'CustomerOrders',
          component: () => import('../views/frontend/CustomerOrders.vue')
        },
        {
          path: 'customercheckout/:id',
          name: 'CustomerCheckout',
          component: () => import('../views/frontend/CustomerCheckout.vue')
        }]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/frontend/Login.vue')
    },
    {
      path: '/admin',
      name: 'Dashboard',
      meta: { requiresAuth: true },
      component: () => import('../views/backend/Dashboard.vue'),
      children: [
        {
          path: '',
          name: 'Product',
          meta: { requiresAuth: true },
          component: () => import('../views/backend/Product.vue')
        },
        {
          path: 'orders',
          name: 'Orders',
          meta: { requiresAuth: true },
          component: () => import('../views/backend/Orders.vue')
        },
        {
          path: 'coupon',
          name: 'Coupon',
          meta: { requiresAuth: true },
          component: () => import('../views/backend/Coupon.vue')
        }]
    },
    {
      path: '*',
      redirect: '/'
    }]
})
