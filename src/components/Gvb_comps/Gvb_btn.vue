<template>
	<button :style="Btn_Style()">
		<slot />
	</button>
</template>
<script setup lang="ts">
const Props = defineProps({
	height: {
		type: String
	},
	width: {
		type: String
	},
	bg: {
		type: String,
		default: 'red'
	}
})
const Btn_Style = () => {
	return (
		'width:' + Props.width + '%;' + 'height:' + Props.height + '%;' + 'background-color:' + Props.bg
	)
}
</script>
