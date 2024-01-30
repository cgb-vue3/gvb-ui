<template>
	<el-drawer
		class="bg-light_bg dark:bg-dark_bg"
		v-model="visible.visible"
		:append-to-body="appendToBody"
		:show-close="false"
		:size="drawerOption.size"
		:direction="drawerOption.direction"
		:close-on-click-modal="drawerOption.closeClickModal"
		:close-on-press-escape="drawerOption.closePressEscape"
		:with-header="true">
		<template #header>
			<div class="h-[30px] flex justify-between items-center">
				<span class="tileText">
					{{ drawerOption.title }}
				</span>
				<div>
					<template v-for="(item, index) in drawerOption.headersButton" :key="index">
						<button class="primaryBtn" @click="visible.visible = !visible.visible">
							{{ item.name }}
						</button>
					</template>
				</div>
			</div>
		</template>
		<template #default>
			<slot></slot>
		</template>
		<template #footer v-if="drawerOption.footer">
			<div class="h-[50px]">
				<template v-for="(item, index) in drawerOption.footer.btn" :key="index">
					<button v-if="item.label == 'finish'" class="primaryBtn" @click="finish">
						{{ item.name }}
					</button>
					<button v-if="item.label == 'clear'" @click="clear" class="ml-2 waringBtn">
						{{ item.name }}
					</button>
				</template>
			</div>
		</template>
	</el-drawer>
	<!--	    嵌套抽屉-->
	<div v-if="nestDrawerOption">
		<Gvb_drawer :visible="isNestDrawerVisible" :drawer-option="nestDrawerOption">
			<Gvb_upload @upload="upload" :upload-option="uploadStore" />
			<Gvb_imgList
				v-loading="!imageList.list"
				:image-list="imageList.list"
				:drawer-visible="drawerVisible"
				:image="imagePath" />
			<gvb_paging :store="imageList" :getPag_Fn="imageList.GetImagePagList_Fn" />
		</Gvb_drawer>
	</div>
</template>

<script lang="ts" setup>
import Gvb_imgList from '@/components/Gvb_comps/Gvb_imgList.vue'
import { nextTick } from 'vue'
import Gvb_upload from '@/components/Gvb_comps/Gvb_upload.vue'
const p = defineProps({
	visible: {},
	visibleStore: {},
	drawerOption: {},
	appendToBody: {
		type: Boolean,
		default: true
	},
	isNestDrawerVisible: {},
	nestDrawerOption: {},
	imageList: {},
	imagePath: {},
	drawerVisible: {},
	fromRef: {},
	uploadStore: {}
})
const e = defineEmits(['clear', 'upload'])
// 完成,打开对话框
const finish = () => {
	// p.visibleStore.NestDrawerLabel = 'articleBanner'
	// p.isNestDrawerVisible.visible = true
	p.visibleStore.isDialogVisible.visible = true
	nextTick(() => {
		p.fromRef.fromRef.clearValidate()
	})
}
const upload = (file) => {
	e('upload', file)
}

// 清空数据
const clear = () => {
	e('clear')
}
</script>
