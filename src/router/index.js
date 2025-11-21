import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExamList from '../views/ExamList.vue'
import ExamDetail from '../views/ExamDetail.vue'
import Vocabulary from '../views/Vocabulary.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '英语真题在线' }
  },
  {
    path: '/:examType',
    name: 'ExamList',
    component: ExamList,
    meta: { title: '真题列表' }
  },
  {
    path: '/:examType/:year/:paper',
    name: 'ExamDetail',
    component: ExamDetail,
    meta: { title: '真题详情' }
  },
  {
    path: '/vocabulary',
    name: 'Vocabulary',
    component: Vocabulary,
    meta: { title: '我的单词本' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 英语真题在线` : '英语真题在线'
  next()
})

export default router
