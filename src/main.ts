import { createApp } from 'vue'
import '/@/style/index.scss'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//编辑器使用UI
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import router from "./router";
import { i18n } from '/@/i18n/index';

const app = createApp(App);

app.use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(Antd).use(router).mount('#app')
