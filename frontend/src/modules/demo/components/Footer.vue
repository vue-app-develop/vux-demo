<template>
  <tabbar style="display: fixed" v-if="hackReset">
    <tabbar-item :selected="selected.msg" :link="{path: '/msg', replace: true}">
      <y-icon slot="icon" name="commenting-o" scale="1.8"></y-icon>
      <span slot="label">消息</span>
    </tabbar-item>
    <tabbar-item :selected="selected.work" :link="{path: '/work', replace: true}">
      <y-icon slot="icon" name="square-o" scale="1.8"></y-icon>
      <span slot="label">工作台</span>
    </tabbar-item>
    <tabbar-item :selected="selected.me" :link="{path: '/me', replace: true}">
      <y-icon slot="icon" name="user-o" scale="1.8" ></y-icon>
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
export default {
  props: ['select'],
  data () {
    return {
      hackReset: true,
    }
  },
  computed: {
    selected () {
      return {
        msg: this.select === 'msg',
        work: this.select === 'work',
        me: this.select === 'me',
      }
    }
  },
  activated () {
    this.hackReset = false
    this.$nextTick(() => {
      this.hackReset = true
    })
  }
}
</script>
