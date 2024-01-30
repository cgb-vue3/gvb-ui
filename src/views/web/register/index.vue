<template>
	<!--  背景容器-->
	<div class="Page_bg">
		<!--    主容器-->
		<div class="w-[1100px] h-[750px] shadow-2xl Page_container">
			<div class="max-w-screen-xl mx-auto flex">
				<!--  左容器    -->
				<div class="hidden w-[500px] h-[750px] dark:bg-dark_bg Page_left lg:flex">
					<svg-icon name="register" size="500px"></svg-icon>
				</div>
				<!--  右容器    -->
				<div class="w-[450px] h-[750px] Page_right md:w-[600px]">
					<!--  标题     -->
					<div class="w-[450px] h-[100px] Page_title md:w-[600px]">
						<span>Welcome to register</span>
					</div>
					<div class="w-[450px] h-[650px] Page_main md:w-[600px]">
						<!--      注册表单-->
						<el-form
							ref="ruleFormRef"
							:model="register"
							status-icon
							:rules="rules"
							label-position="top"
							size="large"
							class="w-[300px] font-bold md:w-[450px]">
							<!--    昵称-->
							<el-form-item label="昵称" prop="nickname">
								<el-input v-model.trim="register.nickname" type="text" autocomplete="off" />
							</el-form-item>
							<!--    用户名-->
							<el-form-item label="用户名" prop="username">
								<el-input v-model.trim="register.username" autocomplete="off" />
							</el-form-item>
							<!--    邮箱-->
							<el-form-item label="邮箱" prop="email">
								<el-input v-model.trim="register.email" type="text" autocomplete="off" />
							</el-form-item>
							<!--    密码-->
							<el-form-item label="密码" prop="password">
								<el-input v-model.trim="register.password" type="password" autocomplete="off" />
							</el-form-item>
							<!--  确定密码  -->
							<el-form-item label="确定密码" prop="re_password">
								<el-input v-model.trim="register.re_password" type="password" autocomplete="off" />
							</el-form-item>
							<!--      注册按钮      -->
							<el-form-item>
								<button
									class="w-[300px] md:w-[450px] btn btn-md rounded-[15px] border-none bg-primary_1 hover:bg-primary_2"
									@click="register_Fn(ruleFormRef)">
									<Loading :isShow="store.isShowRegisterLoading" type="bars"></Loading>
									注册
								</button>
							</el-form-item>
							<!--      已有账号，去登陆      -->
							<div class="text_container">
								<span class="link_style text-light_text_secondary">以后账号？</span>
								<span @click="go_login_Fn" class="link_go text-link_2">去登陆</span>
							</div>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from 'vue'
import { ValidateData_Fn, rules } from '@/views/validation/register.ts'
import { UserStore } from '@/store/models/user'
import { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
// 获取el-form组件
const ruleFormRef = ref()
// 获取store
const store = UserStore()
// 获取router
const router = useRouter()
// 定义注册model
const ruleForm = reactive({
	register: {
		nickname: '',
		username: '',
		email: '',
		password: '',
		re_password: ''
	}
})
const { register } = toRefs(ruleForm)

// 监听密码
watch(
	() => register.value.password,
	(password) => {
		ValidateData_Fn(password)
	},
	{
		immediate: true
	}
)
// 返回登录页
const go_login_Fn = () => {
	router.push('/login')
}
// 注册方法
const register_Fn = (formEl: FormInstance) => {
	formEl.validate((valid) => {
		if (valid) {
			store.isShowRegisterLoading = true
			store.User_Register_Fn(ruleForm.register)
		}
	})
}
</script>

<style scoped lang="scss">
// input
:deep(.el-input__wrapper) {
	height: 45px;
	border-radius: 15px;
	background-color: rgb(255, 251, 240) !important;
}

:deep(.el-form-item__label::before) {
	content: '*';
	color: #f56c6c;
	margin: 0 4px;
}
</style>
