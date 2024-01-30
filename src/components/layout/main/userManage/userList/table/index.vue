<template>
	<Gvb_table
		v-loading="!userList"
		:store="userListStore"
		:tableTitle="tableTitle"
		:tableData="tableData">
		<template #default="scope">
			<div class="w-[100%] h-[30px] flex justify-center items-center">
				<template v-for="(i, index) in tableOption" :key="index">
					<!--					编辑-->
					<button
						v-if="i.label == 'edit'"
						class="w-[30px] h-[30px] mr-4 cursor-pointer primaryText"
						@click="handleEdit(scope.$index, scope.row)">
						{{ i.name }}
					</button>

					<div v-if="i.label == 'del'">
						<el-popconfirm @confirm="confirm(scope.row)" :title="i.title">
							<template #reference>
								<!--					删除-->
								<button
									class="w-[30px] h-[30px] mr-4 cursor-pointer waringText"
									@click="handleDelete(scope.$index, scope.row)">
									{{ i.name }}
								</button>
							</template>
						</el-popconfirm>
					</div>
					<!--					重置密码-->
					<div v-if="i.label == 'reSetPassword'">
						<el-popconfirm @confirm="reSetPassWord(scope.row)" :title="i.title">
							<template #reference>
								<!--					重置密码-->
								<button class="w-[60px] h-[30px] mr-4 cursor-pointer waringText">
									{{ i.name }}
								</button>
							</template>
						</el-popconfirm>
					</div>
				</template>
			</div>
		</template>
	</Gvb_table>
</template>

<script setup lang="ts">
import { ParseTime } from '@/pkg/time.ts'
import { UpWarningMessage_Fn } from '@/pkg/message.ts'
import { nextTick } from 'vue'
import { UpSuccessNotification_Fn } from '@/pkg/Notification.ts'

interface tableData_Type {
	id: string
	username: string
	nickname: string
	avatar: string
	phone: string
	email: string
	role: string
	addr: string
	createTime: string
}
const p = defineProps([
	'userStore',
	'userListStore',
	'visibleStore',
	'tableTitle',
	'userList',
	'fromRef',
	'userInfo',
	'tableOption'
])

const userList = p.userList.listData

// 表单数据
const tableData: tableData_Type[] = []

userList.forEach((list) => {
	tableData.push({
		id: list.id,
		username: list.username,
		nickname: list.nickname,
		avatar: list.avatar,
		phone: list.phone,
		email: list.email,
		role: list.role,
		addr: list.addr,
		createTime: ParseTime(list.CreatedAt)
	})
})
// 编辑
const handleEdit = (i, v) => {
	// 判断当前用户是否允许编辑
	if (p.userInfo.role == v.role && p.userInfo.username != v.username) {
		UpWarningMessage_Fn('权限不足,无法编辑该用户', 2000)
		return
	}
	p.visibleStore.isDialogVisible.visible = true
	p.visibleStore.DialogLabel = 'editUser'
	p.userListStore.editUserData.id = v.id
	// 赋值表单数据
	p.userListStore.editUserData.input.forEach((i) => {
		if (i.label == 'username') {
			i.data = v.username
		} else if (i.label == 'nickname') {
			i.data = v.nickname
		} else if (i.label == 'phone') {
			i.data = v.phone
		} else if (i.label == 'email') {
			i.data = v.email
		}
	})
	// 头像
	p.userListStore.avatarPath = v.avatar
	// 权限
	p.userListStore.editUserData.select.options.forEach((i) => {
		i.option.forEach((j) => {
			if (j.label == v.role) {
				i.data = j.value
			}
		})
	})
	nextTick(() => {
		p.fromRef.fromRef.resetFields()
	})
}

// 删除时的确认弹窗
const confirm = async (v) => {
	// 判断当前用户和要删除的用户级别
	if (p.userStore.userInfo.id == v.id) {
		UpWarningMessage_Fn('无法删除自己')
		return
	} else if (p.userStore.userInfo.role == v.role) {
		UpWarningMessage_Fn('删除失败，权限不足')
		return
	}
	try {
		await p.userListStore.DelUser_Fn()
		p.userListStore.selectID.idList = []
		await p.userListStore.GetUserPagList_Fn()
	} catch (e) {
		return e
	}
}

// 删除
const handleDelete = (i, v) => {
	p.userListStore.selectID.idList.push(v.id)
}

// 重置密码
const reSetPassWord = async (v) => {
	let role = ''
	const pwd = v.username + v.phone.substring(7)
	if (v.role == '超级管理员') {
		role = '1'
	} else if (v.role == '管理员') {
		role = '2'
	} else if (v.role == '普通用户') {
		role = '3'
	}

	const data = {
		id: v.id,
		nickname: v.nickname,
		email: v.email,
		phone: v.phone,
		role: role,
		avatar: v.avatar,
		password: pwd
	}
	data.type = 'rePassword'
	// 判断当前用户和要重置密码的用户级别
	if (p.userStore.userInfo.role == v.role) {
		UpWarningMessage_Fn('重置密码失败，权限不足')
		return
	}
	try {
		const r = await p.userListStore.EditUser_Fn(data)
		if (r.code == 1053) {
			UpSuccessNotification_Fn('密码重置成功', '新密码为您的用户名加手机号后4位', 5000)
		}
	} catch (e) {
		return e
	}
}
</script>
