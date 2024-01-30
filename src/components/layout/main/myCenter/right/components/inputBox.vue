<template>
	<Dialog :title="item.title">
		<el-form label-position="left" label-width="80px" style="max-width: 450px">
			<el-form-item :label="dialogConf.name">
				<el-input />
			</el-form-item>
		</el-form>
		<!--		<template #footer>-->
		<span class="dialog-footer">
			<el-button @click="centerStore.dialogFormVisible = false">Cancel</el-button>
			<el-button type="primary" @click="centerStore.dialogFormVisible = false">Confirm</el-button>
		</span>
		<!--		</template>-->
	</Dialog>
</template>
<script setup lang="ts">
defineProps({
	dialogConf: {
		type: Object
	},
	item: {
		type: Object
	}
})
</script>
