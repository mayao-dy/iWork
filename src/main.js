// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/styles/reset.less'
Vue.config.productionTip = false

// 引入mint-ui全部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import { ToastPlugin, AlertPlugin,ConfirmPlugin,TransferDom,Popup} from 'vux';
Vue.use(ToastPlugin).use(AlertPlugin).use(ConfirmPlugin).use(Popup).use(TransferDom);
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
Vue.use(require('vue-wechat-title'))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
