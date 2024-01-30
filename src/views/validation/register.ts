import { reactive } from 'vue'
import {
	Validate_Email_Fn,
	Validate_Password_Fn,
	Validate_Re_Password_Fn,
	Validate_Username_Fn
} from '@/pkg/validate.ts'

let pass = ''

export const ValidateData_Fn = (data: string) => {
	pass = data
}
// 自定义表单验证
// 密码
const password = (rule: object, value: string, cb: () => void) => {
	Validate_Password_Fn(value, cb)
}

// 邮箱
const email = (rule: object, value: string, cb: () => void) => {
	Validate_Email_Fn(value, cb)
}

// 重复密码
const re_password = (rule: object, value: string, cb: () => void) => {
	Validate_Re_Password_Fn(value, pass, cb)
}

// 用户名
const username = (rule: object, value: string, cb: () => void) => {
	Validate_Username_Fn(value, cb)
}

// 昵称名
const nickname = (rule: object, value: string, cb: (msg: string) => void) => {
	if (value.length == 0) {
		cb('昵称不能为空')
	} else if (value.length < 4 || 8 < value.length) {
		cb('昵称应为4-8位字符')
	}
	cb()
}

export const rules = reactive({
	nickname: [{ validator: nickname, trigger: 'blur' }],
	email: [{ validator: email, trigger: 'blur' }],
	username: [{ validator: username, trigger: 'blur' }],
	password: [{ validator: password, trigger: 'blur' }],
	re_password: [{ validator: re_password, trigger: 'blur' }]
})
