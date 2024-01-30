<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<transition-group name="breadcrumb">
			<template v-for="(item, index) in breads" :key="index">
				<el-breadcrumb-item>
					<span
						v-if="item.to == '/portal'"
						class="myHeader_text font-bold cursor-pointer"
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
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { ref, watch } from 'vue'
interface tag_Type {
	to: string
	title: string
}
const $route = useRoute()
// 空数组，记录面包屑数据
const breads = ref()
// 路由发生变化是调用
watch(
	() => $route.matched,
	(router) => {
		// 定义一个数组里面包含了首页的信息,首页是固定项
		let temp: tag_Type[] = [{ to: '/portal', title: '首页' }]
		router.some((item) => {
			const { meta, path } = item
			const { title } = meta
			if (path == '/' || path == '/portal') return
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
</script>

<style scoped lang="scss"></style>
