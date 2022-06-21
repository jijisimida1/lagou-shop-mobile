<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <!-- 轮播图部分 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item,index) in swipeData"
        :key="index"
      >
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <!-- 菜单列表 -->
    <van-grid icon-size="40px">
      <van-grid-item 
      v-for="(item) in menusData "
      :key="item.img"
      :icon="item.img" :text="item.info[0].value" />
    </van-grid>
    <!-- 公告栏 -->
    <van-notice-bar left-icon="fire-o" :scrollable="false">
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(item,index) in newsData"
          :key="index"
          v-text="item.chiild[0].val"
        />
      </van-swipe>
    </van-notice-bar>
    <!-- 商品列表 -->
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="initProductsData"
    >
      <product-list
        :products-data="productsData"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
  import ProductList from '@/components/ProductList.vue'

  import { getDefaultData } from '@/api/index.js'
  import { getProductsData } from '@/api/product'
  import { ref } from '@vue/reactivity'
  import { computed } from '@vue/runtime-core'
  import { reactive } from '@vue/reactivity'

  // ---- 首页功能 ----
// 存储首页的所有数据（声明响应式数据）
const indexData = ref({})

// 封装首页数据初始化功能
const initIndexData = async () => {
  const { data } = await getDefaultData()
  if (data.status !== 200) {
     return 
    }
  indexData.value = data.data
  // 加载完毕，将下拉刷新状态更改为完成
  refreshing.value = false

}
initIndexData()

// 通过计算属性保存需要使用的数据
// 1 轮播图数据
const swipeData = computed(() => indexData.value.swiperBg?.default.imgList.list)
// 2 菜单列表数据
const menusData = computed(() => indexData.value.menus?.default.imgList.list)
// 3 公告区域数据
const newsData = computed(() => indexData.value.news?.default.newList.list)

// 存储商品列表数据
const productsData = ref([])
const state = reactive({
  loading: false,
  finished: false
})

let page = 1
let limit = 4
// 请求指定页的商品数据
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit,
    page
  })
  if (data.status !== 200) { return }
  // 请求每次得到的是新一段数据，需要将新数据添加到 productsData 中
  productsData.value.push(...data.data)

   // 将本次加载状态更改为完成
  state.loading = false

  // 判断是否已经加载完全部数据
  if (data.data.length < limit) {
    state.finished = true
    return
  }

  page++
}
// 下拉刷新
const refreshing = ref(false)
const onRefresh = () => {
  indexData.value = {}
  productsData.value = []
  page = 1
  state.loading = false
  state.finished = false
  initIndexData()
  initProductsData()
}
</script>
  
<style lang="scss" scoped>
  .my-swipe img {
    width: 100%;
    height: 170px;
  }
  :deep(.van-notice-bar__content) {
    display: flex;
    align-items: center;
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }

</style>