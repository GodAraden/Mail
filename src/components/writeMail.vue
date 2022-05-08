<template>
  <a-form
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    name="formState"
    @finish="onFinish"
  >
    <a-form-item
      name="address"
      label="收件人"
      :rules="[{ required: true, message: '请填写收件人邮箱地址' }]"
    >
      <a-input
        v-model:value="formState.address"
        placeholder="不同收件人之间请以英文分号‘;’分隔"
      />
    </a-form-item>
    <a-form-item name="theme" label="主题">
      <a-input v-model:value="formState.theme" />
    </a-form-item>
    <a-form-item name="content" label="正文">
      <a-textarea
        v-model:value="formState.content"
        :autoSize="{ minRows: 6, maxRows: 14 }"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 4 }">
      <a-button type="primary" html-type="submit">发送</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { sendMail as apiSendMail } from '@/api/mail.163.js'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const formState = reactive({
      address: '',
      theme: '',
      content: '',
    })
    const onFinish = async (values) => {
      message.loading({
        content: '发送中..',
        key: 'updatable',
      })
      values.address = values.address.split(';')
      const res = await apiSendMail(values)
      if (res.data.Code === 0) {
        message.success({
          content: res.data.Msg,
          key: 'updatable',
        })
        formState.address = ''
        formState.theme = ''
        formState.content = ''
      } else {
        message.error({
          content: res.data.Msg,
          key: 'updatable',
        })
      }
    }
    return {
      formState,
      onFinish,
    }
  },
})
</script>
