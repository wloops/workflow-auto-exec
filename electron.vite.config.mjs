import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// ArcoVue、VueUse 组件和指令的自动引入解析器
import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'
// icon 插件
import Icons from 'unplugin-icons/vite'
// icon 自动引入解析器
import IconsResolver from 'unplugin-icons/resolver'
// icon 加载 loader
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// Unocss 插件
import Unocss from 'unocss/vite'
// Unocss 默认预设
import presetUno from '@unocss/preset-uno'
// Unocss 属性模式预设
import presetAttributify from '@unocss/preset-attributify'
// Unocss 指令转换插件
import transformerDirective from '@unocss/transformer-directives'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // imports 指定自动引入的包位置（名）
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        eslintrc: {
          // 启用
          enabled: true,
          // 生成自动导入json文件位置
          filepath: './.eslintrc-auto-import.json',
          // 全局属性值
          globalsPropValue: true
        },
        resolvers: [ArcoResolver()]
      }),
      Components({
        // imports 指定组件所在目录，默认为 src/components
        dirs: ['src/components/', 'src/view/', 'src/layout'],
        // 需要去解析的文件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ArcoResolver({
            sideEffect: true
          }),
          VueUseComponentsResolver(),
          VueUseDirectiveResolver(),
          // icon组件自动引入解析器使用
          IconsResolver({
            // icon自动引入的组件前缀 - 为了统一组件icon组件名称格式
            prefix: 'icon',
            // 自定义的icon模块集合
            customCollections: ['user', 'home']
          })
        ]
      }),
      // Icon 插件配置
      Icons({
        compiler: 'vue3',
        customCollections: {
          // user图标集，给svg文件设置 fill="currentColor" 属性，使图标的颜色具有适应性
          user: FileSystemIconLoader('src/assets/svg/user', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
          // home 模块图标集
          home: FileSystemIconLoader('src/assets/svg/home', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          )
        },
        autoInstall: true
      }),
      // Unocss 插件配置
      Unocss({
        // 预设
        presets: [presetUno(), presetAttributify()],
        // 指令转换插件
        transformers: [transformerDirective()],
        // 自定义规则
        rules: []
      })
    ]
  }
})
