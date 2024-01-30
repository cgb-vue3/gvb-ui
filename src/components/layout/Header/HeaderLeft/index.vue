<template>
	<!--      菜单收缩按钮-->
	<div
		class="myHeader_text myHeader_hover w-[60px] h-[59px] mr-2 flex justify-center items-center"
		@click="closeOrShow">
		<!--        收缩-->
		<svg-icon v-if="!layoutStore.isShowMenu" name="menuShrinkage"></svg-icon>
		<!--        展开-->
		<svg-icon v-else name="menuExpansion"></svg-icon>
	</div>
	<!--      面包屑-->
	<div>
		<el-breadcrumb :separator-icon="ArrowRight">
			<transition-group name="breadcrumb">
				<template v-for="(item, index) in breads" :key="index">
					<el-breadcrumb-item>
						<span
							v-if="item.to == '/home'"
							class="myHeader_text font-bold"
							@click="breads.length > 1 && toHome(item.to)">
							{{ item.title }}
						</span>
						<span class="myHeader_secondary_text" v-else>
							{{ item.title }}
						</span>
					</el-breadcrumb-item>
				</template>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { LayoutStore } from '@/store/models/layout/index.ts'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import router from '@/router'
const layoutStore = LayoutStore()
const $route = useRoute()
interface tag_Type {
	to: string
	title: string
}

// 空数组，记录面包屑数据
const breads = ref()

// 路由发生变化是调用
watch(
	() => $route.matched,
	(router) => {
		// 定义一个数组里面包含了首页的信息,首页是固定项
		let temp: tag_Type[] = [{ to: '/home', title: '首页' }]
		router.some((item) => {
			const { meta, path } = item
			const { title } = meta
			if (path == '/layout' || path == '/home') return
			temp.push({
				to: path,
				title: title
			})
		})
		breads.value = temp
	},
	{
		immediate: true
	}
)

// 面包屑首页跳转
const toHome = (path: string) => {
	router.push(path)
}

const closeOrShow = () => {
	layoutStore.isShowMenu = !layoutStore.isShowMenu
}
</script>
<style scoped lang="scss">
/* 面包屑过渡动画 */
.breadcrumb-enter-active {
	transition: all 0.4s;
}

.breadcrumb-leave-active {
	transition: all 0.3s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(20px);
}

.breadcrumb-leave-active {
	position: absolute;
}
</style>
