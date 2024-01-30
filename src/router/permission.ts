// 路由权限判断登录
import router from '@/router/index.ts'
import { UserStore } from '@/store/models/user/index.ts'
import { NewRouteOne_Fn } from '@/pkg/newRouters.ts'
import { Get_Cookie, Remove_Cookie } from '@/pkg/token.ts'
import { UpErrorMessage_Fn } from '@/pkg/message.ts'
import { start, close } from '@/pkg/nprogress.ts'

// 前置路由守卫
router.beforeEach(async (to, from, next) => {
	const store = UserStore()
	const token: string | undefined = Get_Cookie('token')

	// token存在表示用户登录
	start()
	if (token) {
		// token存在有两种情况：
		// 1: 用户信息不存在，发起请求获取用户信息，并生成动态路由
		// 2: 用户信息存在，见下一个判断
		// store.menuList.length == 0
		if (store.menuList.length == 0) {
			try {
				// 获取用户信息成功，并添加动态路由
				const userData = await store.GetUserInfo_Fn()
				// 如果获取用户信息失败就清除token,然后跳到登录页
				if (userData == undefined) {
					Remove_Cookie('token')
					next('/login')
					return
				}
				// 处理后端返回的路由数据
				const NewRoutes = NewRouteOne_Fn(userData.data.menuList)
				// 将用户信息和路由信息添加到仓库中
				store.UpdateUserData_Fn(userData.data.userInfo, NewRoutes)
				// 遍历路由组
				const R = [
					...NewRoutes,
					{
						// 任意路由
						path: '/:pathMatch(.*)*',
						redirect: '/404',
						name: 'any',
						component: () => import('@/views/web/404/index.vue')
					}
				]
				// 动态添加路由组
				R.forEach((item) => {
					router.addRoute('layout', item)
				})
				next({ ...to })
			} catch (e) {
				// 获取用户信息失败，重新登录
				close()
				next('/login')
				return
			}
		} else {
			// token存在，路由信息存在。
			// 分三种情况：
			// 1：用户不允许去登录注册页，直接跳转首页
			// 2：如果要去的页面不存在，跳转到404
			// 3：如果以上情况都没法发送执行next()
			if (to.name === undefined) {
				close()
				next('/login')
				return
			} else if (to.path == '/login' || to.path == 'register' || to.path == 'lostPassword') {
				close()
				next('/home')
				return
			} else {
				// 如果不是去登录注册页直接放行
				next()
				return
			}
		}
	} else {
		// token不存在
		// 分三种情况
		// 1：如果要去的页面不存在直接去登录
		// 2：判断要去的界面是否需要登录。如果需要跳转到登录
		// 3：如果不需要执行next()
		if (to.name == undefined) {
			/*情况一*/
			UpErrorMessage_Fn('页面不存在，请重新登录')
			next('/login')
		} else if (to.matched.some((r) => r.meta?.requiresAuth)) {
			/*情况二*/
			UpErrorMessage_Fn('登录已过期，请重新登录')
			next('/login')
			return
		} /*情况三*/ else {
			next()
		}
	}
})

// 后置路由守卫
router.afterEach(() => {
	close()
})
