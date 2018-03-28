<template>
  <Layout :loading="loading">
    <x-header :left-options="{showBack: false}" title="test">工作台</x-header>
    <div>
      <divider>{{ $t('title') }}</divider>
    </div>
    <y-footer select="work"></y-footer>
  </Layout>
</template>

<script>
  import Layout from '#/base_app/Layout.vue'
  import CheckUpdate from '#/base_app/components/CheckUpdate'
  import YFooter from '#/demo/components/Footer'
  import {Divider, Card} from 'vux'

  export default {
    name: 'work',
    components: {Layout, YFooter, CheckUpdate, Divider, Card},
    data() {
      return {
        loading: true,
      }
    },
    mounted() {
      window.setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-demo-flex span {
    color: #f74c31;
  }

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

