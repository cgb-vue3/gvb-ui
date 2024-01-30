<template>
	<el-dialog
		class="bg-light_bg dark:bg-dark_bg"
		width="500px"
		:center="IsCenter"
		v-model="visibleStore.visible">
		<!--    标题-->
		<template #header>
			<span class="dark:text-dark_text">{{ dialogOption.title }}</span>
		</template>
		<slot></slot>
		<template #footer>
			<span v-for="(item, index) in dialogOption.footer" :key="index">
				<button v-if="item.label == 'cancel'" class="cancelBtn" @click="cancel">
					{{ item.title }}
				</button>
				<button v-if="item.label == 'save'" @click="save()" class="primaryBtn ml-2">
					{{ item.title }}
				</button>
				<button v-if="item.label == 'submit'" @click="submit()" class="primaryBtn ml-2">
					{{ item.title }}
				</button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
const p = defineProps({
	visibleStore: {},
	// title是否居中
	IsCenter: {
		type: Boolean,
		default: false
	},
	dialogOption: {},
	// label位置
	LabelPosition: {
		type: String,
		default: 'left'
	}
})
const e = defineEmits(['submit', 'save'])
const submit = () => {
	e('submit')
}

const save = () => {
	e('save')
}
const cancel = () => {
	p.visibleStore.visible = false
}
</script>
<style></style>
