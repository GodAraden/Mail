<template>
  <div class="container">
    <a-card title="邮箱登录" class="a-card">
      <template #extra><a href="#">关于</a></template>
      <a-form
        :model="formState"
        name="login"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        @finish="onFinish"
      >
        <a-form-item
          label="邮箱地址"
          name="address"
          :rules="[
            { required: true, message: '请输入邮箱地址!' },
            { type: 'email', message: '请输入合法的邮箱地址！' },
          ]"
        >
          <a-input v-model:value="formState.address">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="SMTP密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            登陆
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, defineComponent, computed } from 'vue'
import { login as apiLogin } from '@/api/mail.163.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const router = useRouter()
    const formState = reactive({
      address: '',
      password: '',
    })
    const onFinish = async (form) => {
      message.loading({
        content: '登陆中..',
        key: 'updatable',
      })
      const res = await apiLogin(form)
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
      router.push('/home')
    }
    const disabled = computed(() => {
      return !(formState.address && formState.password)
    })
    return {
      formState,
      onFinish,
      disabled,
    }
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
})
</script>

<style lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: center / cover
    url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgo.hackhome.com%2Fimg2021%2F10%2F27%2F11%2F7179285.jpg&refer=http%3A%2F%2Fimgo.hackhome.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654510608&t=58e4cda5dd9157ec4bbd6cc8f1321be3)
    no-repeat;
  .a-card {
    background-color: rgba(255, 255, 255, 0.94);
    width: 38.2vw;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-form-button {
      width: 100%;
    }
  }
}
</style>
