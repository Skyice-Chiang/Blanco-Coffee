<template>
  <div>
    <div class="header">
      <Swiper></Swiper>
    </div>
    <section class="story">
      <div class="container-fluid letter-spacing px-4 px-md-0">
        <h3 class="text-center text-primary mb-3">OUR COFFEE</h3>
        <p class="story-content">
          為了提供顧客多層次的咖啡，一直致力於相關研究，精挑細選不同地區的新鮮生豆，
          嘗試不同程度的烘焙方式，以及細緻的研磨咖啡豆，將咖啡豆的香味能夠完整地保留，
          最後透過獨特的萃取方法，沖泡一杯含有原始香氣的美味濃醇咖啡。
        </p>
        <div class="row row-fixed">
          <div class="col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0">
            <img class="img-size" src="@/assets/images/coffee-beans.png" alt="咖啡豆圖片"/>
            <h6>Bean Varieties</h6>
            <small>提供來自各地區的精選咖啡豆</small>
          </div>
          <div class="col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0">
            <img class="img-size" src="@/assets/images/coffee-cup.png" alt="咖啡杯圖片"/>
            <h6>Coffee Cups</h6>
            <small> 多樣款式的鋼杯與咖啡杯組合 </small>
          </div>
          <div class="col-md-4 d-flex flex-column align-items-center">
            <img class="img-size" src="@/assets/images/coffee-machine.png" alt="磨豆機圖片"/>
            <h6>Espresso Machines</h6>
            <small> 手沖、手動、自動咖啡機 </small>
          </div>
        </div>
      </div>
    </section>
    <section class="coffee-knowledge">
      <div class="container-fluid letter-spacing d-flex flex-column align-items-center">
        <h3 class="text-center text-white mb-3">COFFEE KNOWLEDGE</h3>
        <p class="knowledge text-center text-white mb-4">
          了解咖啡豆風味，<span class="break">挑選專屬適合自己的咖啡</span>
        </p>
        <div class="timeline">
          <div class="row timeline-pointer py-4 text-white">
            <div class="col-md-6 px-4 mb-4 mb-md-0">
              <div class="time-box">
                <div class="time-img" :style="{ backgroundImage: `url(${require('@/assets/images/index/coffee01.jpg')})` }"></div>
              </div>
            </div>
            <div class="col-md-6 px-4">
              <div class="knowledge-title-right mb-3">烘焙</div>
              <div class="knowledge-content">
                <p>
                  根據烘焙的方式，除了咖啡豆的外觀及咖啡色澤有所不同，風味及口感也會完全不一樣
                </p>
                <p>
                  咖啡豆的烘焙時間由短至長，大致可劃分為3種烘焙程度
                  <br />
                  <span class="text-c-red font-weight-bold">淺焙 x 中焙 x 深焙</span>
                </p>
                <p>烘焙時間越長，外觀顏色越深，酸味慢慢變淡，苦味則會越濃</p>
                <p>讓我們一起來往下看看烘焙所造成的化學反應吧!</p>
              </div>
            </div>
          </div>
          <div class="row flex-row-reverse timeline-pointer py-4 text-white">
            <div class="col-md-6 px-4 mb-4 mb-md-0">
              <div class="time-box">
                <div class="time-img" :style="{ backgroundImage: `url(${require('@/assets/images/index/coffee02.jpg')})` }"></div>
              </div>
            </div>
            <div class="col-md-6 px-4">
              <div class="knowledge-title mb-3">
                <p class="mb-0">【淺焙】- 原始風味</p>
              </div>
              <div class="knowledge-content">
                <p>
                  最輕度的烘焙，沒有什麼加工程序，保留了最多的水果酸質，呈現最原始的風味及品質外觀顏色淡，沖泡出來的咖啡呈現淡褐色，通常帶有淡淡的花果香氣，且嚐起來順口。
                </p>
                <p>美式咖啡常採取的一種烘焙程度</p>
              </div>
            </div>
          </div>
          <div class="row timeline-pointer py-4 text-white">
            <div class="col-md-6 px-4 mb-4 mb-md-0">
              <div class="time-box">
                <div class="time-img" :style="{ backgroundImage: `url(${require('@/assets/images/index/coffee03.jpg')})` }"></div>
              </div>
            </div>
            <div class="col-md-6 px-4">
              <div class="knowledge-title mb-3">【中焙】- 酸苦平衡風味</div>
              <div class="knowledge-content">
                <p>
                  一般的烘焙方法，表面開始會分泌油脂，顏色接近栗子色，香味比淺焙時更濃郁，同時也帶有點酸味與苦味，適合給藍山和吉利馬札羅等咖啡。
                </p>
                <p>常為日本及中北歐人士所愛。</p>
              </div>
            </div>
          </div>
          <div class="row flex-row-reverse timeline-pointer py-4 text-white">
            <div class="col-md-6 px-4 mb-4 mb-md-0">
              <div class="time-box">
                <div class="time-img" :style="{ backgroundImage: `url(${require('@/assets/images/index/coffee04.jpg')})` }"></div>
              </div>
            </div>
            <div class="col-md-6 px-4">
              <div class="knowledge-title mb-3">
                <p class="mb-0">【深焙】- 醇厚濃郁風味</p>
              </div>
              <div class="knowledge-content">
                <p>
                  最深的烘焙程度，因長時間的烘焙，外觀有豐富的油脂且呈現深褐色，沖煮後的咖啡帶有濃厚的炭燒味，無法品嚐到原始的花果香氣。
                </p>
                <p>在歐洲很流行，大部分的Espresso咖啡都是使用深焙咖啡豆</p>
              </div>
            </div>
          </div>
        </div>
        <router-link class="btn btn-outline-c-red mt-4" to="/productlist/all" @click.native="scrollTop">
          現在就來去逛逛吧
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import Swiper from '@/components/frontend/Swiper.vue'

export default {
  components: {
    Swiper
  },
  methods: {
    scrollTop () {
      window.scroll(0, 0)
    }
  },
  created () {
    this.$bus.$emit('navActive', 'home')
  }
}
</script>
