import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', 'tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: "localhost",
    https: false, // 是否启用https
    cors: true, // 为开发服务器配置cors，默认启用并允许任何源
    open: true, // 服务启动时自动在浏览器打开应用
    port: '8080',
    strictPort: false, // 设为true时端口被占用直接退出，不会尝试其他可用端口
    hmr: true,
    usePolling: true
  },
})
