<template>
	<div
		class="w-[100%] h-[100%] relative mb-4 bg-light_bg dark:bg-dark_hover shadow-md rounded-box flex justify-center items-end">
		<!--    头像-->
		<div class="absolute -top-[25%]">
			<el-avatar :size="60" :src="userInfo.avatar" />
		</div>
		<!--    文字部分-->
		<div class="w-[100%] h-[65%] text-light_text dark:text-dark_text">
			<!--      昵称-->
			<div class="w-[100%] h-[50%] text-[20px] font-bold flex justify-center items-center">
				{{ userInfo.nickname }}
			</div>
			<!--      简介-->
			<div
				class="w-[100%] h-[50%] text-neutral-500 dark:text-neutral-300 flex justify-center items-center">
				{{ userInfo.slogan }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps(['userInfo'])
// import { UserFilled } from '@element-plus/icons-vue'
</script>
