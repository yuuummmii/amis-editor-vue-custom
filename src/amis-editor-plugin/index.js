import { registerRendererByType, registerAmisEditorPlugin } from './dist/index.esm.js'
import InforCard from './plugins/vue-widget/info-card.vue'
import InfoCardPlugin from './plugins/vue-widget/info-card-plugin'
registerAmisEditorPlugin(InfoCardPlugin)
registerRendererByType(InforCard, {
  type: 'vue-info-card',
  //渲染类型 renderer、formitem、options
  usage: 'renderer',
  weight: 99,
  framework: 'vue2'
})