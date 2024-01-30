// 分页参数类型
export interface Paging_Type {
	page: string
	page_size: string
	sort: string
}

// 通用Promise返回类型
export type PromiseType<T> = Promise<Resp_Data_Type<T>>

// 响应数据类型
export interface Resp_Data_Type<T = {}> {
	code: number
	message: string
	data: T
}

export interface Resp_Message_Type {
	code: number
	message: string
}

// 用户列表返回参数类型
export interface RespUserPagingList_Type {
	listData: [
		{
			id: string
			CreatedAt: string
			UpdatedAt: string
			DeletedAt: string
			nickname: string
			slogan: string
			sex: string
			addr: string
			avatar: string
			email: string
			phone: string
			wechat: string
			role: string
		}
	]
	total: String
}

// 图片返回列表参数
export interface RespImageList_Type {
	listData: [
		{
			id: string
			CreatedAt: string
			UpdatedAt: string
			DeletedAt: string
			name: string
			path: string
			hash: string
			env: string
		}
	]
	total: string
}

// 添加用户参数
export interface AddUserParam_Type {
	nickname: string
	username: string
	email: string
	phone: string
	role: string
	avatar: string
	password: string
}

// 编辑用户参数
export interface EditUserParam_Type {
	nickname: string
	email: string
	phone: string
	role: string
	avatar: string
	password: string
}
// table头数据类型
export interface TableTitle_Type {
	label: string
	key: string
	[propName: string]: any
}

// 删除用户参数
export interface DelUserParam_Type {
	idList: Array<number>
}
