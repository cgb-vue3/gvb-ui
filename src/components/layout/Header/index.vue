<template>
	<!--	头部背景-->
	<div class="myHeader_bg flex flex-col justify-between">
		<div
			class="w-auto h-[60px] border-b-[1px] border-light_border_text dark:border-dark_border_text flex justify-between items-center">
			<!--    左侧-->
			<div class="max-w-[1000px] h-[60px] flex justify-center items-center">
				<Bread></Bread>
			</div>
			<!--    右侧-->
			<div class="w-[450px] h-[60px] flex justify-evenly items-center">
				<HeaderRight></HeaderRight>
			</div>
		</div>
		<!--    标签-->
		<div
			class="h-[40px] shadow-inner border-b-[1px] border-light_border_text dark:border-dark_border_text flex items-center">
			<div class="pl-[20px]">
				<Tags :tags="layoutStore.visitedViews" :path="$route.path"></Tags>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Bread from '@/components/layout/Header/HeaderLeft/index.vue'
import HeaderRight from '@/components/layout/Header/HeaderRight/index.vue'
import { LayoutStore } from '@/store/models/layout/index.ts'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
const $route = useRoute()
const layoutStore = LayoutStore()
// 监听路由
watch(
	() => $route.matched,
	(route) => {
		// 如果是404页面就不添加
		if ($route.path == '/404') return
		let tags = {}
		route.some((item) => {
			const { path, meta } = item
			const { title } = meta
			tags = {
				path,
				title
			}
		})
		layoutStore.AddTags_Fn(tags)
	},
	{ immediate: true }
)
</script>

<style scoped lang="scss"></style>
