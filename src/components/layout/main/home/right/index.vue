<template>
	<div class="w-[100%] h-[100%] flex flex-col justify-end">
		<div class="w-[100%] h-[15%] mb-4">
			<Info :userInfo="userInfo" />
		</div>
		<div class="w-[100%] h-[80%] p-4 rounded-box bg-light_bg dark:bg-dark_hover shadow-md">
			<Weather :weatherList="weatherList" />
		</div>
	</div>
</template>

<script setup lang="ts">
//bg-white rounded-2xl p-4 border-2 shadow-md hover:shadow-lg
import Info from '@/components/layout/main/home/right/info.vue'
import Weather from '@/components/layout/main/home/right/weather.vue'
defineProps(['weatherList', 'userInfo'])
</script>

<style scoped lang="scss"></style>
