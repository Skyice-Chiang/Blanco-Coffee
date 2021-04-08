<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" v-for="(item, i) in messages"
      :key="i"
      :class="'alert-' + item.status">
      <p class="my-0">
        <i class="far" :class="item.icon"></i>
        <span class="ml-1">{{ item.message }}</span>
      </p>
      <button class="close" type="button" @click="removeMessage(i)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status, icon) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({ message, status, icon, timestamp })
      $('.message-alert').addClass('show')
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      $('.message-alert').removeClass('show')
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            $('.message-alert').removeClass('show')
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning', icon) => {
      vm.updateMessage(message, status, icon)
    })
  },
  beforeDestroy () {
    this.$bus.$off('message:push')
  }
}
</script>

<style lang="scss" scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  right: 20px;
  top: 80px;
  z-index: 999;
  padding: 10px;
  border-radius: 10px;
  transform: translateY(-30px);
  transition: all 1s;
  &.show {
    transform: translateY(0px);
  }
}
@media (max-width: 540px) {
  .message-alert {
    max-width: 100%;
  }
}
</style>
