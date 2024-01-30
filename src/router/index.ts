// 引入路由
import { createRouter, createWebHashHistory } from 'vue-router'
import { Routers } from '@/router/routers.ts'

// 创建路由示例并传递routers配置
const Router = createRouter({
	// 路由模式
	history: createWebHashHistory(),
	routes: Routers,
	// 滚动条
	scrollBehavior() {
		return {
			left: 0,
			top: 0
		}
	}
})
// 导出路由
export default Router
