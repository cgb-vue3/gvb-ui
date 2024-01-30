<template>
	<div>
		<template v-for="(item, index) in menuList" :key="index">
			<!--      菜单-->
			<el-menu
				:collapse="isCollapse"
				:default-active="$route.path"
				background-color="#304156"
				text-color="white"
				router
				class="border-0">
				<!--        一级菜单-->
				<el-menu-item v-if="!item.children" :index="item.path">
					<div>
						<!--            icon图标-->
						<svg-icon :name="item.meta.icon"></svg-icon>
					</div>
					<span class="menuTile">
						{{ item.meta.title }}
					</span>
				</el-menu-item>
				<!--				        二级菜单-->
				<el-sub-menu :index="item.path" v-if="item.children" :key="index">
					<template #title>
						<div>
							<!--            icon图标-->
							<svg-icon :name="item.meta.icon"></svg-icon>
						</div>
						<span class="menuTile">{{ item.meta.title }}</span>
					</template>

					<template v-for="(childItem, childIndex) in item.children" :key="childIndex">
						<el-menu-item :index="childItem.path">
							<div>
								<!--            icon图标-->
								<svg-icon :name="childItem.meta.icon"></svg-icon>
							</div>
							<span class="menuTile">{{ childItem.meta.title }}</span>
						</el-menu-item>
					</template>
				</el-sub-menu>
			</el-menu>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
defineProps({
	menuList: Array,
	isCollapse: {
		type: Boolean,
		default: false
	}
})

// 初始化route
const $route = useRoute()
</script>

<style scoped lang="scss">
.menuTile {
	@apply ml-[18px];
}
/*多级菜单的父菜单文字颜色跟随子菜单变化*/
:deep(.el-sub-menu.is-active > .el-sub-menu__title) {
	color: #409eff !important;
	border: none !important;
}
</style>
