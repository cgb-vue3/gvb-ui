import { RouteRecordRaw } from 'vue-router'

// 接受处理完的路由，类型为RouteRecordRaw[]
let newRoutes: RouteRecordRaw[] = []

// 处理一级路由
export const NewRouteOne_Fn = (menuList: object) => {
	// 清空newRoutes
	newRoutes = []
	const component = Component()
	// 遍历菜单
	for (const i in menuList) {
		// 遍历comps
		component.forEach((comps) => {
			// 判断菜单名和comps名是否相等
			// 一级路由
			if (menuList[i].name == comps.name) {
				// 判断菜单是否存在子菜单
				if (menuList[i].childMenu.length == 0) {
					newRoutes.push({
						path: '/' + menuList[i].path,
						name: menuList[i].name,
						meta: {
							title: menuList[i].title,
							icon: menuList[i].icon,
							sort: menuList[i].sort
						},
						component: comps.compsPath
					})
				} else {
					newRoutes.push({
						path: '/' + menuList[i].path,
						name: menuList[i].name,
						meta: {
							title: menuList[i].title,
							icon: menuList[i].icon,
							sort: menuList[i].sort
						},
						children: []
					})
				}
			}
		})
	}
	// 根据sort排序
	const len = newRoutes.length
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - 1 - i; j++) {
			if (newRoutes[j].meta.sort > newRoutes[j + 1].meta.sort) {
				;[newRoutes[j], newRoutes[j + 1]] = [newRoutes[j + 1], newRoutes[j]]
			}
		}
	}
	return NewRouteTwo_Fn(component, newRoutes, menuList)
}

// 处理二级路由
const NewRouteTwo_Fn = (component, newRoutes, menuList) => {
	newRoutes.forEach((r) => {
		if (r.children != undefined) {
			menuList.forEach((menu) => {
				if (r.name == menu.name) {
					menu.childMenu.forEach((child) => {
						component.forEach((comps) => {
							if (comps.name == child.name) {
								r.children.push({
									path: '/' + child.path,
									name: child.name,
									meta: {
										title: child.title,
										icon: child.icon,
										sort: child.sort
									},
									component: comps.compsPath
								})
							}
						})
					})
				}
			})
		}
	})
	return newRoutes
}

// 获取文件路径
const Component = () => {
	const pageComps = import.meta.glob('/src/views/system/**/**/index.vue')

	// 循环pageComps去除文件名
	const pathObj = []
	const one = []
	Object.entries(pageComps).forEach((item) => {
		const path = item[0]
		const name = item[0].replace('/src/views/system/', '').replace('/index.vue', '')
		const oneSplit = name.split('/')

		if (oneSplit.length != 1) {
			one.push(oneSplit[0])
		}

		pathObj.push({
			name,
			compsPath: pageComps[path]
		})
	})
	const n = Array.from(new Set(one))
	n.forEach((item) => {
		pathObj.push({
			name: item
		})
	})
	return pathObj
}
