<template>
  <div>
    <ul class="pagination">
      <li>
        <a href="#" class="prev" @click.prevent="updatePage(page.current_page - 1)" :class="{ disabled: !page.has_pre }">
          ＜
        </a>
      </li>
      <li v-for="(item, i) in page.total_pages" :key="i">
        <a href="#" :class="{ active: page.current_page == item }" @click.prevent="updatePage(item)">
          {{ item }}
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="updatePage(page.current_page + 1)" :class="{ disabled: !page.has_next }">
          ＞
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['page'],
  methods: {
    updatePage (itemPage) {
      this.$emit('update', itemPage)
    }
  }
}
</script>

<style lang='scss' scoped>
.pagination {
  margin-left: -16px;
  a {
    display: block;
    padding: 2px 14px;
    border-radius: 30%;
    text-decoration: none;
    &:hover {
      color: #ffb141;
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.2);
      border-bottom: 3px solid #ffb141;
      pointer-events: none;
    }
  }
}
.disabled {
  pointer-events: none;
}
</style>
