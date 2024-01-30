import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
// 标签类型
interface TAGS_Type {
	title: string
	path: string
}

export const LayoutStore = defineStore(
	'LAYOUT',
	() => {
		// 是否收缩菜单
		const isShowMenu: Ref<boolean> = ref(false)
		// 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
		const visitedViews = ref([{ title: '首页', path: '/home' }])
		// 控制网页的刷新
		const refresh: Ref<boolean> = ref(true)
		// 控制全屏
		const isFullScreen: Ref<boolean> = ref(true)
		// 实时时间
		const realTime = ref()

		// 添加标签
		const AddTags_Fn = (tags: TAGS_Type) => {
			// 如果tag存在就不添加
			if (visitedViews.value.some((i) => i.path === tags.path)) return
			visitedViews.value.push(tags)
		}
		// 删除标签
		const RemoveTag_Fn = (tag: TAGS_Type) => {
			visitedViews.value = visitedViews.value.filter((i) => i.title != tag.title)
		}
		// 控制页面刷新
		const RefreshPag_Fn = () => {
			refresh.value = !refresh.value
		}
		return {
			isShowMenu,
			visitedViews,
			refresh,
			realTime,
			isFullScreen,
			RemoveTag_Fn,
			AddTags_Fn,
			RefreshPag_Fn
		}
	},
	// 将数据存到本地，刷新不失效
	{
		persist: {
			enabled: true,
			strategies: [
				{
					key: 'isShowMenu',
					storage: localStorage,
					path: 'isShowMenu'
				},
				{
					key: 'isFullScreen',
					storage: localStorage,
					path: 'isFullScreen'
				},
				{
					key: 'realTime',
					storage: localStorage,
					path: 'realTime'
				},
				{
					key: 'visitedViews',
					storage: localStorage,
					path: 'visitedViews'
				}
			]
		}
	}
)
