import {
	Validate_Email_Fn,
	Validate_Password_Fn,
	Validate_Phone_Fn,
	Validate_Username_Fn
} from '@/pkg/validate.ts'
interface FormData_Type {
	username: string
	nickname: string
	phone: string
	email: string
	password: string
	title: string
	abstract: string
	categoryTitle: string
	tagTitles: string
}

const data: FormData_Type = {}

// 接收表单数据
export const ReceptionFormData_Fn = (input: any) => {
	input.forEach((i: any) => {
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
}
// 用户名
const username = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.username
	}
	Validate_Username_Fn(value, cb)
}

// 昵称名
const nickname = (rule: object, value: string, cb: (msg: string) => void) => {
	if (value == undefined) {
		value = data.nickname
	}
	if (value.length < 4 || 8 < value.length) {
		cb('昵称应为4-8位字符')
	}
	cb()
}

// 邮箱
const email = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.email
	}
	Validate_Email_Fn(value, cb)
}

// 密码
const password = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.password
	}
	Validate_Password_Fn(value, cb)
}

// 手机号
const phone = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.phone
	}
	Validate_Phone_Fn(value, cb)
}

const abstract = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.abstract
	}
	cb()
}

// 文章标题
const title = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.title
	}
	if (value.length == 0) {
		cb('文章标题不能为空')
	}
	cb()
}

// 文章分类
const categoryTitle = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.categoryTitle
	}
	if (value.length == 0) {
		cb('分类不能为空')
	}
	cb()
}

// 文章标签
const tagTitles = (rule: object, value: string, cb: () => void) => {
	if (value == undefined) {
		value = data.tagTitles
	}
	cb()
}

// 添加用户
export const addUserRules = [
	{
		name: 'username',
		rule: [{ validator: username, required: true, trigger: 'change' }]
	},
	{
		name: 'phone',
		rule: [{ validator: phone, required: true, trigger: 'change' }]
	},
	{
		name: 'nickname',
		rule: [{ validator: nickname, required: true, trigger: 'change' }]
	},
	{
		name: 'password',
		rule: [{ validator: password, required: true, trigger: 'change' }]
	},
	{
		name: 'email',
		rule: [{ validator: email, required: true, trigger: 'change' }]
	}
]
// 编辑文章
export const editUserRules = [
	{
		name: 'nickname',
		rule: [{ validator: nickname, required: true, trigger: 'change' }]
	},
	{
		name: 'phone',
		rule: [{ validator: phone, required: true, trigger: 'change' }]
	},
	{
		name: 'email',
		rule: [{ validator: email, required: true, trigger: 'change' }]
	}
]

// 添加文章
export const addArticleRules = [
	{
		name: 'title',
		rule: [{ validator: title, required: true, trigger: 'change' }]
	},
	{
		name: 'abstract',
		rule: [{ validator: abstract, trigger: 'change' }]
	}
]

// 添加文章选择器rules
export const addArticleSelectRules = [
	{
		name: 'categoryTitle',
		rule: [{ validator: categoryTitle, required: true, trigger: 'change' }]
	},
	{
		name: 'tagTitles',
		rule: [{ validator: tagTitles, trigger: 'blur' }]
	}
]
