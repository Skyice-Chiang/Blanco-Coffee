<template>
  <div>
    <div class="product-card sale">
      <div class="star" @click="addFavor(product.id)">
        <i v-if="favor.indexOf(product.id) !== -1" class="fas fa-star"></i>
        <i v-else class="far fa-star"></i>
      </div>
      <router-link class="no-underline" :to="`/singleProduct/${product.id}`" @click.native="scrollTop">
        <div class="sale-text">特價中</div>
        <div class="product-img">
          <img :src="product.imageUrl" :alt="`${product.title}`"/>
        </div>
        <div class="product-title">{{ product.title }}</div>
        <div class="product-price">
          <p class="delete mb-0">
            <small>NT {{ product.origin_price | currency }}</small>
          </p>
          <p class="mb-0 text-secondary">
            特價 NT {{ product.price | currency }}
          </p>
        </div>
      </router-link>
      <div class="product-footer text-center">
        <a class="btn btn-block text-white" @click="addCart(product.title, product.id, 1, product.price)">
          <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-shopping-cart mr-1"></i>
          加入購物車
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'cart', 'favor'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    addCart (title, id, qty = 1, price) {
      const cart = this.cart
      const cartId = cart.map((item) => item.id)
      const productItem = {
        title,
        id,
        qty,
        price
      }
      this.isLoading = true
      if (cartId.indexOf(id) !== -1) {
        productItem.qty = cart.filter((item) => item.id === id)[0].qty + 1
        cart.splice(cartId.indexOf(id), 1)
        cart.unshift(productItem)
      } else if (cartId.indexOf(id) === -1) {
        cart.unshift(productItem)
      }
      this.$bus.$emit('message:push', '成功加入購物車', 'success', 'fa-check-circle')
      localStorage.setItem('carts', JSON.stringify(cart))

      // 傳送購物車數量給navbar
      const num = this.cart.map((item) => item.qty).reduce((sum, value) => (sum += value), 0)
      this.$bus.$emit('changeNum', num)

      // 放入購物車動畫
      setTimeout(() => { this.isLoading = false }, 1000)
    },
    addFavor (id) {
      const favors = this.favor
      const favorIdIndext = favors.indexOf(id)
      if (favorIdIndext === -1) {
        favors.unshift(id)
      } else {
        favors.splice(favorIdIndext, 1)
      }
      localStorage.setItem('favorID', JSON.stringify(favors))
      this.$bus.$emit('favorChange', JSON.parse(localStorage.getItem('favorID')))
    },
    scrollTop () {
      window.scroll(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.no-underline {
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}
.product-card {
  transition: all 0.3s;
  border-radius: 10px;
  margin-bottom: 1.5em;
}

.star {
  color: #ffb141;
  font-size: 2em;
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 2;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
.sale {
  position: relative;
  overflow: hidden;
  .sale-text {
    position: absolute;
    top: 16px;
    right: -66px;
    width: 200px;
    padding: 10px 0;
    color: #fff;
    letter-spacing: 2px;
    font-weight: bold;
    text-align: center;
    background-color: #a8baa9;
    transform: rotate(45deg);
    z-index: 1;
  }
}
.product-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px 10px 0 0;
  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.3s;
  }
  &:hover img {
    transform: scale(1.05);
  }
}

.product-title {
  font-size: 1.05em;
  font-weight: bold;
  text-align: center;
  padding: 20px 10px;
  color: #854442;
  background-color: #fff;
}

.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: #fff;
  background-color: #252525;
}
.delete {
  text-decoration: line-through;
}

.product-footer {
  color: #fff;
  background-color: #252525;
  border-radius: 0 0 10px 10px;
  a {
    padding: 10px 0;
    border-top: 1px solid #be9b7b;
    border-radius: 0 0 10px 10px;
    &:hover {
      background-color: #be9b7b;
    }
  }
}
</style>
