<template>
  <div id="Editor">
    <div class="Editor-Demo">
      <div class="Editor-header">
        <div class="Editor-title">可视化编辑</div>
        <div class="Editor-header-actions">
          <shortcut-key />
          <button class="header-action-btn margin-left-space" @click="preview">{{ isPreview ? '编辑' : '预览' }}</button>
          <button class="header-action-btn" @click="onSave">保存</button>
          <button class="header-action-btn exit-btn" @click="quit">退出</button>
        </div>
      </div>
      <div class="Editor-inner">
        <amis-editor id="editorName" theme="cxd" className="is-fixed" :isPreview="isPreview" :isMobile="isMobile"
          @onChange="onChange" :value="schema" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AmisEditor from '@/components/amis-editor/amis-editor.vue'
import { ShortcutKey } from 'amis-editor'
import { ReactInVue } from 'vuera'
@Component({
  components: {
    AmisEditor,
    ShortcutKey: ReactInVue(ShortcutKey)
  }
})
export default class PageEditor extends Vue {
  isPreview = false
  isMobile = false
  schema = JSON.parse(sessionStorage.getItem('pageSchema') || '{}')
  preview() {
    this.isPreview = !this.isPreview
  }
  onChange(e: any) {
    console.log('onchange', e)
    if (e.body) {
      this.schema = e
    }
  }
  onSave(e: any) {
    sessionStorage.setItem('pageSchema', JSON.stringify(this.schema))
  }
  quit() {
  }
  beforeRouteEnter(to: any, from: any, next: any) {
    let data = {
      type: 'page',
      body: [
        {
          type: 'tpl',
          tpl: '这是你刚刚新增的页面'
        }
      ]
    }
    sessionStorage.setItem('pageSchema', JSON.stringify(data))
    next()
  }
}
</script>

<style lang="scss" ref="stylesheet/scss">
@import './style.scss';

.editor-right-panel .editorPanel-tabs .editorPanel-tabs-header>li>a .editor-tab-icon>svg {
  font-size: 16px !important;
  width: 16px;
  height: auto;
  margin-bottom: 0 !important;
  color: #151b26;
}

#Editor {
  width: 100%;
  height: 100%;

  .ae-Editor {
    height: 95vh;
  }
}

#AmisShortcutKey {
  height: 16px;
}

#webpack-dev-server-client-overlay-div {
  display: none;
}
</style>
