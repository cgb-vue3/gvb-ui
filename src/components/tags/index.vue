<template>
	<el-tag
		v-for="tag in tags"
		:key="tag.title"
		:effect="tag.path == path ? 'dark' : 'plain'"
		class="mr-2 cursor-pointer"
		hit
		style="border: 0"
		:closable="tag.path != '/home'"
		@click="goTag(tag.path)"
		@close="closeTag(tag)">
		{{ tag.title }}
	</el-tag>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { LayoutStore } from '@/store/models/layout/index.ts'
defineProps(['tags', 'path'])
// 标签类型
interface TAGS_Type {
	title: string
	path: string
}
const router = useRouter()
const layoutStore = LayoutStore()
// 跳转
const goTag = (path: string) => {
	router.push(path)
}

// 关闭
const closeTag = (tag: TAGS_Type) => {
	// 如果删除的最后一个标签，在删除后让它自动跳转到前一个标签
	// 获取最后一个标签
	const lastTag = layoutStore.visitedViews.slice(-1)
	// 判断当前删除的是不是最后一位
	lastTag.forEach((item) => {
		if (item.title == tag.title) {
			// 获取最后一位的索引
			const lastIndex = layoutStore.visitedViews.lastIndexOf(
				item,
				layoutStore.visitedViews.length - 1
			)
			router.push(layoutStore.visitedViews[lastIndex - 1])
		}
	})
	layoutStore.RemoveTag_Fn(tag)
}
</script>
