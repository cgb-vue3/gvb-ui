<template>
	<div
		class="w-[100%] border-[1px] border-t-0 border-light_border_text dark:border-dark_border_text myHeader_bg flex justify-center items-center">
		<el-pagination
			:small="store.small"
			:style="store.pagHeight"
			v-model:current-page="store.currentPage"
			v-model:page-size="store.pageSize"
			:page-sizes="store.sizes"
			background
			layout="total, sizes, prev, pager, next, jumper"
			:total="store.total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
	</div>
</template>

<script setup lang="ts">
const p = defineProps({
	store: {},
	getPag_Fn: {},
	small: {
		type: Boolean,
		default: false
	}
})
const handleSizeChange = () => {
	p.getPag_Fn()
}
const handleCurrentChange = () => {
	p.getPag_Fn()
}
</script>

<style scoped lang="scss"></style>
