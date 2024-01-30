<template>
	<div>
		<template v-for="(item, index) in menuList" :key="index">
			<!--      菜单-->
			<el-menu
				:collapse="isCollapse"
				:default-active="$route.path"
				text-color="withe"
				background-color="#1D1E1F"
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

const $route = useRoute()
</script>

<style lang="scss">
.menuTile {
	@apply ml-[18px];
}
/*多级菜单的父菜单文字颜色跟随子菜单变化*/
:deep(.el-sub-menu.is-active > .el-sub-menu__title) {
	color: #409eff !important;
	border: none !important;
}

:deep(.el-menu) {
	border-right: none;
}

/*多级菜单弹出框样式修改*/
.el-menu.el-menu--popup.el-menu--popup-right-start {
	min-width: 120px !important;
	border: 0 !important;
}

/* 导航栏点击后,左边的颜色设置 */
.el-menu-item.is-active {
	border-left: solid 3px #6366f1;
}
</style>
