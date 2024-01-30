<template>
	<div
		class="w-[40px] h-[59px] text-light_text hover:bg-light_hover dark:text-dark_text dark:hover:bg-dark_hover flex justify-center items-center"
		@click="SwitchingTheme">
		<svg-icon v-if="themeStore.changeTheme" name="light"></svg-icon>
		<svg-icon v-else name="dark"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import { ThemeTypeStore } from '@/store/models/theme/index.ts'
const themeStore = ThemeTypeStore()

const SwitchingTheme = () => {
	let type
	themeStore.changeTheme = !themeStore.changeTheme
	if (themeStore.changeTheme) {
		type = 'light'
	} else {
		type = 'dark'
	}
	themeStore.changeThemeType_Fn(type)
}
</script>
