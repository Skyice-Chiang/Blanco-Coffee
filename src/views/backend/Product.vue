<template>
  <div class="container p-0 p-md-4 d-flex flex-column">
    <loading :active.sync="status.isLoading"></loading>
    <h3 class="text-white">產品清單</h3>
    <button class="btn btn-secondary mt-4 align-self-end" type="button" @click="openModal(true)">
      新增產品
    </button>
    <div class="table-responsive">
      <table class="table table-hover bg-white my-4">
        <thead class="thead-dark">
          <tr>
            <th width="100">分類</th>
            <th>名稱</th>
            <th width="100">原價</th>
            <th width="100">售價</th>
            <th width="150">是否啟用</th>
            <th width="180">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td class="align-middle">{{ item.category }}</td>
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle text-right">
              {{ item.origin_price | currency }}
            </td>
            <td class="align-middle text-right">{{ item.price | currency }}</td>
            <td class="align-middle">
              <span v-if="!item.is_enabled">未啟用</span>
              <span v-else class="text-success">已啟用</span>
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button class="btn btn-c-green" type="button" @click="openModal(false, item)">
                  編輯
                </button>
                <button class="btn btn-c-red" type="button" @click="deleteModal(item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :page="pagination" @update="getProucts" v-if="products.length !== 0"></Pagination>
    <!--open product modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title font-weight-bold" id="productTile">
              <span>{{ status.label }}</span>
            </h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input class="form-control" type="text" id="image" placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"/>
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUpload"></i>
                  </label>
                  <input class="form-control" type="file" id="customFile" ref="imgFiles" @change="uploadFile"/>
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input class="form-control" type="text" id="title" placeholder="請輸入標題" v-model="tempProduct.title"/>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input class="form-control" type="text" id="category" placeholder="請輸入分類" v-model="tempProduct.category"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input class="form-control" type="unit" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit"/>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input class="form-control" type="number" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input class="form-control" type="number" id="price" placeholder="請輸入售價" v-model="tempProduct.price"/>
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea class="form-control" type="text" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea class="form-control" type="text" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" id="is_enabled" type="checkbox" v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"/>
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" type="button" data-dismiss="modal">
              取消
            </button>
            <button class="btn btn-secondary" type="button" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- delet product modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h5 class="modal-title font-weight-bold" id="deleteTile">
              刪除產品
            </h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              確定要刪除
              <span class="font-weight-bold text-c-red">{{ tempProduct.title }}</span>
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" data-dismiss="modal">
              取消
            </button>
            <button class="btn btn-c-red" type="button" @click="deleteProduct">
              確定刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      status: {
        isLoading: false,
        fileUpload: false,
        isNew: false,
        label: '新增產品'
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProucts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      vm.status.isLoading = true
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products
          vm.pagination = res.data.pagination
          vm.status.isLoading = false
        }
      })
    },
    updateProduct () {
      const vm = this
      const product = vm.tempProduct
      let httpMethod = 'post'
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      vm.status.isLoading = true
      if (!vm.status.isNew) {
        httpMethod = 'put'
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${product.id}`
      }
      vm.$http[httpMethod](api, { data: product }).then(res => {
        if (res.data.success) {
          vm.status.isLoading = false
          vm.tempProduct = {}
          vm.$bus.$emit('message:push', res.data.message, 'success', 'fa-check-circle')
          vm.getProucts()
          $('#productModal').modal('hide')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger', 'fa-times-circle')
        }
      })
    },
    deleteProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`
      vm.status.isLoading = true
      vm.$http.delete(api).then(res => {
        if (res.data.success) {
          vm.status.isLoading = false
          vm.tempProduct = {}
          vm.$bus.$emit('message:push', res.data.message, 'success', 'fa-check-circle')
          vm.getProucts()
          $('#deleteModal').modal('hide')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger', 'fa-times-circle')
        }
      })
    },
    openModal (isNew, item) {
      this.status.isNew = isNew
      if (isNew) {
        this.tempProduct = {}
        this.status.label = '新增產品'
      } else {
        this.status.label = '編輯產品'
        this.tempProduct = { ...item }
      }
      $('#productModal').modal('show')
    },
    deleteModal (item) {
      this.tempProduct = { ...item }
      $('#deleteModal').modal('show')
    },
    uploadFile () {
      const vm = this
      const uploadFile = vm.$refs.imgFiles.files[0]
      const formData = new FormData()
      formData.append('file-upload', uploadFile)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.fileUpload = true
      vm.$http
        .post(api, formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          if (res.data.success) {
            // 強制寫入，雙向綁定
            vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl)
            vm.status.fileUpload = false
          }
        })
    }
  },
  created () {
    this.$bus.$emit('sideNow', 'admin')
    this.getProucts()
  }
}
</script>
