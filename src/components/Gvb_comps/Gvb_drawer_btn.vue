<template>
	<div>
		<template v-for="(item, index) in drawerBtn" :key="index">
			<el-form :label-width="item.width">
				<el-form-item required>
					<template #label>
						<span class="dark:text-dark_text">{{ item.name }}</span>
					</template>
					<button
						v-if="!imageStore.avatarPath"
						@click="openDrawer"
						class="my_avatar_div_border text-[12px] w-[150px] h-[150px] rounded-[6px] border-[2px] border-dashed flex justify-center items-center">
						<span>{{ item.placeholder }}</span>
					</button>
					<el-avatar
						@click="openDrawer"
						v-else
						shape="square"
						:size="150"
						:src="imageStore.avatarPath" />
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
const e = defineEmits(['openDrawer'])
// 参数类型
interface avatar_Type {
	name: string
	placeholder: string
	type: string
	width: string
}
defineProps({
	visibleStore: {},
	imageStore: {},
	drawerBtn: {
		type: Array as PropType<avatar_Type[]>
	}
})

// 打开抽屉,用于上传头像
const openDrawer = () => {
	e('openDrawer')
}
</script>

<style scoped></style>
