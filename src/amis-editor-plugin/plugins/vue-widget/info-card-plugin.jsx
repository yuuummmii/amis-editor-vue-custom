/**
 * @file 编辑器扩展, 增加自定义组件
 */
export class InfoCardPlugin {
  // 关联渲染器名字
  rendererName = 'vue-info-card'
  $schema = '/schemas/UnkownSchema.json'
  // 组件名称（组件面板显示的Title）
  name = 'vue组件'
  description = '信息展示卡片'
  tags = ['自定义']
  icon = 'fa-solid fa-circle-info'
  scaffold = {
    type: 'vue-info-card',
    label: 'vue-info-card',
    name: 'vue-info-card',
    title: 'amis 是一个低代码前端框架，它使用 JSON 配置来生成页面，可以减少页面开发工作量，极大提升效率。',
    backgroundImage: 'https://search-operate.cdn.bcebos.com/64c279f23794a831f9a8e7a4e0b722dd.jpg',
    img_count: 3
  }
  previewSchema = {
    type: 'vue-info-card',
    label: 'vue-info-card',
    name: 'vue-info-card',
    title: 'amis 是一个低代码前端框架，它使用 JSON 配置来生成页面，可以减少页面开发工作量，极大提升效率。',
    backgroundImage: 'https://search-operate.cdn.bcebos.com/64c279f23794a831f9a8e7a4e0b722dd.jpg',
    img_count: 3
  }

  panelTitle = '配置'

  panelControls = {
    type: 'tabs',
    tabs: [
      {
        title: '属性',
        className: 'p-none m-none',
        controls: [
          {
            type: 'collapse',
            header: '数据',
            headingClassName: 'panel-control-header',
            controls: [
              {
                type: 'textarea',
                name: 'title',
                label: '卡片title',
                value: 'amis 是一个低代码前端框架，它使用 JSON 配置来生成页面，可以减少页面开发工作量，极大提升效率。'
              },
              {
                type: 'text',
                name: 'backgroundImage',
                label: '展示图片',
                value: 'https://search-operate.cdn.bcebos.com/64c279f23794a831f9a8e7a4e0b722dd.jpg'
              },
              {
                type: 'input-number',
                name: 'img_count',
                label: '图片数量',
                value: 3
              }
            ]
          }
        ]
      }
    ]
  }
}

export default InfoCardPlugin
