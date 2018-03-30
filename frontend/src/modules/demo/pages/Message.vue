<template>
  <Layout :loading="loading">
    <!--<x-header :left-options="{showBack: false}" title="test">消息</x-header>-->
    <group label-width="5em" title="消息列表">
      <swipeout class="vux-1px-tb">
        <swipeout-item transition-mode="follow" v-for="notification in notifications"
                       :key="notification.notificationId" style="border-bottom: #E2DCDC 1px solid">
          <div slot="right-menu">
            <swipeout-button type="primary" @click.native="updateNotificationReadStatuses(notification.notificationId)">
              设为已读
            </swipeout-button>
            <swipeout-button type="warn" @click.native="updateNotificationDeleteStatuses(notification.notificationId)">
              删除
            </swipeout-button>
          </div>
          <div slot="content" style="height: 42px; padding: 12px; margin-left: 15px;">
            <p style="font-size: 16px;">{{ notification.title }}</p>
            <p style="font-size: 14px; color: rgb(102, 102, 102);">{{ notification.content }}</p>
          </div>
        </swipeout-item>
      </swipeout>
    </group>

    <group label-width="5em" title="交互">
      <divider>交互信息</divider>
      <cell title="当前用户名">
        <div>
          <span id="txtusername" name="txtusername" style="color: green"></span>
        </div>
      </cell>
      <cell title="当前token">
        <div>
          <textarea id="txttoken" name="txttoken" style="color: green" rows="8"></textarea>
        </div>
      </cell>
    </group>
    <divider>交互事件</divider>
    <cell>
    <x-button mini type="primary" onclick="RefreshPortPage();">刷新</x-button>
    <x-button mini type="warn" onclick="ClosePage();">关闭</x-button>
    </cell>
    <!--<y-footer select="msg">    footer>-->
  </Layout>
</template>

<script>
  import Layout from '#/base_app/Layout.vue'
  import CheckUpdate from '#/base_app/components/CheckUpdate'
  import YFooter from '#/demo/components/Footer'
  import {Divider} from 'vux'
  import * as http from '@/api/Http2'

  const baseUrl = process.env.API_ROOT

  export default {
    name: 'msg',
    components: {Layout, YFooter, CheckUpdate, Divider},
    data() {
      return {
        loading: true,
        notifications: [], // 消息列表
      }
    },
    methods: {
      getNotifications: function () {
        this.notifications = []
        http.fetch(baseUrl + 'notifications?' + 'loginUserId=' + 'zhangsan').then(({data, message}) => {
          if (data.data) {
            this.notifications = data.data
          }
        })
      },
      updateNotificationReadStatuses: function (notificationId) {
        http.edit(baseUrl + 'notificationReadStatuses',
          {
            notificationId: notificationId,
            loginUserId: 'zhangsan',
            readed: true
          }).then(({data, message}) => {
          this.getNotifications()
        })
      },
      updateNotificationDeleteStatuses: function (notificationId) {
        http.edit(baseUrl + 'notificationDeleteStatuses',
          {
            notificationId: notificationId,
            loginUserId: 'zhangsan',
            deleted: true
          }).then(({data, message}) => {
          this.getNotifications()
        })
      },
    },
    mounted() {
      window.setTimeout(() => {
        this.loading = false
      }, 1000)
      this.getNotifications()
      window.onload = function () {
        document.getElementById("txtusername").innerText = GetLoginUserId();
        document.getElementById("txttoken").innerText = GetToken();
      }
    }
  }
</script>

<style scoped>
</style>

