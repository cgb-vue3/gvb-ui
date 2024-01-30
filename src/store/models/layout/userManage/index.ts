import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { AddUser_Api } from '@/api/layout/userManage/userList'
import { AddUserParam_Type, Resp_Data_Type } from '@/api/layout/userManage/userList/type.ts'
import { FormatUserParams_Fn } from '@/pkg/formatParmas.vue.ts'

export const UserManageStore = defineStore('UserManage', () => {
	// 编辑用户表单数据
	const addUserData = ref({
		label: 'addUser',
		title: '添加用户',
		input: [
			{
				label: 'username',
				name: '用户名',
				data: '',
				placeholder: '请输入6-12位字母或数字的用户名',
				width: '100',
				maxlength: 12
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
				label: 'nickname',
				name: '昵称',
				data: '',
				placeholder: '请输入4-8位字母或汉字的昵称',
				width: '100',
				maxlength: 8
			},
			{
				label: 'password',
				name: '密码',
				data: '',
				placeholder: '请输入6-12位字母或数字的密码',
				width: '100',
				maxlength: 12
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
			size: '600px',
			headersButton: [{ label: 'close', name: '关闭' }]
		},
		footer: [
			{ label: 'cancel', title: '取消' },
			{ label: 'submit', title: '添加' }
		]
	})
	//头像地址
	const avatarPath: Ref<number> = ref('')
	// 添加用户
	const addUser_Fn = async (): Resp_Data_Type => {
		try {
			const data: AddUserParam_Type = FormatUserParams_Fn(
				addUserData.value.input,
				addUserData.value.select.options,
				avatarPath.value
			)
			data.type == 'edit'
			return await AddUser_Api(data)
		} catch (e) {
			return e
		}
	}
	// 清空表单数据
	const clearAddData_Fn = () => {
		for (let i = 0; i < addUserData.value.input.length - 1; i++) {
			addUserData.value.input[i].data = ''
		}
		addUserData.value.select.options[0].data = ''
		avatarPath.value = ''
	}
	return {
		addUserData,
		avatarPath,
		addUser_Fn,
		clearAddData_Fn
	}
})
