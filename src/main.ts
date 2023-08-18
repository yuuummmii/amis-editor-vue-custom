import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import '@/css/style.scss'
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/amis-editor-plugin'
Vue.use(ElementUI)

import './assets/main.css'

new Vue({
  render: (h: any) => h(App),
  router,
  store
}).$mount('#app')
