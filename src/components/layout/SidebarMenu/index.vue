<template>
	<div
		class="myMenu_text border-light_border_text dark:border-dark_border_text myMenu_bg border-r-[1px] h-screen overflow-hidden">
		<router-link to="/home">
			<div class="h-[60px] py-2 flex justify-start items-center">
				<div class="w-[40px] mx-[10px] h-[60px] flex justify-center items-center">
					<svg-icon name="log" size="50px"></svg-icon>
				</div>
				<span
					v-show="!layoutStore.isShowMenu"
					class="w-[120px] h-[60px] flex justify-center items-center font-mono tracking-wide antialiased text-2xl">
					{{ Sidebar_Conf.Title }}
				</span>
			</div>
		</router-link>
		<Gvb_menu :menuList="menuList" :isCollapse="layoutStore.isShowMenu"></Gvb_menu>
	</div>
</template>
<script lang="ts" setup>
import { Sidebar_Conf } from '@/config'
import { LayoutStore } from '@/store/models/layout/index.ts'
defineProps({
	menuList: Array
})
// 初始化仓库
const layoutStore = LayoutStore()
</script>
