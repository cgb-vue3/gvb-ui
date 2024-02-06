<template>
	<div class="bg-light_bg dark:bg-dark_bg transition duration-300">
		<header class="fixed shadow-xl w-[100%] z-[999]">
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

		<main class="myHeader_text h-auto lg:h-auto pt-[60px] lg:pt-[90px]">
			<router-view :key="route.fullPath" v-slot="{ Component }">
				<transition appear mode="out-in" name="main">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</main>

		<!--    返回顶部按钮-->
		<div class="hidden w-36 lg:flex">
			<el-backtop :right="50" style="width: 40px" :bottom="100">
				<div
					class="w-36 bg-light_comps_bg dark:bg-dark_hover rounded-box"
					style="
						height: 100%;
						width: 100%;
						box-shadow: var(--el-box-shadow-lighter);
						text-align: center;
						line-height: 40px;
						color: #1989fa;
					">
					<svg-icon name="up" size="40" />
				</div>
			</el-backtop>
		</div>
		<div class="lg:hidden">
			<el-backtop :right="5" style="width: 30px; height: 30px" :bottom="100">
				<div
					class="bg-light_comps_bg dark:bg-dark_hover rounded-box"
					style="height: 100%; width: 100%; text-align: center; line-height: 40px; color: #1989fa">
					<svg-icon name="up" size="30" />
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
