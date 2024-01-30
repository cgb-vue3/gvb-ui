<template>
	<!--      右侧功能区-->
	<div class="w-[200px] h-[59px] flex justify-center items-center">
		<!--    功能区-->
		<div class="w-[120px] h-[59px] text-light_text flex justify-center items-center">
			<template v-for="item in LeftArea" :key="item.name">
				<div
					@click="events(item.event)"
					class="myHeader_text myHeader_hover w-[40px] h-[59px] flex justify-center items-center">
					<svg-icon :name="item.name"></svg-icon>
				</div>
			</template>
		</div>
		<!--    全屏-->
		<div
			class="myHeader_text myHeader_hover w-[40px] h-[59px] flex justify-center items-center"
			@click="fullScreen">
			<svg-icon v-if="layoutStore.isFullScreen" name="fangda"></svg-icon>
			<svg-icon v-else name="suoxiao"></svg-icon>
		</div>
		<!--    主题-->
		<div class="w-[20px] h-[60px]">
			<Gvb_theme />
		</div>
	</div>
	<div
		class="myHeader_btn_bg text-dark_text w-[100px] h-[80%] font-bold text-lg rounded-box flex justify-center items-center">
		{{ layoutStore.realTime }}
	</div>
	<!--	    个人中心-->
	<div class="w-[50px] h-[60px] flex justify-center items-center">
		<DropDownList :list="dropdownList" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutStore } from '@/store/models/layout/index.ts'
import { jumpUrl_Fn } from '@/pkg/jumpUrl.ts'
import { OutChain_Conf } from '@/config/index.ts'
import screenfull from 'screenfull'
import { UpErrorMessage_Fn } from '@/pkg/message.ts'
import { start, close } from '@/pkg/nprogress.ts'
import DropDownList from '@/components/layout/Header/HeaderRight/DropDownList/index.vue'
const layoutStore = LayoutStore()
// 控制放大缩小

// 左侧功能区
const LeftArea = ref([
	{ name: 'shuaxin', event: 'refresh' },
	{ name: 'github', event: 'goGithub' },
	{ name: 'gitee', event: 'goGitee' }
])
// 下拉数据
const dropdownList = ref([
	{ title: '进入前台', event: 'portal' },
	{ title: '退出登录', event: 'quit' }
])

const events = (event) => {
	if (event == 'refresh') {
		// 刷新网页
		start()
		layoutStore.RefreshPag_Fn()
		close()
	} else if (event == 'goGithub') {
		// 跳转github
		jumpUrl_Fn(OutChain_Conf.github)
	} else if (event == 'goGitee') {
		// 跳转gitee
		jumpUrl_Fn(OutChain_Conf.gitee)
	}
}
const fullScreen = () => {
	// 全屏
	// 判断该浏览器是否支持全屏
	if (!screenfull.isEnabled) {
		UpErrorMessage_Fn('该浏览器暂不支持全屏，请勿重试')
		return
	}
	layoutStore.isFullScreen = !layoutStore.isFullScreen
	screenfull.toggle()
}
</script>

<!--<style>-->
<!--.myTheme_textAndBgHover {-->
<!--	@layer text-light_text hover:bg-light_hover dark:text-dark_text dark:hover:bg-dark_hover;-->
<!--}-->
<!--</style>-->
