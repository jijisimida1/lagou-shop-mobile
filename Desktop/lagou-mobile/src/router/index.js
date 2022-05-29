import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  // 首页（选课页）
  {
    path: '/',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
  },
  // 学习页
  {
    path: '/learn',
    name: 'Learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index'),
    meta: { requiresAuth: true }
  },
  // 用户页
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
    meta: { requiresAuth: true }
  },
  // 课程详情页
  {
    path: '/course-info/:courseId/',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info/index'),
    props: true
  },
  // 视频页
  {
    path: '/lesson-video/:lessonId/',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  // 支付页
  {
    path: '/pay/:courseId/',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay/index'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫进行登录检测与跳转
router.beforeEach((to, from, next) => {
  // 验证to路由是否进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证vuex的store中是否有用户信息
    if (!store.state.user) {
      // 未登录，跳转到登录页
      return next({
        name: 'login'
      })
    }
    // 已经登录，允许通过
    next()
  } else {
    next()
  }
})
export default router
