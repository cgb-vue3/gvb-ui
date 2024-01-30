<template>
	<div class="w-[60px] h-[59px] dropdown dropdown-end dropdown-hover">
		<div class="w-[60px] h-[59px] flex justify-center items-center">
			<label tabindex="0">
				<el-avatar v-if="userStore.userInfo.avatar" :src="userStore.userInfo.avatar" />
				<el-avatar v-else>
					<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
				</el-avatar>
			</label>
		</div>
		<ul
			tabindex="0"
			class="dropdown-content myHeader_dropDown w-[120px] z-[1] menu p-2 shadow rounded-box">
			<template v-for="item in list" :key="item.title">
				<li @click="quit(item.event)" class="myHeader_dropDown_item">
					<a class="hover:text-primary">{{ item.title }}</a>
				</li>
			</template>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UpSuccessMessage_Fn } from '@/pkg/message.ts'
import { UserStore } from '@/store/models/user/index.ts'
import { LayoutStore } from '@/store/models/layout/index.ts'
const router = useRouter()
const layoutStore = LayoutStore()
const userStore = UserStore()
defineProps(['list'])

const quit = (e) => {
	if (e == 'myCenter') {
		// 去个人中心
		router.push('/myCenter')
	} else if (e == 'portal') {
		// 进图前台
		router.push('/portal')
	} else if (e == 'quit') {
		// 登出
		// 退出登录清除token和本地缓存
		userStore.Quit_Fn()
		router.push('/login')
		layoutStore.isShowMenu = false
		layoutStore.visitedViews = []
		UpSuccessMessage_Fn('退出成功', 1500)
	} else if (e == 'login') {
		// 去登录
		router.push('/login')
	} else if (e == 'register') {
		// 去注册
		router.push('/register')
	} else if (e == 'background') {
		// 去后台
		router.push('/home')
	}
}
</script>

<style scoped></style>
