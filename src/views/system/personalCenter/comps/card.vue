<template>
	<div class="w-[100%] h-[400px] bg-light_bg dark:bg-dark_comps_bg">
		<!--    top-start-->
		<div class="w-[100%] h-[100%] flex flex-col text-light_text dark:text-dark_text">
			<div class="w-[100%] h-[50%] flex flex-col items-center space-y-2 pt-4">
				<el-avatar
					v-if="userStore.userInfo.avatar == ''"
					:src="userStore.userInfo.avatar"
					:size="80">
					暂无头像
				</el-avatar>
				<el-avatar v-else :src="userStore.userInfo.avatar" :size="80"></el-avatar>
				<p class="text-2xl">{{ userStore.userInfo.nickname }}</p>
				<p>{{ userStore.userInfo.slogan }}</p>
			</div>
			<div class="w-[100%] h-[50%] flex flex-col items-center">
				<ul class="w-[80%] h-[100px] space-y-2">
					<li class="flex items-center space-x-1">
						<svg-icon name="sex" size="18"></svg-icon>
						<p>性别:</p>
						<p v-if="userStore.userInfo.sex == ''">暂未设置</p>
						<p v-else>{{ userStore.userInfo.sex }}</p>
					</li>
					<li class="flex items-center space-x-1">
						<svg-icon name="address" size="18"></svg-icon>
						<p>住址:</p>
						<p v-if="userStore.userInfo.addr == ''">暂未设置</p>
						<p v-else>{{ userStore.userInfo.addr }}</p>
					</li>
					<li class="flex items-center space-x-1">
						<svg-icon name="email" size="18"></svg-icon>
						<p>邮箱:</p>
						<p v-if="userStore.userInfo.email == ''">暂未设置</p>
						<p v-else>{{ userStore.userInfo.email }}</p>
					</li>
					<li class="flex items-center space-x-1">
						<svg-icon name="wechat" size="18"></svg-icon>
						<p>wechat:</p>
						<p v-if="userStore.userInfo.wechat == ''">暂未设置</p>
						<p v-else>{{ userStore.userInfo.wechat }}</p>
					</li>
				</ul>
			</div>
		</div>
		<!--    top-end-->
	</div>
</template>

<script setup lang="ts">
import { UserStore } from '@/store/models/user'

const userStore = UserStore()
</script>

<style scoped></style>
