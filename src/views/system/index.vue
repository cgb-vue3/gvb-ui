<template>
	<div>
		<!--    layout布局-->
		<Layout :menuList="menuList"></Layout>
	</div>
</template>

<script setup lang="ts">
import { UserStore } from '@/store/models/user'
import { LayoutStore } from '@/store/models/layout/index.ts'
import moment from 'moment'
const userStore = UserStore()
const menuList = userStore.menuList

const layoutStore = LayoutStore()
// 获取实时时间
setInterval(() => {
	layoutStore.realTime = moment(new Date()).format('HH:mm:ss')
}, 1000)
</script>
