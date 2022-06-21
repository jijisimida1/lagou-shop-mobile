<template>
  <div class="home-nav">
    <!-- logo 区域 -->
    <img src="@/assets/logo.png" height="20" alt="">
    <!-- 搜索区域 -->
    <p class="search">
      <van-icon name="search" size="0.5rem" />
    </p>
    <!-- 分类跳转 -->
    <p>
      <van-icon name="coupon-o" />
    </p>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.home-nav {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-right: 10px;
  box-sizing: border-box;
  z-index: 1000;
  }
  .home-nav img {
    padding: 0 10px;
  }
  .search {
  background-color: #f7f7f7;
  width: 100%;
  border-radius: 25px;
  padding-left: 12px;
  margin-right: 10px;
  }
</style>