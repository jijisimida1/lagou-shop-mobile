<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell
        v-for="item in list"
        :key="item.id"
        @click="$router.push({
            name: 'course-info',
            params: {
              courseId: item.id
            }
          })">
          <div>
            <img :src="item.courseImgUrl || item.image" alt="">
          </div>
          <div class="course-info">
            <h3 v-text="item.courseName || item.name"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <p class="price-container" v-if="item.price">
              <span class="course-discounts">￥{{item.discounts}}</span>
              <s class="course-price">￥{{item.price}}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
// import { getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContentList',
  props: {
    // 用于请求数据的函数
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  methods: {
    async onRefresh () {
      // 还原数据页数为 1
      this.currentPage = 1
      // 请求数据
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 如果存在数据，清空并课程数据，否则结束
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 1) {
        this.list = data.content
      } else {
        this.finished = true
      }
      // 提示
      this.$toast('刷新成功')
      // 关闭下拉提示框
      this.isRefreshing = false
    },
   async onLoad () {
     const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
         // 检测，如果没有数据了，结束，如果有，保存
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      } else {
        this.finished = true
      }
      // 下次请求下一页
      this.currentPage++
      this.loading = false
      // 数据加载完毕
      if (data.data && data.data.records &&data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>
<style lang="scss">
  .course-content-list {
    position: fixed;
    overflow-y: auto;
    left: 0;
    bottom: 0;
  }
  .van-cell__value {
    display: flex;
    height: 100px;
    padding: 10px 0;
  }
  .van-cell__value img {
    width: 75px;
    height: 100%;
    border-radius: 5px;
  }

  // 右侧内容区域 flex: 1 撑满父元素
  .course-info {
    flex: 1;
    height: 100%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
  }

  .course-info h3 {
    margin: 0;
    line-height: 24px;
  }

  .course-info .course-preview {
    flex-grow: 1;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
  }

  .course-info .price-container {
    margin: 0;
  }

  .course-info .course-discounts {
    color: #ff7452;
    font-size: 14px;
    margin: 0;
    margin-right: 5px;
  }
</style>