import request from '@/api/request.ts'
import {
	Login_Type,
	Register_Type,
	Token_Type,
	Email_Type,
	ID_Type,
	Change_Pwd_Type,
	UserInfo_Type,
	PromiseType,
	Resp_Data_Type
} from '@/api/user/type.ts'

enum API {
	LOGIN_URL = 'v1/login',
	REGISTER_URL = 'v1/register',
	EMAIL_URL = 'v1/email_code',
	CHANGE_PWD_URL = 'v1/change_pwd',
	USER_MANAGE_INFO = 'auth/v1/user_manage/info'
}

// 登录接口
export const Login_Api = (data: Login_Type): PromiseType<Token_Type> =>
	request.post(API.LOGIN_URL, data)
// 注册接口
export const Register_Api = (data: Register_Type): Promise<Resp_Data_Type> =>
	request.post(API.REGISTER_URL, data)

// 发送邮件
export const SendEmail_Api = (data: Email_Type): PromiseType<ID_Type> =>
	request.post(API.EMAIL_URL, data)

// 修改密码
export const ChangePassword_Api = (data: Change_Pwd_Type & ID_Type): Promise<Resp_Data_Type> => {
	return request.post(API.CHANGE_PWD_URL, data)
}

// 获取当前登录用户信息
export const GetUserInfo_Api = (): PromiseType<UserInfo_Type> => request.get(API.USER_MANAGE_INFO)
