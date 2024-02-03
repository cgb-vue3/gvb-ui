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
			{ name: '首页', icon: 'portal', path: '/portal' },
			{ name: '发现', icon: 'found', path: '#', children: [{}] },
			{ name: '关于', icon: 'about', path: '/about' }
		]
	})
	return { PortalOption }
})
