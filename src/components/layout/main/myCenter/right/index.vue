<template>
	<div class="w-[70%] h-[50%] ml-3 p-4">
		<!--    标题-->
		<div class="w-[100] h-[8%] flex items-center">
			<span class="w-[100%] z-10 h-[100%] text-blue-600 flex justify-start items-center">
				基本信息
			</span>
		</div>
		<!--    用户信息-->
		<template v-for="(item, index) in info" :key="index">
			<!--			<mInput :dialogConf="dialogConf" :item="item" />-->
			<div class="w-[100] h-[20%] flex flex-col border-t-2 -mt-[1px] border-gray-200">
				<!--      信息名-->
				<div class="w-[100%] h-[50%] font-bold flex items-center">{{ item.name }}</div>
				<!--      信息详情-->
				<div class="w-[100%] h-[50%] text-gray-400 flex justify-between items-center">
					<!--        信息-->
					<span>{{ item.data }}</span>
					<!--        信息修改-->
					<div class="text-blue-600" @click="a(item)">立即修改</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { CenterStore } from '@/store/models/layout/myConter/index.ts'
import { UserStore } from '@/store/models/user/index.ts'
import { ref } from 'vue'
const userStore = UserStore()
const userInfo = userStore.userInfo
const centerStore = CenterStore()
// diaLog配置信息
const dialogConf = ref()
const a = (item) => {
	centerStore.dialogFormVisible = true
	dialogConf.value = item
}
const info = ref([
	{
		title: '修改昵称',
		name: '昵称',
		data: userInfo.nickname
	},
	{
		title: '修改性别',
		name: '性别',
		data: userInfo.sex
	},
	{
		title: '修改地址',
		name: '地址',
		data: userInfo.addr
	},
	{
		title: '修改邮箱',
		name: '邮箱',
		data: userInfo.email
	},
	{
		title: '修改手机号',
		name: '手机号',
		data: userInfo.phone
	},
	{
		title: '修改微信号',
		name: '微信号',
		data: userInfo.wechat
	},
	{
		title: '修改头像',
		name: '头像',
		data: userInfo.avatar
	}
])
</script>
<style scoped>
/*.tieku {
	@apply border-t-2 -mt-[1.5px] border-gray-400;
}*/
</style>
