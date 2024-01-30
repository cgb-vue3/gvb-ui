import { Base64 } from 'js-base64'
export interface FormData_Type {
	id: number //	id
	username: string // 用户名
	nickname: string // 昵称
	phone: string // 手机号
	email: string // 邮箱
	password: string // 密码
	role: string // 权限
	avatar: string //头像
	title: string // 文章标题
	abstract: string // 简介
	categoryTitle: string //文章分类
	tagTitles: string //文章标签
	banner: string // 封面
	content: string // 文章内容
}

const data: FormData_Type = {}

export const FormatUserParams_Fn = (
	from?: any,
	select?: string | undefined,
	avatar?: string | undefined,
	banner?: string | undefined,
	id?: string | undefined,
	content?: string | undefined
): FormData_Type => {
	// from表单
	from.forEach((i: any) => {
		if (i.label == 'username') {
			data.username = i.data
		} else if (i.label == 'nickname') {
			data.nickname = i.data
		} else if (i.label == 'phone') {
			data.phone = i.data
		} else if (i.label == 'email') {
			data.email = i.data
		} else if (i.label == 'password') {
			data.password = i.data
		} else if (i.label == 'title') {
			data.title = i.data
		} else if (i.label == 'abstract') {
			data.abstract = i.data
		} else if (i.label == 'categoryTitle') {
			data.categoryTitle = i.data
		} else if (i.label == 'tagTitles') {
			data.tagTitles = i.data
		}
	})
	//id
	if (id) data.id = id
	// 选择
	if (select) {
		// select选择框
		select.forEach((i) => {
			if (i.label == 'userRole') {
				data.role = i.data
			} else if (i.label == 'categoryTitle') {
				data.categoryTitle = i.data
			} else if (i.label == 'tagTitles') {
				data.tagTitles = i.data
			}
		})
	}

	// 内容
	if (content) data.content = Base64.encode(content)
	// 封面
	if (banner) data.banner = banner
	// 头像
	if (avatar) data.avatar = avatar

	return data
}
