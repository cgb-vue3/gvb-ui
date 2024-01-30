// 配置路由
export const Routers = [
	{
		// 后台
		path: '/layout',
		name: 'layout',
		component: () => import('@/views/system/index.vue'),
		redirect: '/home',
		meta: {
			requiresAuth: true, // 为true需要登录
			icon: 'akita'
		}
	},
	{
		// 前台
		path: '/',
		name: 'web',
		redirect: '/portal',
		component: () => import('@/views/web/index.vue'),
		children: [
			{
				// 首页
				path: '/portal',
				name: 'portal',
				meta: {
					title: '首页'
				},
				component: () => import('@/views/web/portal/index.vue')
			},
			{
				// 关于
				path: '/about',
				name: 'about',
				meta: {
					title: '关于'
				},
				component: () => import('@/views/web/about/index.vue')
			},
			// {
			// 	// 我的文章
			// 	path: '/myArticle',
			// 	name: 'myArticle',
			// 	meta: {
			// 		title: '我的文章'
			// 	},
			// 	component: () => import('@/views/web/myArticle/index.vue')
			// },
			{
				// 文章详情
				path: '/articleDetails',
				name: 'articleDetails',
				meta: {
					title: '文章详情'
				},
				component: () => import('@/views/web/articleDetails/index.vue')
			}
		]
	},
	{
		// 登录
		path: '/login',
		name: 'Login',
		component: () => import('@/views/web/login/index.vue')
	},
	{
		// 注册
		path: '/register',
		name: 'Register',
		component: () => import('@/views/web/register/index.vue')
	},
	{
		// 忘记密码
		path: '/lostPassword',
		name: 'LostPassword',
		component: () => import('@/views/web/lostPassword/index.vue')
	},
	{
		// 404
		path: '/404',
		name: '404',
		component: () => import('@/views/web/404/index.vue')
	}
]
