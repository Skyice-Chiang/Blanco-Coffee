<template>
  <div class="cart-banner">
    <div class="pay-step">
      <div class="step-group d-flex justify-content-between align-items-center">
        <div class="step-circle" :class="{ 'active': step == '1' }">1</div>
        <div class="step-circle" :class="{ 'active': step == '2' }">2</div>
        <div class="step-circle" :class="{ 'active': step == '3' }">3</div>
      </div>
    </div>
    <div class="cart-title">
      <div>{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['step', 'title']
}
</script>

<style lang="scss" scoped>
// title font
@import url("https://fonts.googleapis.com/css2?family=Be+Vietnam:ital,wght@1,600&display=swap");

/* cart banner */
.cart-banner {
  min-height: 480px;
  background: url("../../assets/images/banner/banner-cart.jpg")
    no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  &::after {
    content: "";
    height: 100%;
    width: 100%;
    background-color: #000;
    position: absolute;
    z-index: 1;
    opacity: 0.2;
  }

  .pay-step {
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .cart-title {
    font-family: "Be Vietnam", sans-serif;
    font-size: 4em;
    font-weight: bold;
    letter-spacing: 0.3em;
    position: absolute;
    top: 76%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 20px 60px;
    text-align: center;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.6);
    -webkit-text-stroke: 1px rgba(37, 37, 37, 0.1);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 768px) {
  .cart-banner {
    min-height: 300px;
    .cart-title {
      font-size: 3em;
      padding: 20px;
    }
  }
}

//step
.step-group {
  height: 3px;
  background-color: #fff;

  .step-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #fff;
    color: #ffb141;
    background-color: #252525;

    &.active {
      color: #252525;
      background-color: #be9b7b;
    }
  }
}
</style>
