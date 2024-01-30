<template>
	<Gvb_table
		:store="articleListStore"
		:tableTitle="articleListStore.tableOption.title"
		:tableData="tableData">
		<template #default>无</template>
	</Gvb_table>
</template>

<script setup lang="ts">
const p = defineProps([
	'userStore',
	'userListStore',
	'visibleStore',
	'fromRef',
	'userInfo',
	'articleListStore'
])
interface tableData_Type {
	id: string
	title: string
	abstract: string
	banner: string
	category: string
	tags: string
	look: string
	commentCount: string
	like: string
	issueTime: string
}

// 表单数据
const tableData: tableData_Type[] = []

p.articleListStore.list.forEach((list: any) => {
	tableData.push({
		id: list.id,
		banner: list.banner,
		title: list.title,
		abstract: list.abstract,
		category: list.category,
		tags: list.tags,
		look: list.lookCount,
		commentCount: list.commentCount,
		like: list.likeCount,
		issueTime: list.issue
	})
})
</script>
