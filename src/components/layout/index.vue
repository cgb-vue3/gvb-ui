<template>
	<div class="common-layout">
		<el-container>
			<!--      侧边栏-->
			<el-aside
				:class="{ fold: layoutStore.isShowMenu }"
				class="w-[200px] bg-[#304156] transition-all duration-[600ms]">
				<Sidebar :menuList="menuList"></Sidebar>
			</el-aside>
			<el-container>
				<el-header><LayHeader></LayHeader></el-header>
				<el-main v-if="flag" class="comps_bg mt-[40px] overflow-hidden">
					<router-view v-slot="{ Component }">
						<transition appear mode="out-in" name="main">
							<keep-alive>
								<component :is="Component"></component>
							</keep-alive>
						</transition>
					</router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layout/SidebarMenu/index.vue'
import LayHeader from '@/components/layout/Header/index.vue'
import { LayoutStore } from '@/store/models/layout/index.ts'
import { ref, watch, nextTick } from 'vue'
defineProps({ menuList: Array })

const layoutStore = LayoutStore()
// 用于组件的销毁创建
const flag = ref(true)

// 监听刷新按钮是否点击，如果点击就销毁组件
watch(
	() => layoutStore.refresh,
	() => {
		flag.value = false
		nextTick(() => {
			flag.value = true
		})
	}
)
</script>
<style scoped lang="scss">
.fold {
	@apply w-[65px];
}

.main-enter-from {
	@apply -translate-x-[10%] opacity-0;
}
.main-leave-from,
.main-enter-to {
	@apply translate-x-0 opacity-100;
}
.main-leave-to {
	@apply translate-x-[10%] opacity-0;
}

.main-leave-active,
.main-enter-active {
	transition: all 500ms;
}
</style>
