# Blanco Coffee
[![1.png](https://i.postimg.cc/nLGdDCfP/1.png)](https://postimg.cc/jWCQVq5H)

Demo: https://skyice-chiang.github.io/blanco-coffee/

## 簡介
以vue.js練習實作咖啡購物電商網站，功能分為前台購物與後台控管
- 前台 :
    - Home 首頁 :  Banner圖片介紹特色與導覽知識
    - Product 商品 :  陳列多種商品、商品項目篩選分類、加入購物車與最愛、單一商品細節說明與相關產品推薦
    - Favor 我的最愛 :  紀錄喜愛的商品，想購買時可直接瀏覽下單
    - Cart 購物車 :  檢視目前加入購物車的商品，且可直接修改數量與刪除，確認後進入訂單流程
    - Login 登入系統 : 管理者進入後台
- 後台 :
    - 產品清單 : 新增/修改/刪除產品
    - 客戶訂單 : 查閱買家訂單狀況，是否已付款
    - 優惠券管理 : 訂定使用日期與折扣趴數

## 使用技術
- Vue CLI4 :  建立SPA網站
- Vue Router : 使用全局守衛，防止在使用者未登入的情況下進入後台
- ESLint(Standard) : 統一撰寫程式碼的風格
- Axios : 處理AJAX請求，串接API取得後台資料
- VeeValidate : 驗證訂單內容
- RWD : 根據桌電、平板、手機不同裝置來做內容響應變化
- jQuery : 產品選單下拉動態
- Bootstrap 4 + CSS預處理器（SCSS）:  客製樣式（顏色、字體），製作個人風格網頁

## 套件
- vue
- bootstrap
- jquery
- popper.js
- vue-axios 、 axios  串接API
- vue-router 管理由前端所模擬的路由器
- vue-loading-overlay 全畫面Loading小動畫
- vue-awesome-swiper 、swiper 輪播功能
- vee-validate 驗證表單
- fontawesome CDN icon小圖示

## 特色功能介紹
> 回饋訊息與購車數量圖示更新 : 搭配event bus掛載到Vue原型下，讓不同的Vue實例可以共享

[![2.png](https://i.postimg.cc/X7rDzj9r/2.png)](https://postimg.cc/ZChc9h7m)


> 訂閱功能 : 信箱驗證格式是否正確與有無使用過、點擊優惠碼即複製

[![3.png](https://i.postimg.cc/TP671nFb/3.png)](https://postimg.cc/qN1XZ6kB)

> 產品列表分類 : 篩選後顯示想要的產品

[![4.png](https://i.postimg.cc/Z53sJw7Z/4.png)](https://postimg.cc/18mrHr1Y)

> 訂單流程 : 輸入優惠碼執行價錢打折、驗證客戶資料內容
[![5.png](https://i.postimg.cc/yY2rqMTv/5.png)](https://postimg.cc/sv9J70qh)

## Vue.filter過濾功能
- [千分號與金錢符號](https://github.com/Skyice-Chiang/blanco-coffee/blob/master/src/filters/currency.js)
- [Unix timestamp 轉換成日期](https://github.com/Skyice-Chiang/blanco-coffee/blob/master/src/filters/date.js)

## 聲明
- 此網站僅作為個人練習用，無商業用途
- 圖片來源:  [unsplash](https://unsplash.com/)、Google圖片、PCHome圖片
