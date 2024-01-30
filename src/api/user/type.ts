// 登录接口需要接收的参数类型
export interface Login_Type {
	username: string
	password: string
}

// 注册接口需要的参数类型
export interface Register_Type {
	nickname: string
	username: string
	email: string
	password: string
	re_password: string
}

// 忘记密码发送邮件的参数类型
export interface Email_Type {
	email: string
}

// 验证码参数类型
export interface Change_Pwd_Type {
	id: number
	code: string
	password: string
	re_password: string
}

/*------------------返回类型------------------*/
// 通用Promise返回类型
export type PromiseType<T> = Promise<Resp_Data_Type<T>>

// 成功回调类型
export interface Resp_Data_Type<T = {}> {
	code: number
	message: string
	data: T
}

// 发送邮箱成功后返回用户的id
export interface ID_Type {
	id: number
}

// 登录成功后返回的token
export interface Token_Type {
	token: string
}

// jwt的类型
export interface JWT_Type {
	id: number
	nickname: string
	iss: string
	exp: number
}

// 获取用户信息成功后返回权限、昵称、和菜单列表

export interface UserInfo_Type {
	menuList: [
		{
			id: number
			title: string
			icon: string
			name: string
			path: string
			sort: number
			level: number
			childMenu: [
				{
					id: number
					title: string
					icon: string
					name: string
					path: string
					sort: number
					level: number
					sideMenuModelID: number
				}
			]
		}
	]
	userInfo: {
		id: number
		nickname: string
		avatar: string
		email: string
		role: string
	}
}
