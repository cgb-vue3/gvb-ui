<template>
	<!-- 容器-->
	<div
		class="myHeader_bg border-secondary dark:border-neutral border-[1px] w-[100%] h-[60px] overflow-hidden px-2 rounded-b-none">
		<div class="w-[100%] h-[60px] flex justify-start items-center">
			<!--    添加-->
			<button @click="showDialog()" class="w-[110px] h-[30px] m-2 primaryBtn">
				<span><svg-icon name="add" size="15"></svg-icon></span>
				添加用户
			</button>
			<!--			批量删除-->
			<button @click="remover" class="w-[110px] h-[30px] waringBtn m-2">
				<span><svg-icon name="remove" size="15"></svg-icon></span>
				批量删除
			</button>
			<!--     搜索 -->
			<!--			<div class="input-group font-mono w-[230px] h-[30px] flex justify-center items-center">-->
			<!--				<input type="text" placeholder="搜索用户名或昵称" class="input input-sm bg-[#F6F6F6]" />-->
			<!--				<button class="btn-square primaryBtn">-->
			<!--					<svg-->
			<!--						xmlns="http://www.w3.org/2000/svg"-->
			<!--						class="h-4 w-4 text-dark_text"-->
			<!--						fill="none"-->
			<!--						viewBox="0 0 24 24"-->
			<!--						stroke="currentColor">-->
			<!--						<path-->
			<!--							stroke-linecap="round"-->
			<!--							stroke-linejoin="round"-->
			<!--							stroke-width="2"-->
			<!--							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />-->
			<!--					</svg>-->
			<!--				</button>-->
			<!--			</div>-->
		</div>
	</div>
</template>
<script setup lang="ts">
import { VisibleStore } from '@/store/models/visible'
import { nextTick } from 'vue'
import { UpWarningMessage_Fn } from '@/pkg/message.ts'
const p = defineProps(['userManageStore', 'imageListStore', 'userListStore', 'fromRef'])
const visibleStore = VisibleStore()

const showDialog = () => {
	visibleStore.isDialogVisible.visible = true
	visibleStore.DialogLabel = 'addUser'
	nextTick(() => {
		p.fromRef.fromRef.resetFields()
	})
}
// 批量删除
const remover = async () => {
	if (p.userListStore.selectID.idList.length == 0) {
		UpWarningMessage_Fn('请选择需要删除的用户')
	} else {
		try {
			await p.userListStore.DelUser_Fn()
			p.userListStore.selectID.idList = []
			await p.userListStore.GetUserPagList_Fn()
		} catch (e) {
			return e
		}
	}
}
</script>
