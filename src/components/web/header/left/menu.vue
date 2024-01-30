<template>
	<!--  抽屉-->
	<Gvb_drawer
		v-if="portalOption.PortalOption.drawerOption && visible.DrawerLabel == 'SwitchMenu'"
		:visible="visible.isDrawerVisible"
		:drawer-option="portalOption.PortalOption.drawerOption">
		<!--    菜单-->
		<ul class="myHeader_text">
			<template v-for="(item, index) in portalOption.PortalOption.menuOption" :key="index">
				<li @click="go(item.path)" class="my-1 text-xl">{{ item.name }}</li>
			</template>
		</ul>
	</Gvb_drawer>
	<!--  菜单按钮-->
	<div class="w-[100%] h-[100%] pl-3 flex justify-start items-center">
		<button @click="switchMenu">
			<svg-icon v-if="visible.isDrawerVisible.visible" name="openMenu" size="25"></svg-icon>
			<svg-icon v-else name="closeMenu" size="25"></svg-icon>
		</button>
	</div>
</template>
<script setup lang="ts">
import Gvb_drawer from '@/components/Gvb_comps/Gvb_drawer.vue'
import router from '@/router'
const p = defineProps(['visible', 'portalOption'])
const switchMenu = () => {
	p.visible.isDrawerVisible.visible = !p.visible.isDrawerVisible.visible
	if (p.visible.isDrawerVisible.visible) {
		p.visible.DrawerLabel = 'SwitchMenu'
	} else {
		p.visible.DrawerLabel = 'default'
	}
}

const go = (path) => {
	router.push(path)
	p.visible.isDrawerVisible.visible = !p.visible.isDrawerVisible.visible
}
</script>

<style scoped lang="scss"></style>
