<template>
	<el-main v-loading="loading" class="mainContainer flex flex-col justify-between">
		<!-- 上-start-->
		<div class="w-auto h-[40%] flex justify-between items-center bg-light_bg dark:bg-dark_comps_bg">
			<!-- 左-start-->
			<div
				class="w-[72%] h-[100%] p-4 text-light_text dark:text-dark_text flex flex-col justify-evenly">
				<div class="space-y-2">
					<p class="text-2xl">
						{{ Greeting_Fn() }}，{{ userStore.userInfo.nickname }}，{{ GetTransform_Fn() }}
					</p>
					<p class="">
						{{ GetWeek(weatherInfo.week) }},今日{{ weatherInfo.dayweather }}，{{
							weatherInfo.daypower
						}}℃，{{ GetWeatherMessage(weatherInfo.dayweather) }}
					</p>
					<div class="flex space-x-4">
						<p>总用户数 ({{ totalObj.userTotal }}位)</p>
						<p>总文章数 ({{ totalObj.articleTotal }}篇)</p>
						<p>总工作时长 ({{ CalculateDaysDifference(userStore.userInfo.CreatedAt) }}天)</p>
					</div>
				</div>
				<!--        导航-start-->
				<div class="w-[100%] h-[120px] border-t-[1px] pt-2">
					<p class="font-bold">快捷入口</p>
					<ul class="w-[100%] h-[100%] flex justify-evenly">
						<template v-for="(item, index) in userStore.menuList" :key="index">
							<!--							一级导航-->
							<li
								v-if="!item.children"
								@click="router.push(item.path)"
								class="w-[100px] h-[100px] cursor-pointer flex flex-col hover:bg-base-100 rounded-xl hover:shadow-xl justify-center items-center">
								<div class="btn bg-[#D2ECFF] hover:bg-[#D2ECFF]/80 w-[60px] h-[60px]">
									<svg-icon :name="item.meta.icon" size="40"></svg-icon>
								</div>
								<p class="h-[10px] my-1">{{ item.meta.title }}</p>
							</li>
							<!--              二级导航-->
							<template v-else v-for="(chilItem, chilIndex) in item.children" :key="chilIndex">
								<li
									@click="router.push(chilItem.path)"
									class="w-[100px] h-[100px] cursor-pointer flex flex-col hover:bg-base-100 rounded-xl hover:shadow-xl justify-center items-center">
									<div class="btn bg-[#D2ECFF] hover:bg-[#D2ECFF]/80 w-[60px] h-[60px]">
										<svg-icon :name="chilItem.meta.icon" size="40"></svg-icon>
									</div>
									<p class="h-[10px] my-1">{{ chilItem.meta.title }}</p>
								</li>
							</template>
						</template>
					</ul>
				</div>
				<!--        导航-end-->
			</div>
			<!-- 左-end-->
			<!-- 右icon图-start-->
			<div class="w-[28%] h-[100%] overflow-hidden flex items-center justify-center">
				<svg-icon v-if="themeStore.themeType == 'light'" name="work_light" size="450px"></svg-icon>
				<svg-icon v-else name="work_dark" size="450px"></svg-icon>
			</div>
			<!-- 右icon图-end-->
		</div>
		<!-- 上-end-->
		<!--  下-start-->
		<div class="w-auto h-[58%] bg-light_bg dark:bg-dark_comps_bg p-4">
			<div class="w-[100%] h-[100%] flex">
				<div id="bar" class="w-[60%] h-[100%]"></div>
				<div id="pie" class="w-[40%] h-[100%]"></div>
			</div>
		</div>
		<!--    下-end-->
	</el-main>
</template>

<script setup lang="ts">
//引入创建的echarts.ts文件
import echarts from './comps/echarts.ts'

import { ThemeTypeStore } from '@/store/models/theme'
import { UserStore } from '@/store/models/user'
import { GetTransform_Fn, Greeting_Fn } from '@/pkg/greeting.ts'
import request from '@/api/request.ts'
import { onMounted, ref, watch } from 'vue'
import { CalculateDaysDifference, GetWeek } from '@/pkg/time.ts'

import router from '@/router'
import { GaoDeWeather_Api, GetIp_Api } from '@/api/layout/home'
import { GaoDe } from '@/config'
import { GetWeatherMessage } from '@/pkg/getWeather.ts'
const themeStore = ThemeTypeStore()
const userStore = UserStore()
let loading = ref(false)
let totalObj = ref({})
let weatherInfo = ref({})
// 在组件中定义图表实例
let myBar
let myPie
// 获取总数
onMounted(() => {
	getTotal()
	getWeather()
	myBar = echarts.init(document.getElementById('bar'), 'light')
	myPie = echarts.init(document.getElementById('pie'), 'light')
	updateBar() // 初始加载柱状图表
	userPie()
})

// 获取总数
const getTotal = async () => {
	loading.value = true
	try {
		const res = await request.get('auth/v1/user_manage/getTotal')
		totalObj.value = res.data
		setTimeout(() => {
			loading.value = false
		}, 2000)
	} catch (e) {
		console.log(e)
	}
}

// 获取总数
const getWeather = async () => {
	loading.value = true
	try {
		const IP = await GetIp_Api({ key: GaoDe.key })

		try {
			const weather = await GaoDeWeather_Api({
				key: GaoDe.key,
				extensions: GaoDe.extensions,
				city: IP.data.city
			})
			weatherInfo.value = weather.data.forecasts[0].casts[0]
			console.log(weather)
		} catch (e) {
			console.log(e)
		}
		setTimeout(() => {
			loading.value = false
		}, 2000)
	} catch (e) {
		console.log(e)
	}
}

watch(
	() => themeStore.themeType,
	() => {
		myBar.dispose() // 销毁旧图表实例
		// 创建图表实例
		myBar = echarts.init(document.getElementById('bar'))
		myPie = echarts.init(document.getElementById('pie'))
		updateBar() // 重新加载图表
		userPie()
	}
)

const updateBar = () => {
	// 模拟数据：每周每天的文章数量
	// const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	const articleCounts = [20, 30, 15, 40, 25, 35, 10]

	// 设置图表配置
	myBar.setOption({
		color: themeStore.themeType === 'dark' ? ['#67C23A'] : ['#37A2DA'], // 指定 dark 主题下折线图的颜色
		title: {
			text: '文章数据'
		},
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			type: 'category',
			data: ['Golang', 'Java', '前端', 'PHP', '其它']
		},
		yAxis: {
			type: 'value',
			name: '文章数量'
		},
		series: [
			{
				name: '文章数量',
				type: 'bar',
				data: articleCounts
			}
		]
	})
}
const userPie = () => {
	myPie.setOption({
		title: {
			text: '用户数据'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		series: [
			{
				name: '用户性别分布',
				type: 'pie',
				radius: '50%',
				avoidLabelOverlap: false,
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '20',
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [
					{ value: 335, name: '男' },
					{ value: 310, name: '女' }
				]
			}
		]
	})
}
</script>

<style scoped></style>
