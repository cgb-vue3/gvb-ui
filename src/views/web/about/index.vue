<template>
	<div class="bg-white py-6 sm:py-8 lg:py-12">
		<div class="mx-auto max-w-screen-2xl px-4 md:px-8">
			<!-- quote - start -->
			<div class="flex flex-col items-center gap-4 md:gap-6">
				<div class="flex flex-col items-center gap-3">
					<el-avatar :src="userStore.userInfo.avatar"></el-avatar>
					<span>{{ userStore.userInfo.nickname }}</span>
				</div>
				<div class="py-10">
					<span class="text-light_text_secondary">这里什么也没有...</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { UserStore } from '@/store/models/user'

const userStore = UserStore()
</script>

<style scoped lang="scss"></style>
