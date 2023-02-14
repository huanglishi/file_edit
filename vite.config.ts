import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir);
};
const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
  '@': pathResolve('src'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { alias },
   // 配置前端服务地址和端口
   server: {
    host:true,
    port: 8991,
    // 是否开启 https
    https: false,
     // 设置反向代理，跨域
    proxy: {
      '/api1': {
        // 后台地址
        target: 'http://127.0.0.1:8990/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api1/, '')
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

})
