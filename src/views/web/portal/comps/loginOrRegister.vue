<template>
	<div
		class="w-full max-w-sm mx-auto overflow-hidden bg-light_bg dark:bg-dark_comps_bg myHeader_text rounded-lg dark:bg-gray-800">
		<div class="px-6">
			<div class="flex justify-center mx-auto">
				<svg-icon name="log" size="60" />
			</div>

			<h3 class="mt-3 text-2xl font-bold text-center text-gray-600 dark:text-gray-200">欢迎登录</h3>

			<div class="flex items-center justify-center mt-6">
				<span
					@click="showLoginOrRegister = true"
					:class="{ active: showLoginOrRegister }"
					class="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize dark:border-gray-400 dark:text-gray-300">
					登录
				</span>

				<span
					@click="showLoginOrRegister = false"
					:class="{ active: !showLoginOrRegister }"
					class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize dark:border-blue-400 dark:text-white">
					注册
				</span>
			</div>

			<!-- 使用 transition 元素包裹切换的内容 -->
			<transition name="fade" mode="out-in">
				<el-form
					v-if="showLoginOrRegister"
					ref="ruleLoginFormRef"
					model="loginForm"
					label-position="top">
					<el-form-item class="w-full mt-4" prop="username">
						<template #label><span class="myHeader_text">用户名</span></template>
						<el-input
							v-model="loginForm.username"
							class="h-10"
							:rules="rules"
							type="text"
							placeholder="输入您的用户名"
							aria-label="username" />
					</el-form-item>

					<el-form-item class="w-full mt-4" prop="password">
						<template #label>
							<span class="myHeader_text">密码</span>
						</template>
						<el-input
							v-model="loginForm.password"
							class="h-10"
							type="password"
							placeholder="输入您的密码"
							aria-label="Password" />
					</el-form-item>

					<el-button
						@click="submitLoginForm(ruleLoginFormRef)"
						type="primary"
						style="width: 100%; height: 40px"
						class="px-6 mt-4 py-2 text-sm text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400">
						登录
					</el-button>

					<div class="flex items-center justify-center mt-4">
						<a
							href="#"
							class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
							忘记密码？
						</a>
					</div>
					<div class="flex items-center justify-center mt-4">
						<a
							@click="showLoginOrRegister = false"
							href="#"
							class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
							还没账号？去注册
						</a>
					</div>
				</el-form>
				<el-form
					v-else
					ref="ruleRegisterFormRef"
					:rules="rules"
					:model="registerForm"
					label-position="top">
					<el-form-item class="w-full mt-4" prop="nickname">
						<template #label>
							<span class="myHeader_text">昵称</span>
						</template>
						<el-input
							v-model.trim="registerForm.nickname"
							class="h-10"
							placeholder="输入您的昵称"
							aria-label="username" />
					</el-form-item>

					<el-form-item class="w-full mt-4" prop="email">
						<template #label>
							<span class="myHeader_text">邮箱</span>
						</template>
						<el-input
							v-model="registerForm.email"
							class="h-10"
							placeholder="输入您的邮箱"
							aria-label="username" />
					</el-form-item>

					<el-form-item class="w-full mt-4" prop="username">
						<template #label>
							<span class="myHeader_text">用户名</span>
						</template>
						<el-input
							v-model="registerForm.username"
							class="h-10"
							placeholder="输入您的用户名"
							aria-label="username" />
					</el-form-item>

					<el-form-item class="w-full mt-4" prop="password">
						<template #label>
							<span class="myHeader_text">密码</span>
						</template>
						<el-input
							v-model="registerForm.password"
							class="h-10"
							type="password"
							placeholder="输入您的密码"
							aria-label="Password" />
					</el-form-item>

					<el-form-item class="w-full mt-4" prop="re_password">
						<template #label>
							<span class="myHeader_text">确认密码</span>
						</template>
						<el-input
							v-model="registerForm.re_password"
							class="h-10"
							type="password"
							placeholder="确认密码"
							aria-label="Password" />
					</el-form-item>

					<el-button
						type="primary"
						@click="submitRegisterForm(ruleRegisterFormRef)"
						style="width: 100%; height: 40px"
						class="px-6 mt-4 py-2 text-sm text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400">
						注册
					</el-button>

					<div class="flex items-center justify-center mt-4">
						<a
							@click="showLoginOrRegister = true"
							href="#"
							class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
							去登录
						</a>
					</div>
				</el-form>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { UserStore } from '@/store/models/user'
import { JWT_Type } from '@/api/user/type.ts'
import jwtDecode from 'jwt-decode'
import { TimestampToTime_Fn } from '@/pkg/time.ts'
import { Set_Cookie } from '@/pkg/token.ts'
import { ValidateData_Fn, rules } from '@/views/validation/register.ts'

const userStore = UserStore()
const showLoginOrRegister = ref(true)
const ruleLoginFormRef = ref(null)
const loginForm = ref({
	username: 'superAdmin',
	password: '1233456'
})

const ruleRegisterFormRef = ref(null)

const registerForm = ref({
	nickname: 'akita',
	username: 'superAdmin',
	email: '123123@qq.com',
	password: '1233456',
	re_password: '1233456'
})

// 监听密码
watch(
	() => registerForm.value.password,
	(password) => {
		ValidateData_Fn(password)
	},
	{
		immediate: true
	}
)

// 注册
const submitRegisterForm = (formEl) => {
	formEl.validate((valid) => {
		if (valid) {
			userStore.User_Register_Fn(registerForm.value)
		}
	})
}

// 登录
const submitLoginForm = (formEl) => {
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const res = await userStore.User_login_Fn(loginForm.value)
				if (res == undefined) return
				// 登录成功
				// token存在，存储token
				if (res.data.token) {
					userStore.isShowLoginLoading = true
					const authToken = res.data.token
					userStore.token = authToken
					// 解析token
					const jwt: JWT_Type = jwtDecode(authToken)
					// 取出token的过期时间，将其设置为本地cookie中token的过期时间
					const date = new Date(TimestampToTime_Fn(jwt.exp))
					// 将token存到本地
					Set_Cookie('token', 'Bearer ' + authToken, date)
				}
			} catch (e) {
				return e
			}
		}
	})
}
</script>

<style scoped lang="scss">
/* 添加淡入淡出的过渡动画效果 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

/* 设置表单的最大高度，需要根据实际内容高度调整 */
.max-h-form {
	overflow: hidden;
}
/* 定义激活状态下的下边框样式 */
.active {
	border-bottom: 2px solid;
	transition: border-bottom 0.5s ease-in-out;
}
</style>
