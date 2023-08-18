<template>
  <div>
    <Toast key="toast" position="top-right" theme="cxd" />
    <Alert key="alert" theme="cxd" />
    <editor id="amisEditor" :amisEnv="amisEnv" :theme="theme" :preview="isPreview" :isMobile="isMobile"
      @onChange="onChange" @onSave="onSave" :value="schema" :plugins="plugins"
      :showCustomRenderersPanel="showCustomRenderersPanel" />
  </div>
</template>
<script>
import { Editor } from 'amis-editor-core'
import { ReactInVue } from 'vuera'
import { ToastComponent, AlertComponent } from 'amis'
import amisEnv from './amisEnv'
export default {
  name: 'AmisEditor',
  components: {
    Toast: ReactInVue(ToastComponent),
    Alert: ReactInVue(AlertComponent),
    Editor: ReactInVue(Editor)
  },
  beforeCreate() { },
  props: {
    isPreview: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    showCustomRenderersPanel: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'cxd'
    },
    value: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      schema: {},
      amisEnv
    }
  },
  mounted() {
    this.schema = this.value
    this.amisEnv = amisEnv
    this.amisEnv.isPreview = this.isPreview
  },
  methods: {
    setSchema(obj) {
      this.schema = obj
    },
    getSchema() {
      return this.schema
    },
    onChange(e) {
      this.schema = e
      this.$emit('onChange', e)
    },
    onSave(e) {
      this.$emit('onSave', e)
    }
  },
  watch: {
    isPreview() {
      this.amisEnv.isPreview = this.isPreview
    }
  },
  beforeDestroy() {
    this.amisEnv.isPreview = false
  }
}
</script>
<style lang="scss">
@import './style.scss';

.editor-right-panel .editorPanel-tabs .editorPanel-tabs-header>li>a .editor-tab-icon>svg {
  font-size: 16px !important;
  width: 16px;
  height: auto;
  margin-bottom: 0 !important;
  color: #151b26;
}</style>
