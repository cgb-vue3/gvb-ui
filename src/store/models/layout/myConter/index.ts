import { defineStore } from 'pinia'
import { ref } from 'vue'

export const CenterStore = defineStore('CENTER', () => {
	const dialogFormVisible = ref(false)

	return {
		dialogFormVisible
	}
})
