import request from '@/api/request.ts'
import {
	AddUserParam_Type,
	DelUserParam_Type,
	EditUserParam_Type,
	Paging_Type,
	Resp_Message_Type,
	RespImageList_Type,
	RespUserPagingList_Type
} from '@/api/layout/userManage/userList/type.ts'
import { PromiseType, Resp_Data_Type } from '@/api/user/type.ts'

// 接口
enum API {
	// 返回用户列表
	RESP_USER_PAG_LIST_URL = 'auth/v1/user_manage/list',
	// 返回图片列表
	RESP_IMAGE_PAG_LIST_URL = 'v1/images_pag',
	// 添加用户
	ADD_USER_URL = 'auth/v1/user_manage/addUser',
	// 删除用户
	DEL_USER_URL = 'auth/v1/user_manage/delUser',
	// 编辑用户
	EDIT_USER_URL = 'auth/v1/user_manage/editUser'
}

// 返回用户列表
export const RespUserPagList_Api = (params: Paging_Type): PromiseType<RespUserPagingList_Type> =>
	request.get(API.RESP_USER_PAG_LIST_URL, {
		params
	})

// 返回图片列表
export const RespImageList_Api = (params: Paging_Type): PromiseType<RespImageList_Type> =>
	request.get(API.RESP_IMAGE_PAG_LIST_URL, {
		params
	})

// 添加用户
export const AddUser_Api = (data: AddUserParam_Type): PromiseType<Resp_Data_Type> =>
	request.post(API.ADD_USER_URL, data)

// 删除用户
export const DelUser_Api = (data: DelUserParam_Type[]): PromiseType<Resp_Message_Type> => {
	return request.delete(API.DEL_USER_URL, {
		data
	})
}

// 编辑用户
export const EditUser_Api = (data: EditUserParam_Type): PromiseType<Resp_Message_Type> =>
	request.put(API.EDIT_USER_URL, data)
