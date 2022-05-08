import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { checkSession } from '@/api/mail.163.js'

router.beforeEach(async (to, from, next) => {
  const res = await checkSession({})
  if (to.path !== '/login' && !res.data.Msg) {
    next({ path: '/login' })
  } else if (to.path === '/login' && res.data.Msg) {
    next({ path: '/home' })
  } else {
    next()
  }
})

createApp(App).use(router).use(Antd).mount('#app')