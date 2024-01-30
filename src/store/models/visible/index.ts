import { defineStore } from 'pinia'
import { ref } from 'vue'

export const VisibleStore = defineStore('VISIBLE', () => {
	// 抽屉是否显示
	const isDrawerVisible = ref({
		visible: false
	})
	// 嵌套抽屉显示
	const isNestDrawerVisible = ref({
		visible: false
	})
	// 对话框是否显示
	const isDialogVisible = ref({
		visible: false
	})
	// 对话框的label
	const DialogLabel = ref('default')
	// 抽屉的label
	const DrawerLabel = ref('default')
	// 嵌套抽屉的label
	const NestDrawerLabel = ref('default')

	return {
		isDialogVisible,
		isDrawerVisible,
		isNestDrawerVisible,
		DialogLabel,
		DrawerLabel,
		NestDrawerLabel
	}
})
