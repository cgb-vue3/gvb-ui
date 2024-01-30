// 正整数
export const is_positive_integer_Reg = (data: string): boolean => {
	return /^[0-9]*$/.test(data)
}

// 中文
export const Is_characters_Reg = (data: string & number): boolean => {
	const reg: RegExp = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
	return reg.test(data)
}

// 邮箱格式
export const Is_email_Reg = (data: string): boolean => {
	return /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(data)
}

// 混合类型
export const Is_mixed_Reg = (data: string): boolean => {
	return /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$)(?!^[a-zA-Z\d]+$)(?!^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$)(?!^[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$)(?!^[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$)[0-9A-Za-z\u4e00-\u9fa5!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/.test(
		data
	)
}

//大小写英文、数字和符号“-”、“_”
export const is_en_number_symbol_Reg = (data: string): boolean => {
	return /^([\w_\-]+)+$/.test(data)
}

// 只能由英文字母和数字组成，并且以英文字母开头
export const is_en_num_Reg = (data: string): boolean => {
	return /^[a-zA-Z][a-zA-Z0-9]+$/.test(data)
}
// 纯字母
export const is_en_Reg = (data: string): boolean => {
	return /^[A-Za-z]+$/.test(data)
}

// 正整数校验
export const Validate_code_Fn = (value: string, cb: (msg: string) => void) => {
	const len: number = value.length
	if (len == 0) {
		cb('验证码不能为空')
	} else if (
		len != 6 ||
		!is_positive_integer_Reg(value) ||
		Is_characters_Reg(value) ||
		!is_en_number_symbol_Reg(value)
	) {
		cb('验证码只能为6位数字')
	}
	cb()
}

// 邮箱校验
export const Validate_Email_Fn = (value: string, cb: (msg: string) => void) => {
	if (value.length == 0) {
		cb('邮件地址不能为空')
	} else if (!Is_email_Reg(value)) {
		cb('邮箱格式错误')
	}
	cb()
}

// username校验
export const Validate_Username_Fn = (value: string, cb: (msg: string) => void) => {
	const len: number = value.length
	if (len < 6 || len > 12) {
		cb('用户名需要为6~12位字母')
	} else if (!is_en_Reg(value)) {
		cb('用户名需要由大小写字母组成')
	}
	cb()
}

// 密码校验
export const Validate_Password_Fn = (value: string, cb: (msg: string) => void) => {
	const len: number = value.length
	if (len < 6 || len > 12) cb('密码需要为6-12位字符')
	else if (Is_characters_Reg(value)) cb('密码不能有中文')
	cb()
}

// 重复密码校验
export const Validate_Re_Password_Fn = (
	value: string,
	password: string,
	cb: (msg: string) => void
) => {
	if (value == '' || value != password) {
		cb('密码为空或两次密码不一致,请重新输入')
	}
	cb()
}

// 手机号验证
export const Validate_Phone_Fn = (value: string, cb: (msg: string) => void) => {
	const len: number = value.length
	if (len != 11) cb('手机号需要为11')
	else if (len != 11 || !is_positive_integer_Reg(value)) cb('手机号应为纯数字')
	cb()
}
