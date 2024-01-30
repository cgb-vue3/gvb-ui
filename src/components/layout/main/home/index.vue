<template>
	<!--	容器-->
	<div class="flex justify-end">
		<!--		左-->
		<div></div>
		<!--    右-->
		<div class="w-[400px] h-[100%]">
			<Right :weatherList="weatherList" :userInfo="userInfo" />
		</div>
	</div>
</template>
<script setup lang="ts">
import Right from '@/components/layout/main/home/right/index.vue'
defineProps(['weatherList', 'userInfo'])
</script>

<style scoped lang="scss"></style>
