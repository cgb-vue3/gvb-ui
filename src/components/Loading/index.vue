<template>
	<span v-show="isShow" :class="Type" class="loading mr-2"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	isShow: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: 'spinner'
		//   loading-spinner  转圈
		//   loading-ball 小球
		//  loading-bars 四边形
		//  loading-infinity 无限符号
		// loading-ring 下雨
		// loading-gif_ 缺口转圈
		// dots 三个球
	}
})
const Type = computed(() => `loading-${props.type}`)
</script>
