<template>
	<!--	头部背景-->
	<div
		class="myHeader_bg border-light_border_text dark:border-dark_border_text border-b-[1px] shadow-md myHeader_text">
		<!--	左留白-->
		<div />
		<div class="max-w-screen-xl mx-auto flex flex-col justify-center items-stretch">
			<div class="flex justify-between items-center">
				<!--      b端左侧-->
				<div class="w-[100px] h-[60px] hidden md:flex md:w-[200px]">
					<left />
				</div>
				<!--      m端左 -->
				<div class="w-[100px] h-[60px] md:hidden">
					<contreMenu :portalOption="portalStore" :visible="visibleStore" />
				</div>
				<!--      m端中-->
				<div class="md:hidden">
					<left />
				</div>
				<!--        b端中-->
				<div class="hidden md:flex">
					<contre :menu="portalStore.PortalOption.menuOption" />
				</div>
				<!--      右侧-->
				<div class="w-[100px] h-[60px] md:w-[200px]">
					<!--    b端显示头像，功能区    -->
					<right />
				</div>
			</div>
			<div class="m-2"><Gvb_breads /></div>
		</div>
		<!--    右留白-->
		<div />
	</div>
</template>

<script setup lang="ts">
import left from '@/components/web/header/left/index.vue'
import contreMenu from '@/components/web/header/left/menu.vue'
import right from '@/components/web/header/right/index.vue'
import { VisibleStore } from '@/store/models/visible'
import { PortalStore } from '@/store/models/web/portal'
const visibleStore = VisibleStore()
const portalStore = PortalStore()
</script>

<script setup lang="ts"></script>

<style scoped></style>
