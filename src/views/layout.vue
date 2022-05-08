<template>
  <a-layout class="layout-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div :class="!collapsed ? 'logo logo-bg' : 'logo logo-sm'" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        @select="selectMenuItem"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="writeMail">
          <edit-outlined />
          <span>写邮件</span>
        </a-menu-item>
        <a-menu-item key="getMail">
          <read-outlined />
          <span>读邮件</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <span class="user">
          欢迎！ {{ address }} &nbsp;|&nbsp;
          <span class="logout" @click="logout"> 登出 </span>
        </span>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  EditOutlined,
  ReadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import {
  logout as apiLogout,
  checkSession as apiGetAddress,
} from '@/api/mail.163.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const address = ref('')
    const router = useRouter()
    async function getAddress() {
      const res = await apiGetAddress()
      address.value = res.data.Msg
    }
    async function logout() {
      const res = await apiLogout()
      if (res.data.Code === 0) {
        message.success({
          content: res.data.Msg,
          key: 'updatable',
        })
      } else {
        message.error({
          content: res.data.Msg,
          key: 'updatable',
        })
      }
      router.push('/login')
    }
    function selectMenuItem(data) {
      router.push(data.key)
    }
    getAddress()
    return {
      address,
      logout,
      selectedKeys: ref(['writeMail']),
      collapsed: ref(false),
      selectMenuItem,
    }
  },
  components: {
    EditOutlined,
    ReadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
})
</script>

<style lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  .logo {
    height: 32px;
    background: center / contain url('@/assets/logo.png') no-repeat;
    margin: 10px 5px;
    padding: 21px 0;
  }
  .logo-sm {
    background-image: url('@/assets/logo-small.png');
  }
  .layout-header {
    background: #fff;
    padding: 0;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }
    .trigger:hover {
      color: #1890ff;
    }
    .user {
      float: right;
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      .logout:hover {
        cursor: pointer;
        color: #1890ff;
      }
    }
  }
  .layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}
</style>
