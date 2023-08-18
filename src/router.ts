import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/',
    component:() => import('@/components/amis-editor/PageEditor.vue')
  }
]
export default new Router({
  routes
})