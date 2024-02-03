<template>
	<div class="myHeader_bg">
		<header class="fixed w-[100%] z-10">
			<Head />
		</header>
		<!--		<main-->
		<!--			class="myHeader_text max-w-screen-xl mx-auto min-h-screen border-[1px] border-t-0 border-light_border_text dark:border-dark_border_text shadow-md pt-[90px] overflow-x-hidden">-->
		<!--			<router-view v-slot="{ Component }">-->
		<!--				<transition appear mode="out-in" name="main">-->
		<!--					<keep-alive>-->
		<!--						<component :is="Component"></component>-->
		<!--					</keep-alive>-->
		<!--				</transition>-->
		<!--			</router-view>-->
		<!--		</main>-->

		<main class="myHeader_text h-screen pt-[90px]">
			<router-view :key="route.fullPath" v-slot="{ Component }">
				<transition appear mode="out-in" name="main">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</main>

		<!--    返回顶部按钮-->
		<div class="hidden lg:flex">
			<el-backtop :right="150" :bottom="100">
				<div
					style="
						height: 100%;
						width: 100%;
						background-color: var(--el-bg-color-overlay);
						box-shadow: var(--el-box-shadow-lighter);
						text-align: center;
						line-height: 40px;
						color: #1989fa;
					">
					UP
				</div>
			</el-backtop>
		</div>
		<div class="lg:hidden">
			<el-backtop :right="10" :bottom="100">
				<div
					style="
						height: 100%;
						width: 100%;
						background-color: var(--el-bg-color-overlay);
						box-shadow: var(--el-box-shadow-lighter);
						text-align: center;
						line-height: 40px;
						color: #1989fa;
					">
					UP
				</div>
			</el-backtop>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
import Head from '@/views/web/portal/comps/head.vue'
</script>

<style scoped></style>
