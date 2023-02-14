// ./src/i18n/index.ts
import { createI18n } from 'vue-i18n';
// element-plus 的ui框架国际化语言配置
import zhCnLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';
// 自定义的语言配置
import nextZhCn from './lang/zh-cn';
import nextEn from './lang/en';
// 按照每个页面的语言配置
import loginZhcn from './pages/login/zh-cn';
import loginEn from './pages/login/en';

// 定义语言国际化内容 zh-cn en
const messages = {
	[zhCnLocale.name]: {
		...zhCnLocale,
		ismsg: { ...nextZhCn, ...loginZhcn },
	},
	[enLocale.name]: {
		...enLocale,
		ismsg: { ...nextEn, ...loginEn },
	},
};

export const i18n = createI18n({
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	locale: "zh-cn", // 采用全局参数配置初始化语言 项目中有`zh-cn`、`en`两种
	fallbackLocale: zhCnLocale.name,
	messages,
});
