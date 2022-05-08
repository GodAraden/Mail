<template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <div
        v-if="column.key === 'from'"
        @click="showModal(record)"
        class="dataItem"
      >
        {{ record.From }}
      </div>
      <div
        v-if="column.key === 'subject'"
        @click="showModal(record)"
        class="dataItem"
      >
        {{ record.Subject }}
      </div>
      <div
        v-if="column.key === 'to'"
        @click="showModal(record)"
        class="dataItem"
      >
        {{ record.To }}
      </div>
    </template>
  </a-table>
  <a-modal
    v-model:visible="visible"
    width="61.8vw"
    title="邮件详情"
    cancelText=" "
    okText="好的"
    @ok="handleOk"
  >
    <p>发件人：{{ email.From }}</p>
    <p>主题：{{ email.Subject }}</p>
    <p>
      正文：<br />
      <pre v-html="email.Content"></pre>
    </p>
    <p>收件人：{{ email.To }}</p>
  </a-modal>
</template>

<script>
import { getMails as apiGetMails } from '@/api/mail.163.js'
import { message } from 'ant-design-vue'
import { ref } from '@vue/reactivity'

const columns = [
  {
    title: '发信人',
    dataIndex: 'From',
    key: 'from',
  },
  {
    title: '主题',
    dataIndex: 'Subject',
    key: 'subject',
  },
  {
    title: '收信人',
    dataIndex: 'To',
    key: 'to',
  },
]

export default {
  setup() {
    const data = ref([])
    const email = ref({})
    const visible = ref(false)
    const getMails = async () => {
      message.loading({
        content: '收取中..',
        key: 'updatable',
      })
      const res = await apiGetMails()
      if (res.data.Code === 0) {
        data.value = res.data.Msg.reverse()
        message.success({
          content: '收取完成',
          key: 'updatable',
        })
      } else {
        message.error({
          content: res.data.Msg,
          key: 'updatable',
        })
      }
    }
    const showModal = (record) => {
      email.value = record
      visible.value = true
    }
    const handleOk = () => {
      email.value = {}
      visible.value = false
    }
    getMails()
    return {
      data,
      columns,
      visible,
      email,
      showModal,
      handleOk,
    }
  },
}
</script>

<style lang="scss">
.dataItem {
  user-select: none;
}
.dataItem:hover {
  cursor: pointer;
}
</style>
