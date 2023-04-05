import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    // Auto import functions from Vue, e.g. ref, reactive, toRef...
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: ['vue'],

    // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    resolvers: [
      ElementPlusResolver(),

      // Auto import icon components
      // 自动导入图标组件
      IconsResolver({
        prefix: 'Icon',
      }),
    ],

    dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
  }),

  Components({
    resolvers: [
      // Auto register icon components
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep'],
      }),
      // Auto register Element Plus components
      // 自动导入 Element Plus 组件
      ElementPlusResolver(),
    ],

    dts: path.resolve(pathSrc, 'components.d.ts'),
  }),

  Icons({
    autoInstall: true,
  }),
  ],
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  server: {
    host: "localhost",
    https: false, // 是否启用https
    cors: true, // 为开发服务器配置cors，默认启用并允许任何源
    open: true, // 服务启动时自动在浏览器打开应用
    port: '8001',
    strictPort: false, // 设为true时端口被占用直接退出，不会尝试其他可用端口
    hmr: true,
    usePolling: true
  },
  build: {
    brotliSize: false, /* 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能 */
    outDir: 'dist', /* 指定输出路径 */
    cssCodeSplit: false, /* 整个项目中的所有 CSS 将被提取到一个 CSS 文件中 */
    chunkSizeWarningLimit: 1500, /* chunk 大小警告的限制（以 kbs 为单位） */
    sourcemap: false, /* 构建后是否生成 source map 文件 */
    manifest: true, /*  */
    assetsDir: 'static/img/', /* 指定生成静态资源的存放路径 */
    emptyOutDir: true, /* 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录 */
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name].[hash].js',
        entryFileNames: 'static/js/[name].[hash].js',
        assetFileNames: 'static/[ext]/[name].[hash].[ext]',
      },
    }
  }
})
