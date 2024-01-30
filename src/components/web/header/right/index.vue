<template>
	<!--      右侧功能区-->
	<div class="w-[100%] h-[100%] flex justify-end items-center">
		<!--    主题-->
		<Gvb_theme />
		<!--	    个人中心-->
		<DropDownList :list="list" />
	</div>
</template>

<script setup lang="ts">
import DropDownList from '@/components/layout/Header/HeaderRight/DropDownList/index.vue'
import { UserStore } from '@/store/models/user'
import { watch } from 'vue'
import { useRoute } from 'vue-router' // 下拉数据
const userStore = UserStore()
const route = useRoute()
let list = []

// 判断是否登录

watch(
	route,
	() => {
		if (userStore.token == undefined) {
			list = [
				{ title: '登录', event: 'login' },
				{ title: '注册', event: 'register' }
			]
			return
		}
		list = [
			{ title: '进入后台', event: 'background' },
			{ title: '退出登录', event: 'quit' }
		]
	},
	{
		immediate: true
	}
)
</script>
