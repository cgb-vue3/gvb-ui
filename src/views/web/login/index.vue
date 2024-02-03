<template>
	<div class="Page_bg">
		<!--		登录容器-->
		<div class="w-[1100px] h-[600px] Page_container">
			<div class="max-w-screen-xl mx-auto flex">
				<!--      左侧-->
				<div class="hidden w-[500px] h-[600px] dark:bg-dark_bg Page_left lg:flex">
					<svg-icon name="login" size="480px"></svg-icon>
				</div>
				<!--      右侧-->
				<div class="w-[450px] h-[600px] Page_right md:w-[600px]">
					<!--     头部 -->
					<div class="w-[450px] h-[100px] Page_title md:w-[600px]">
						<span>欢迎登录</span>
					</div>
					<!--   登录信息     -->
					<div class="w-[450px] h-[500px] Page_main md:w-[600px]">
						<el-form
							size="large"
							ref="ruleFormRef"
							:model="loginRuleForm"
							status-icon
							:rules="rules"
							label-position="top"
							class="w-[300px] font-bold md:w-[450px]">
							<!-- 用户名 -->
							<el-form-item label="用户名" prop="username">
								<el-input v-model.trim="loginRuleForm.username" type="text" autocomplete="off" />
							</el-form-item>

							<!-- 密码 -->
							<el-form-item label="密码" prop="password">
								<el-input
									v-model.trim="loginRuleForm.password"
									type="password"
									autocomplete="off" />
							</el-form-item>

							<!--登录按钮-->
							<el-form-item>
								<button
									@click="login_Fn(ruleFormRef)"
									class="btn btn-md rounded-[15px] border-none w-[300px] bg-success_1 hover:bg-success_2 md:w-[450px]">
									<Loading :isShow="store.isShowLoginLoading" type="bars"></Loading>
									登录
								</button>
							</el-form-item>
							<!-- 注册按钮 -->
							<el-form-item>
								<button
									@click.prevent="go_register_Fn()"
									class="btn btn-md rounded-[15px] w-[300px] border-none bg-primary_1 hover:bg-primary_2 md:w-[450px]">
									注册
								</button>
							</el-form-item>

							<!--忘记密码-->
							<div class="text_container">
								<span class="link_style text-light_text_secondary">忘记密码？</span>
								<span class="link_go text-link_2" @click="lost_password_Fn">重置密码</span>
							</div>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { UserStore } from '@/store/models/user'
import { rules } from '@/views/validation/login.ts'
import { useRouter } from 'vue-router'
import { Greeting_Fn } from '@/pkg/greeting.ts'
import { UpSuccessNotification_Fn } from '@/pkg/Notification.ts'
import { JWT_Type } from '@/api/user/type.ts'
import jwtDecode from 'jwt-decode'
import { TimestampToTime_Fn } from '@/pkg/time.ts'
import { Set_Cookie } from '@/pkg/token.ts'

// 获取el-form组件对象
let ruleFormRef = ref()
// 获取用户仓库
let store = UserStore()

// 获取router
const router = useRouter()

// 响应式数据
const state = reactive({
	loginRuleForm: {
		username: 'superAdmin',
		password: '1233456'
	}
})
// 解构数据
let { loginRuleForm } = toRefs(state)

// 登录的方法
const login_Fn = (formEl: FormInstance) => {
	formEl.validate((valid) => {
		if (valid) {
			store.isShowLoginLoading = true
			store.User_login_Fn(state.loginRuleForm).then((res) => {
				if (res == undefined) return
				// 登录成功
				// token存在，存储token
				if (res.data.token) {
					const authToken = res.data.token
					store.token = authToken
					// 解析token
					const jwt: JWT_Type = jwtDecode(authToken)
					// 取出token的过期时间，将其设置为本地cookie中token的过期时间
					const date = new Date(TimestampToTime_Fn(jwt.exp))
					// 将token存到本地
					Set_Cookie('token', 'Bearer ' + authToken, date)
				}
				// 登录成功后去获取用户数据
				store.GetUserInfo_Fn().then((infoRes) => {
					if (infoRes.code == 1032) {
						router.push('/layout')
						// 获取当前时段
						const greeting: string = Greeting_Fn()
						UpSuccessNotification_Fn(
							greeting + ',' + infoRes.data.userInfo.nickname,
							'欢迎回来！',
							1500
						)
					}
				})
			})
		}
	})
}

// 忘记密码
const lost_password_Fn = () => {
	router.push('/lostPassword')
}

// 注册
const go_register_Fn = () => {
	router.push('/register')
}
</script>

<style scoped lang="scss">
// input
:deep(.el-input__wrapper) {
	height: 45px;
	border-radius: 15px;
	background-color: rgb(255, 251, 240) !important;
}
// button
:deep(.el-button) {
	border-radius: 15px;
}
:deep(.el-form-item__label::before) {
	content: '*';
	color: #f56c6c;
	margin: 0 4px;
}
</style>
