import { defineStore } from 'pinia'
import { ref } from 'vue'

export const PortalStore = defineStore('PORTAL', () => {
	const PortalOption = ref({
		//首页菜单抽屉配置
		drawerOption: {
			// title: '添加文章',
			headersButton: [{ label: 'close', name: '关闭' }],
			size: '200px',
			type: 'addArticle',
			closeClickModal: true,
			closePressEscape: false,
			direction: 'ltr'
		},
		//菜单配置
		menuOption: [
			{ name: '首页', label: 'portal', path: '/portal' },
			// { name: '我的文章', label: 'myArticle', path: '/myArticle' }
			// { name: '分类', label: 'class', path: '/class' },
			{ name: '关于', label: 'about', path: '/about' }
		]
	})
	return { PortalOption }
})
