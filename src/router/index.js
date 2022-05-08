import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    }, {
      path: '/home',
      name: 'home',
      component: () => import('@/views/layout.vue'),
      redirect: '/writeMail',
      children: [
        {
          path: '/writeMail',
          name: 'writeMail',
          component: () => import('@/components/writeMail.vue')
        },
        {
          path: '/getMail',
          name: 'getMail',
          component: () => import('@/components/mailList.vue')
        }
      ]
    }
  ],
})

export default router
