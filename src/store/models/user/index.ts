import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import {
	ChangePassword_Api,
	GetUserInfo_Api,
	Login_Api,
	Register_Api,
	SendEmail_Api
} from '@/api/user'
import {
	Change_Pwd_Type,
	Email_Type,
	Login_Type,
	Register_Type
	// UserInfo_Type
} from '@/api/user/type.ts'
import { Get_Cookie, Remove_Cookie } from '@/pkg/token.ts'
export const UserStore = defineStore(
	'USER',
	() => {
		/********************************响应数据********************************/
		const token: Ref<string | undefined> = ref(Get_Cookie('token')) // token
		// 用户id
		const ID = ref<number | undefined>()

		const userInfo = ref({})
		const menuList = ref([])
		// 发送邮件按钮加载动画
		const isShowLoading = ref(false)
		// 修改密码按钮加载动画
		const isShowChangeLoading = ref(false)
		// 注册按钮加载动画
		const isShowRegisterLoading = ref(false)
		// 登录按钮加载动画
		const isShowLoginLoading = ref(false)

		// 登录
		const User_login_Fn = async (data: Login_Type) => {
			try {
				// 调用注册请求
				const r = await Login_Api(data)
				isShowLoginLoading.value = false
				return r
			} catch (e) {
				isShowLoginLoading.value = false
				return e
			}
		}
		// 注册
		const User_Register_Fn = async (data: Register_Type) => {
			try {
				// 调用注册请求
				await Register_Api(data)
				isShowRegisterLoading.value = false
			} catch (e) {
				isShowRegisterLoading.value = false
				return e
			}
		}

		// 发送邮件请求
		const User_send_email_Fn = async (data: Email_Type) => {
			try {
				const r = await SendEmail_Api(data)
				ID.value = r.data.id
				return r
			} catch (e) {
				return e
			}
		}

		// 验证验证码修改密码
		const User_change_pwd_Fn = async (data: Change_Pwd_Type) => {
			try {
				data.id = ID.value
				await ChangePassword_Api(data)
				localStorage.clear('ID')
				// 关闭修改密码按钮加载
				isShowChangeLoading.value = false
			} catch (e) {
				return e
			}
		}
		// 获取当前用户信息
		const GetUserInfo_Fn = async () => {
			try {
				return await GetUserInfo_Api()
			} catch (e) {
				return e
			}
		}

		// 更新仓库的用户信息
		const UpdateUserData_Fn = (info: any, menus: any) => {
			userInfo.value = info
			menuList.value = menus
		}

		// 退出登录
		const Quit_Fn = () => {
			// 退出登录清除本地和仓库中的token
			Remove_Cookie('token')
			token.value = ''
			// 清除菜单路由
			menuList.value = []
			// // 清空tag信息
			// localStorage.clear('visitedViews')
			// // 清空menu收缩状态
			// localStorage.clear('isShowMenu')
			// // 清空table信息
			// localStorage.clear('tableInfo')
		}
		return {
			token,
			ID,
			userInfo,
			menuList,
			isShowLoading,
			isShowChangeLoading,
			isShowRegisterLoading,
			isShowLoginLoading,
			User_login_Fn,
			User_Register_Fn,
			User_send_email_Fn,
			User_change_pwd_Fn,
			GetUserInfo_Fn,
			UpdateUserData_Fn,
			Quit_Fn
		}
	},
	// 将数据存到本地，刷新不失效
	{
		persist: {
			enabled: true,
			strategies: [
				{
					key: 'ID',
					storage: localStorage,
					paths: ['ID']
				}
			]
		}
	}
)
