<template>
	<nav class="relative myHeader_bg myHeader_text transition duration-300 shadow">
		<div class="container px-3 lg:py-4 lg:px-0 mx-auto">
			<div class="lg:flex lg:items-center lg:justify-between">
				<div class="flex items-center justify-between">
					<!--   log-start       -->
					<div @click="router.push('/portal')" class="hidden lg:flex lg:items-center lg:gap-1">
						<svg-icon name="log" size="40" />
						<span class="text-xl">Akita Planet</span>
					</div>
					<!--   log-end       -->
					<!-- Mobile menu button-start -->
					<div class="flex w-[25%] lg:hidden">
						<button
							@click="isOpen = !isOpen"
							type="button"
							class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
							aria-label="toggle menu">
							<svg
								v-if="!isOpen"
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
							</svg>

							<svg
								v-else
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<!-- Mobile menu button-end -->
					<!--          Mobile 功能区、下拉菜单-start-->

					<!--  Mobile log-start       -->
					<div
						@click="router.push('/portal')"
						class="lg:hidden flex justify-center items-center gap-1">
						<svg-icon name="log" size="30" />
						<span class="text-md">Akita Planet</span>
					</div>
					<!--  Mobile log-end       -->

					<div class="items-center w-[25%] flex lg:mt-0 lg:hidden">
						<Gvb_theme />
						<button v-if="!userStore.token" class="ml-2" @click="openDialog">登录</button>
						<drop-down-list v-else :list="list" />
					</div>
					<!--         Mobile 功能区、下拉菜单-ent-->
				</div>

				<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
				<div
					:class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']"
					class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out myHeader_bg lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
					<div class="relative mt-4 md:mt-0">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg class="w-5 h-5 text-light_text_secondary" viewBox="0 0 24 24" fill="none">
								<path
									d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"></path>
							</svg>
						</span>

						<input
							type="text"
							class="w-full py-2 pl-10 pr-4 myHeader_bg border-[1px] border-light_border_text dark:border-dark_border_text rounded-lg"
							placeholder="Search" />
					</div>
					<!--					<Gvb_theme class="ml-[-10px] flex lg:hidden" />-->

					<div class="flex flex-col lg:flex-row lg:items-center lg:mx-8">
						<template v-for="(item, index) in portalStore.PortalOption.menuOption" :key="index">
							<div
								@click="router.push(item.path)"
								class="px-3 flex items-center justify-center gap-1 w-[80px] py-2 mx-1 mt-2 text-gray-700 transition-colors duration-300 transform rounded-xl lg:mt-0 dark:text-gray-200 hover:bg-light_hover dark:hover:bg-dark_hover hover:border-b-2 border-transparent">
								<svg-icon :name="item.icon" />
								<span>{{ item.name }}</span>
							</div>
						</template>
					</div>
					<!--          功能区、下拉菜单-start-->
					<div class="items-center mt-4 lg:mt-0 hidden lg:flex">
						<Gvb_theme />
						<button v-if="!userStore.token" class="ml-2" @click="openDialog()">登录</button>
						<drop-down-list v-else :list="list" />
					</div>
					<!--          功能区、下拉菜单-ent-->
				</div>
			</div>
		</div>
	</nav>

	<div>
		<teleport to="body">
			<div v-if="isDialogOpen" class="dialog-container">
				<div class="modal-box py-6 bg-light_bg dark:bg-dark_comps_bg myHeader_text">
					<div class="flex justify-end"><button @click="closeDialog">关闭</button></div>
					<login />
				</div>
			</div>
		</teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Gvb_theme from '@/components/Gvb_comps/Gvb_theme.vue'
import { PortalStore } from '@/store/models/web/portal'
import router from '@/router'
import { UserStore } from '@/store/models/user'
import Login from '@/views/web/portal/comps/loginOrRegister.vue'
import DropDownList from '@/views/web/portal/comps/dropDownList.vue'
const isOpen = ref(false)
const portalStore = PortalStore()
const userStore = UserStore()
let list = ref([
	{ title: '进入后台', event: 'backstage' },
	{ title: '退出登录', event: 'quit' }
])
const isDialogOpen = ref(false)

const openDialog = () => {
	isDialogOpen.value = true
}

const closeDialog = () => {
	isDialogOpen.value = false
}

watch(
	() => userStore.token,
	() => {
		if (userStore.token !== '') {
			isDialogOpen.value = false
		}
	}
)
</script>

<style scoped lang="scss">
.dialog-container {
	position: absolute; /* 修改为 absolute */
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.5);
	z-index: 99; /* 设置一个较大的 z-index */
}

/* 给输入框设置一个较小的 z-index，确保在遮罩层之下 */
.dialog-container input {
	z-index: 1;
}
</style>
