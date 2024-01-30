<template>
	<!--	容器-->
	<div class="w-[100%] h-[100%]">
		<!--    天气盒子-->
		<div class="w-[100%] h-[100%] text-dark_text bg-primary dark:bg-primary/30 rounded-box">
			<!--      上-->
			<div class="w-[100%] px-2 h-[10%] font-bold flex justify-center">
				<!--       当前位置-->
				<div class="w-[50%] h-[100%] flex justify-center items-center">
					<span class="px-2 text-[25px]">{{ weather.cityName }}</span>
					<span><svg-icon name="zuobiao" size="25px"></svg-icon></span>
				</div>
			</div>
			<!--      中-->
			<div class="h-[55%] flex">
				<!--        中右-天气-->
				<div class="w-[100%] h-[100%]">
					<!--         中上-->
					<div class="w-[100%] h-[70%] flex flex-col items-center">
						<!--            天气图标-->
						<div class="w-[100%] h-[40%] flex justify-center items-center">
							<svg-icon :name="current.icon" size="100px"></svg-icon>
						</div>
						<!--            日期、星期信息-->
						<div class="w-[50%] h-[30%] font-bold flex flex-col justify-evenly items-center">
							<div>Today</div>
							<!--							日期-->
							<div>{{ current.date }}</div>
							<!--              星期-->
							<div>{{ current.week }}</div>
						</div>

						<!--            度数-->
						<div class="w-[50%] h-[30%] font-bold flex justify-evenly items-center">
							<!--              最高气温-->
							<span class="text-[60px]">{{ current.maxTemp }}</span>

							<div
								class="w-[40px] h-[25px] bg-dark_hover text-sm rounded-box flex justify-center items-center">
								<!--              最低气温-->
								<span>{{ current.minTemp }}</span>
							</div>
						</div>
					</div>

					<!--          中下-->
					<div class="w-[100%] h-[30%] font-bold flex flex-col justify-center items-center">
						<!--            天气类型-->
						<div class="w-[40%] h-[60%] text-2xl flex justify-center items-center">
							<span class="text-[28px]">{{ current.weather }}</span>
						</div>
						<!--            风力信息-->
						<div class="w-[40%] h-[40%] flex justify-evenly items-center">
							<!--              风向-->
							<span>{{ current.wind }}</span>
							<span class="text-lg">|</span>
							<!--              风力-->
							<span>{{ current.power }}</span>
						</div>
					</div>
				</div>
			</div>
			<!--      下-预报天气-->
			<div class="w-[100%] h-[35%] font-bold flex justify-evenly items-center">
				<template v-for="item in futureWeather" :key="item.week">
					<div
						class="w-[30%] h-[90%] bg-dark_bg/70 dark:bg-dark_bg/50 rounded-badge flex flex-col justify-evenly items-center">
						<!--          星期-->
						<span class="text-lg">{{ item.week }}</span>
						<!--          天气类型-->
						<span>{{ item.weather }}</span>
						<!--          天气图标-->
						<div>
							<svg-icon :name="item.icon" size="40px"></svg-icon>
						</div>
						<!--         温度-->
						<div
							class="bg-warning_1/80 dark:bg-primary/50 text-sm rounded-box w-[60%] h-[20%] flex justify-center items-center">
							<span>{{ item.maxTemp }}/{{ item.minTemp }}</span>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps(['weatherList'])

const weather = props.weatherList
const current = weather.currentWeather
const futureWeather = weather.futureWeather
</script>
