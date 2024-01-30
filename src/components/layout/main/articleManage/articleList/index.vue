<template>
	<div class="mainContainer">
		<!--    抽屉-->
		<Gvb_drawer
			v-if="drawerOption && visibleStore.DrawerLabel == 'addArticle'"
			@upload="upload"
			@clear="clear"
			:from-ref="fromRef"
			:visible="visibleStore.isDrawerVisible"
			:is-nest-drawer-visible="visibleStore.isNestDrawerVisible"
			:nest-drawer-option="nestDrawerOption"
			:visible-store="visibleStore"
			:image-list="imageListStore"
			:image-path="addArticleStore.addArticleOption.dialogOption"
			:drawer-visible="visibleStore.isNestDrawerVisible"
			:drawer-option="drawerOption"
			:uploadStore="uploadStore.uploadOption.banner">
			<Gvb_editor></Gvb_editor>
		</Gvb_drawer>
		<!--    对话框-->
		<Gvb_dialog
			@save="save"
			@submit="submit"
			:dialogOption="addArticleStore.addArticleOption.dialogOption"
			:visible-store="visibleStore.isDialogVisible">
			<Gvb_from
				ref="fromRef"
				:dialog-option="addArticleStore.addArticleOption.dialogOption"
				:rules="addArticleRules" />
			<Gvb_select
				ref="selectRef"
				:rules="addArticleSelectRules"
				:select-options="addArticleStore.addArticleOption.dialogOption.select.options" />
			<Gvb_drawer_btn
				@openDrawer="openDrawer"
				:drawer-btn="addArticleStore.addArticleOption.dialogOption.banner"
				:image-store="addArticleStore.addArticleOption.dialogOption" />
		</Gvb_dialog>
		<myTop @remover="remover" :visible-store="visibleStore" :add-article-store="addArticleStore" />
		<my_table
			v-loading="!articleListStore.list"
			v-if="flag && articleListStore.list"
			:articleListStore="articleListStore" />
		<my_paging :store="articleListStore" :getPag_Fn="articleListStore.GetArticleList_Fn" />
	</div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import Gvb_drawer from '@/components/Gvb_comps/Gvb_drawer.vue'
import Gvb_dialog from '@/components/Gvb_comps/Gvb_dialog.vue'
import Gvb_from from '@/components/Gvb_comps/Gvb_from.vue'
import Gvb_select from '@/components/Gvb_comps/Gvb_select.vue'
import Gvb_drawer_btn from '@/components/Gvb_comps/Gvb_drawer_btn.vue'
import myTop from '@/components/layout/main/articleManage/articleList/top/index.vue'
import my_table from '@/components/layout/main/articleManage/articleList/table/index.vue'
import my_paging from '@/components/layout/main/articleManage/articleList/paging/index.vue'

import {
	addArticleRules,
	addArticleSelectRules,
	ReceptionFormData_Fn
} from '@/components/layout/main/userManage/validation/userManageValida.ts'
import { AddArticleStore } from '@/store/models/layout/articleManage/addArticle/index.ts'
import { VisibleStore } from '@/store/models/visible'
import { FormatUserParams_Fn } from '@/pkg/formatParmas.vue.ts'
import { UserStore } from '@/store/models/user'
import { UpSuccessMessage_Fn, UpWarningMessage_Fn } from '@/pkg/message.ts'
import { ArticleListStore } from '@/store/models/layout/articleManage/articleList'
import { UploadStore } from '@/store/models/upload'
import { ImageListStore } from '@/store/models/imageList'
const visibleStore = VisibleStore()
const addArticleStore = AddArticleStore()
const imageListStore = ImageListStore()
const articleListStore = ArticleListStore()
const uploadStore = UploadStore()
const userStore = UserStore()
const drawerOption = ref()
const nestDrawerOption = ref()
const fromRef = ref(null)
const selectRef = ref(null)
const flag = ref(true)
// 打开嵌套抽屉
const openDrawer = () => {
	visibleStore.NestDrawerLabel = 'articleBanner'
	visibleStore.isNestDrawerVisible.visible = true
	imageListStore.GetImagePagList_Fn()
}

// 批量删除
const remover = async () => {
	if (articleListStore.selectID.idList.length == 0) {
		UpWarningMessage_Fn('请先选择要删除的文章')
		return
	}
	try {
		await articleListStore.DelArticle_Fn()
		getArticleTableData_Fn()
	} catch (e) {
		return e
	}
}

// 上传图片
const upload = async (file) => {
	try {
		const r = await uploadStore.UploadImages_Fn(file.file)
		if (r.code == 1041) {
			await imageListStore.GetImagePagList_Fn()
		}
	} catch (e) {
		return e
	}
}

const submit = async () => {
	fromRef.value.fromRef.validate(async (valid) => {
		if (valid) {
			selectRef.value.selectRef.validate(async (valid) => {
				if (valid) {
					// 格式化参数
					const data = FormatUserParams_Fn(
						addArticleStore.addArticleOption.dialogOption.input,
						addArticleStore.addArticleOption.dialogOption.select.options,
						undefined,
						addArticleStore.addArticleOption.dialogOption.avatarPath,
						userStore.userInfo.id,
						addArticleStore.valueHtml
					)
					// 判断文章是否有内容
					if (data.content == null) {
						UpWarningMessage_Fn('请先编写文章内容', 2000)
						return
					} else if (addArticleStore.addArticleOption.dialogOption.select.options[0].data == '') {
						UpWarningMessage_Fn('请选择文章分类', 2000)
						return
					} else if (addArticleStore.addArticleOption.dialogOption.avatarPath == '') {
						UpWarningMessage_Fn('请选择文章封面', 2000)
						return
					}
					try {
						const r = await addArticleStore.AddArticle_Fn(data)
						if (r.code == '1055') {
							getArticleTableData_Fn()
							visibleStore.isDialogVisible.visible = false
							visibleStore.isDrawerVisible.visible = false
						}
					} catch (e) {
						return e
					}
				}
			})
		}
	})
}

// 清空文章内容
const clear = () => {
	if (addArticleStore.valueHtml != null) {
		addArticleStore.valueHtml = ''
		UpSuccessMessage_Fn('清空成功', 1500)
		return
	}
	UpWarningMessage_Fn('请先输入内容', 1500)
}

const save = () => {}
// 组件创建前获取用户数据
const getArticleTableData_Fn = () => {
	articleListStore.GetArticleList_Fn()
}
getArticleTableData_Fn()
// 监听抽屉变化
watch(
	() => visibleStore.isDrawerVisible.visible,
	(visible) => {
		if (visible) {
			if (visibleStore.DrawerLabel == 'addArticle') {
				drawerOption.value = addArticleStore.addArticleOption.drawerOption
			}
		} else {
			addArticleStore.ClearArticleData_Fn()
		}
	}
)
// 监听子抽屉变化
watch(
	() => visibleStore.isNestDrawerVisible.visible,
	(visible) => {
		if (visible) {
			if (visibleStore.NestDrawerLabel == 'articleBanner') {
				nestDrawerOption.value = addArticleStore.addArticleOption.bannerDrawerOption
			}
		}
	}
)

// 监听表单数据,用于数据校验
watch(
	() => addArticleStore.addArticleOption.dialogOption.input,
	(input) => {
		ReceptionFormData_Fn(input)
	},
	{
		deep: true,
		immediate: true
	}
)

// 监听表单数据,用于数据校验
watch(
	() => addArticleStore.addArticleOption.dialogOption.select.options,
	(options) => {
		ReceptionFormData_Fn(options)
	},
	{
		deep: true,
		immediate: true
	}
)

// 监听文章数据变化
watch(
	() => articleListStore.list,
	() => {
		flag.value = false
		nextTick(() => {
			flag.value = true
		})
	}
)
</script>

<style scoped lang="scss"></style>
