<template>
  <Layout :loading="loading">
    <x-header :left-options="{showBack: false}" title="test">消息</x-header>
    <swipeout class="vux-1px-tb">
      <swipeout-item style="border-top: gray solid 1px" transition-mode="follow" v-for="notification in notifications"
                     :key="notification.notificationId">
        <div slot="right-menu">
          <swipeout-button type="primary" @click.native="updateNotificationReadStatuses(notification.notificationId)">
            设为已读
          </swipeout-button>
          <swipeout-button type="warn" @click.native="updateNotificationDeleteStatuses(notification.notificationId)">
            删除
          </swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          <h3>{{ notification.title }}</h3>
          <div>{{ notification.content }}</div>
        </div>
      </swipeout-item>
    </swipeout>
    <y-footer select="msg"></y-footer>
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
        notifications: [],// 消息列表
      }
    },
    methods: {
      getNotifications: function () {
        this.notifications = [];
        http.fetch(baseUrl + 'notifications?' + 'loginUserId=' + 'zhangsan').then(({data, message}) => {
          if (data.data) {
            this.notifications = data.data;
          }
        });
      },
      updateNotificationReadStatuses: function (notificationId) {
        http.edit(baseUrl + 'notificationReadStatuses',
          {
            notificationId: notificationId,
            loginUserId: 'zhangsan',
            readed: true
          }).then(({data, message}) => {
          this.getNotifications();
        });
      },
      updateNotificationDeleteStatuses: function (notificationId) {
        http.edit(baseUrl + 'notificationDeleteStatuses',
          {
            notificationId: notificationId,
            loginUserId: 'zhangsan',
            deleted: true
          }).then(({data, message}) => {
          this.getNotifications();
        });
      },
    },
    mounted() {
      window.setTimeout(() => {
        this.loading = false
      }, 1000);
      this.getNotifications();
    }
  }
</script>

<style scoped>
  .center {
    text-align: center;
    padding-top: 23px;
    color: #fff;
    font-size: 18px;
  }

  .center img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>

