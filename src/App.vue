<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { ThemeTypeStore } from '@/store/models/theme/index.ts'
import { watch } from 'vue'
const themeStore = ThemeTypeStore()

// 初始化主题颜色
document.documentElement.classList.add(themeStore.themeType)
// 监听主题变化
const changeTheme = () => {
	watch(
		() => themeStore.themeType,
		(themeType) => {
			// 判断传入的主题
			if (themeType == 'dark') {
				document.documentElement.classList.remove('light')
				document.documentElement.classList.add(themeType)
			} else {
				document.documentElement.classList.remove('dark')
				document.documentElement.classList.add(themeType)
			}
		}
	)
}
changeTheme()
</script>

<style scoped></style>
