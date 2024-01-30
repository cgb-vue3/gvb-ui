<template>
	<div>
		<el-form label-position="right" ref="fromRef" :model="dialogOption">
			<template v-for="(item, index) in dialogOption.input" :key="index">
				<el-form-item
					:rules="rules[index].rule"
					:prop="`input.${item.label}`"
					:label-width="item.width">
					<template #label>
						<span class="dark:text-dark_text">
							{{ item.name }}
						</span>
					</template>
					<el-input
						:type="item.type"
						:show-password="item.label == 'password'"
						clearable
						:maxlength="item.maxlength"
						show-word-limit
						v-model.trim="item.data"
						:placeholder="item.placeholder"
						autocomplete="off" />
				</el-form-item>
			</template>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const fromRef = ref(null)
defineProps(['dialogOption', 'rules'])
defineExpose({ fromRef })
</script>
