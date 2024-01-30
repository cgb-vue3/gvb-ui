// rules校验规则
import { reactive } from 'vue'

export const rules = reactive({
	username: [
		{ required: true, message: '用户名不能为空', trigger: 'blur' },
		{ min: 6, max: 12, message: '用户名长度最小为6位，最大为12位', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '密码不能为空', trigger: 'blur' },
		{ min: 6, max: 12, message: '密码长度最小为6位，最大为12位', trigger: 'blur' }
	]
})
