<template>
	<div
		class="w-[100%] h-[240px] mt-4 border-[1px] border-light_border_text dark:border-dark_border_text myHeader_bg flex flex-wrap justify-start">
		<template v-for="(item, index) in imageList" :key="index">
			<div class="w-[18%] h-[120px] ml-[9px] cursor-pointer flex justify-center items-center">
				<el-avatar @click="setAvatar(item)" shape="square" :size="100" :src="item.path"></el-avatar>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
const p = defineProps({
	imageList: {
		type: Array
	},
	flag: {
		type: Boolean
	},
	image: {},
	drawerVisible: {}
})

const setAvatar = (item) => {
	p.image.avatarPath = item.path
	p.drawerVisible.visible = false
}
</script>

<style scoped lang="scss"></style>
