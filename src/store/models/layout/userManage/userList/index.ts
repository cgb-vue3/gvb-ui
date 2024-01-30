import { defineStore } from 'pinia'
import {
	RespUserPagingList_Type,
	Paging_Type,
	DelUserParam_Type,
	Resp_Message_Type,
	EditUserParam_Type,
	TableTitle_Type
} from '@/api/layout/userManage/userList/type.ts'
import { Ref, ref } from 'vue'
import { DelUser_Api, EditUser_Api, RespUserPagList_Api } from '@/api/layout/userManage/userList'
import { PromiseType } from '@/api/user/type.ts'

export const UserListStore = defineStore('USER-LIST', () => {
	// 当前用页
	const currentPage = ref(1)
	// 当前用户页条数
	const pageSize = ref(10)
	// 排序
	const sort = ref(1)
	// 用户列表数据
	const list: Ref<RespUserPagingList_Type | undefined> = ref()
	// 用户总数
	const total = ref('')
	// 每次返回的数据
	const sizes = [10, 20, 30, 40]
	// 分页高度
	const pagHeight: string = 'height:60px'
	// 选中用户的id列表
	const selectID = ref({
		idList: []
	})
	// 表单头
	const tableTitle: TableTitle_Type[] = ref([
		{
			label: 'ID',
			key: 'id'
			// width: '100'
		},
		{
			label: '头像',
			key: 'avatar'
			// width: '100'
		},
		{
			label: '用户名',
			key: 'username'
			// width: '120'
		},
		{
			label: '昵称',
			key: 'nickname',
			width: '200'
		},
		{
			label: '手机号',
			key: 'phone',
			width: '120'
		},
		{
			label: '邮箱',
			key: 'email',
			width: '250'
		},
		{
			label: '用户角色',
			key: 'role',
			width: '120'
		},
		{
			label: '地址',
			key: 'addr',
			width: '120'
		},
		{
			label: '注册时间',
			key: 'createTime',
			width: '200'
		},
		{
			label: '操作',
			width: '250'
		}
	])
	// table操作区
	const userListTableOption = ref([
		{ label: 'edit', name: '编辑' },
		{ label: 'del', name: '删除', title: '是否删除该用户？' },
		{ label: 'reSetPassword', name: '重置密码', title: '是否重置密码？' }
	])
	// 编辑用户的表单数据
	const editUserData = ref({
		label: 'editUser',
		title: '编辑用户',
		id: '',
		input: [
			{
				label: 'nickname',
				name: '昵称',
				data: '',
				placeholder: '请输入4-8位字母或汉字的昵称',
				width: '100',
				maxlength: 8
			},
			{
				label: 'phone',
				name: '手机号',
				data: '',
				placeholder: '请输入11位手机号',
				width: '100',
				maxlength: 11
			},
			{
				label: 'email',
				name: '邮箱',
				data: '',
				placeholder: '邮箱格式为xxx@xx.com(x只能为数字或字母)',
				width: '100'
			}
		],
		select: {
			options: [
				{
					label: 'userRole',
					name: '用户权限',
					data: '',
					width: '100',
					placeholder: '请选择',
					option: [
						{
							value: '1',
							label: '超级管理员'
						},
						{
							value: '2',
							label: '管理员'
						},
						{
							value: '3',
							label: '普通用户'
						}
					]
				}
			]
		},
		footer: [
			{ label: 'cancel', title: '取消' },
			{ label: 'submit', title: '修改' }
		],
		drawerBtn: [
			{
				name: '头像',
				placeholder: '从媒体库选择头像',
				width: '100',
				size: '120',
				type: 'uploadAvatar'
			}
		],
		drawerOption: {
			title: '媒体库',
			size: '600px'
		}
	})
	// 头像地址
	const avatarPath: Ref<number> = ref('')

	// 获取用户列表
	const GetUserPagList_Fn = async () => {
		try {
			// 分页参数
			const params: Paging_Type = {
				page: currentPage.value,
				page_size: pageSize.value,
				sort: sort.value
			}
			const r = await RespUserPagList_Api(params)
			list.value = r.data
			total.value = r.data.total
		} catch (e) {
			return
		}
	}
	// 删除用户
	const DelUser_Fn = async (): PromiseType<Resp_Message_Type> => {
		try {
			const data: DelUserParam_Type[] = {
				idList: selectID.value.idList
			}
			const r = await DelUser_Api(data)
			return r
		} catch (e) {
			return e
		}
	}
	// 编辑用户
	const EditUser_Fn = async (data: EditUserParam_Type): PromiseType<Resp_Message_Type> => {
		try {
			return await EditUser_Api(data)
		} catch (e) {
			return e
		}
	}
	// 清空表单数据
	const clearEditData_Fn = () => {
		for (let i = 0; i < editUserData.value.input.length - 1; i++) {
			editUserData.value.input[i].data = ''
		}
		editUserData.value.select.options[0].data = ''
		avatarPath.value = ''
	}
	return {
		currentPage,
		pageSize,
		list,
		total,
		sizes,
		pagHeight,
		selectID,
		tableTitle,
		editUserData,
		avatarPath,
		userListTableOption,
		GetUserPagList_Fn,
		clearEditData_Fn,
		DelUser_Fn,
		EditUser_Fn
	}
})
