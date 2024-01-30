import {
	Validate_Email_Fn,
	Validate_code_Fn,
	Validate_Password_Fn,
	Validate_Re_Password_Fn
} from '@/pkg/validate.ts'
import { reactive } from 'vue'
// 修改密码参数
let user_pass = ''

// 声明一个函数，用于获取userCode
export const ValidateData_Fn = (data: string) => {
	user_pass = data
}

const email = (rule: object, value: string, cb: () => void) => {
	Validate_Email_Fn(value, cb)
}
// 验证码校验
const code = (rule: object, value: string, cb: () => void) => {
	Validate_code_Fn(value, cb)
}
// 密码校验
const password = (rule: object, value: string, cb: () => void) => {
	Validate_Password_Fn(value, cb)
}

// 重复密码校验
const re_password = (rule: object, value: string, cb: () => void) => {
	Validate_Re_Password_Fn(value, user_pass, cb)
}

// 自定义校验
export const lostPasswordRules = reactive({
	code: [{ validator: code, trigger: 'blur' }],
	password: [{ validator: password, trigger: 'blur' }],
	re_password: [{ validator: re_password, trigger: 'blur' }]
})

export const emailRules = reactive({
	email: [{ validator: email, trigger: 'blur' }]
})
