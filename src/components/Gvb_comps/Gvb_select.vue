<template>
	<div>
		<el-form class="dark:text-dark_text" ref="selectRef" :model="selectOptions">
			<template v-for="(item, index) in selectOptions" :key="index">
				<el-form-item :label-width="item.width">
					<template #label>
						<span class="dark:text-dark_text">
							{{ item.name }}
						</span>
					</template>
					<el-select
						:filterable="item.filterable"
						:allow-create="item.allowCreate"
						:clearable="item.clearable"
						:multiple="item.multiple"
						value-key="index"
						v-model="item.data"
						:placeholder="item.placeholder">
						<el-option
							v-for="(opItem, opIndex) in item.option"
							:key="opIndex"
							:label="opItem.label"
							:value="opItem.value" />
					</el-select>
				</el-form-item>
			</template>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
const selectRef = ref(null)
defineExpose({ selectRef })
interface selectOption_Type {
	label: string
	data: string
	placeholder: string
	width: string
	option: [{ value: string; label: string }]
}
defineProps({
	selectOptions: {
		type: Array as PropType<selectOption_Type[]>
	},
	rules: {}
})
</script>
