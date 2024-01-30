import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
export const ThemeTypeStore = defineStore(
	'THEME',
	() => {
		// 记录主题颜色
		const themeType: Ref<string> = ref('light')
		// 控制主题icon显示
		const changeTheme: Ref<boolean> = ref(true)
		// 更改主题颜色
		const changeThemeType_Fn = (newTheme: string) => {
			themeType.value = newTheme
		}
		return {
			themeType,
			changeTheme,
			changeThemeType_Fn
		}
	},
	{
		persist: {
			enabled: true,
			strategies: [
				{
					key: 'themeType',
					storage: localStorage,
					path: 'themeType'
				},
				{
					key: 'changeTheme',
					storage: localStorage,
					path: 'changeTheme'
				}
			]
		}
	}
)
