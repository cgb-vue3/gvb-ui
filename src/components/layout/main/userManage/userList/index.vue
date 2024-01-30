<template>
	<div
		v-loading="!userListStore.list"
		v-if="userListStore.list"
		class="mainContainer flex flex-col justify-start items-center">
		<Gvb_covert_Top
			:fromRef="fromRef"
			:userManageStore="userManageStore"
			:imageListStore="imageListStore"
			:userListStore="userListStore" />
		<Gvb_covert_Table
			v-if="flag"
			:userStore="userStore"
			:userListStore="userListStore"
			:visibleStore="visibleStore"
			:tableTitle="userListStore.tableTitle"
			:tableOption="userListStore.userListTableOption"
			:userInfo="userStore.userInfo"
			:fromRef="fromRef"
			:userList="userListStore.list" />
		<Gvb_covert_Paging :store="userListStore" :getPag_Fn="userListStore.GetUserPagList_Fn" />
		<!--      对话款-->
		<div>
			<Gvb_dialog
				@submit="submit"
				:visibleStore="visibleStore.isDialogVisible"
				:dialog-option="dialogOption">
				<template #default>
					<gvb_from :rules="rules" ref="fromRef" :dialogOption="dialogOption" />
					<gvb_select :selectOptions="selectOptions" />
					<gvb_drawer_btn
						@openDrawer="openDrawer"
						:imageStore="imageStore"
						:visibleStore="visibleStore"
						:drawerBtn="drawerBtn"></gvb_drawer_btn>
				</template>
			</Gvb_dialog>
			<Gvb_drawer
				v-if="visibleStore.DrawerLabel == 'User'"
				:visible="visibleStore.isDrawerVisible"
				:drawer-option="drawerOption">
				<Gvb_upload @upload="upload" :upload-option="uploadStore.uploadOption.avatar" />
				<Gvb_imgList
					v-if="imageFlag"
					v-loading="!imageListStore.list"
					:drawer-visible="visibleStore.isDrawerVisible"
					:image="imageStore"
					:imageList="imageListStore.list" />
				<Gvb_paging :store="imageListStore" :getPag_Fn="imageListStore.GetImagePagList_Fn" />
			</Gvb_drawer>
		</div>
	</div>
</template>

<script setup lang="ts">
import Gvb_covert_Top from '@/components/layout/main/userManage/userList/top/index.vue'
import Gvb_covert_Table from '@/components/layout/main/userManage/userList/table/index.vue'
import Gvb_covert_Paging from '@/components/layout/main/userManage/userList/paging/index.vue'
import { UserListStore } from '@/store/models/layout/userManage/userList'
import { UserManageStore } from '@/store/models/layout/userManage'
import { ImageListStore } from '@/store/models/imageList'
import { UploadStore } from '@/store/models/upload'
import { nextTick, ref, watch } from 'vue'
import { VisibleStore } from '@/store/models/visible'
import {
	addUserRules,
	editUserRules
} from '@/components/layout/main/userManage/validation/userManageValida.ts'
import { UpErrorMessage_Fn } from '@/pkg/message.ts'
import { ReceptionFormData_Fn } from '@/components/layout/main/userManage/validation/userManageValida.ts'
import { FormatUserParams_Fn } from '@/pkg/formatParmas.vue.ts'
import { UserStore } from '@/store/models/user'

const userStore = UserStore()
const imageListStore = ImageListStore()
const userListStore = UserListStore()
const userManageStore = UserManageStore()
const visibleStore = VisibleStore()
const uploadStore = UploadStore()

// 添加用户的ref
const fromRef = ref(null)
// 对话框表单数据
const dialogOption = ref()
// imageStore
const imageStore = ref()
// 对话框select数据
const selectOptions = ref()
// 对话框打开媒体库抽屉按钮
const drawerBtn = ref()
// 抽屉标题
const drawerOption = ref({
	size: '',
	title: ''
})
const flag = ref(true)
const imageFlag = ref(true)
// 校验规则
const rules = ref()

// 打开抽屉
const openDrawer = () => {
	visibleStore.isDrawerVisible.visible = true
	visibleStore.DrawerLabel = 'User'
}

// 上传图片
const upload = async (file) => {
	try {
		const r = await uploadStore.UploadImages_Fn(file.file, 'avatar')
		if (r.code == 1041) {
			await imageListStore.GetImagePagList_Fn()
		}
	} catch (e) {
		return e
	}
}

// 添加用户方法
const submit = () => {
	// 表单验证
	fromRef.value.fromRef.validate(async (valid) => {
		if (valid) {
			if (selectOptions.value[0].data == '') {
				UpErrorMessage_Fn('请选择角色权限')
			} else if (imageStore.value.avatarPath == '') {
				UpErrorMessage_Fn('请选择用户头像')
			} else {
				// 添加用户
				if (visibleStore.DialogLabel == 'addUser') {
					try {
						const r = await userManageStore.addUser_Fn()
						if (r.code == 1047) {
							GetUserList()
							visibleStore.isDialogVisible.visible = false
						}
					} catch (e) {
						return e
					}
					// 编辑用户
				} else if (visibleStore.DialogLabel == 'editUser') {
					try {
						const data = FormatUserParams_Fn(
							userListStore.editUserData.input,
							userListStore.editUserData.select.options,
							userListStore.avatarPath,
							undefined,
							userListStore.editUserData.id
						)
						const r = await userListStore.EditUser_Fn(data)
						if (r.code == 1051) {
							GetUserList()
							visibleStore.isDialogVisible.visible = false
						}
					} catch (e) {
						return e
					}
				}
			}
		}
	})
}

// 组件创建调用接口
const GetUserList = () => {
	userListStore.GetUserPagList_Fn()
	imageListStore.GetImagePagList_Fn()
}
GetUserList()

// 监听用户列表数据变化，重新渲染界面
watch(
	() => userListStore.list,
	() => {
		flag.value = false
		nextTick(() => {
			flag.value = true
		})
	}
)

// 监听添加用户对话款是否关闭,如果关闭就清空所有数据
watch(
	() => visibleStore.isDialogVisible.visible,
	(visible) => {
		if (visible) {
			if (visibleStore.DialogLabel == 'addUser') {
				rules.value = addUserRules
				dialogOption.value = userManageStore.addUserData
				imageStore.value = userManageStore
				selectOptions.value = userManageStore.addUserData.select.options
				drawerBtn.value = userManageStore.addUserData.drawerBtn
				drawerOption.value = userManageStore.addUserData.drawerOption
			} else if (visibleStore.DialogLabel == 'editUser') {
				rules.value = editUserRules
				dialogOption.value = userListStore.editUserData
				imageStore.value = userListStore
				selectOptions.value = userListStore.editUserData.select.options
				drawerBtn.value = userListStore.editUserData.drawerBtn
				drawerOption.value = userListStore.editUserData.drawerOption
			}
		} else {
			userManageStore.clearAddData_Fn()
			userListStore.clearEditData_Fn()
		}
	},
	{
		deep: true
	}
)

// 监听添加用户表单数据,用于数据校验
watch(
	() => userManageStore.addUserData.input,
	(input) => {
		ReceptionFormData_Fn(input)
	},
	{
		deep: true,
		immediate: true
	}
)

// 监听头像列表
watch(
	() => imageListStore.list,
	() => {
		imageFlag.value = false
		nextTick(() => {
			imageFlag.value = true
		})
	}
)

// 监听编辑用户表单数据,用于数据校验
watch(
	() => userListStore.editUserData.input,
	(input) => {
		ReceptionFormData_Fn(input)
	},
	{
		deep: true,
		immediate: true
	}
)
</script>
