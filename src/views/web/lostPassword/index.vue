<template>
	<!--  背景层-->
	<div class="Page_bg">
		<!-- 图形验证码 -->
		<Vcode :show="isShow" @success="onSuccess(emailRef)" @close="onClose" />
		<!--		容器-->
		<div class="w-[1100px] h-[600px] shadow-2xl Page_container">
			<div class="max-w-screen-xl mx-auto flex">
				<!--		左边-->
				<div class="hidden w-[450px] h-[600px] dark:bg-dark_bg Page_left lg:flex">
					<!--				文字背景-->
					<div
						class="w-[380px] h-[380px] bg-[#fffef8] rounded-xl flex flex-col justify-center items-center">
						<!--          提示标题-->
						<div class="w-[380px] h-[50px] flex justify-start items-center">
							<div class="w-[60px] h-[50px] flex justify-center items-center">
								<svg-icon name="tips" size="30px"></svg-icon>
							</div>
							<p class="text-orange-700 font-bold text-lg">{{ tipsTitle }}</p>
						</div>
						<!--          提示文字-->
						<div
							style="white-space: pre-wrap"
							class="w-[350px] h-[330px] font-serif tracking-[2px] truncate align-baseline leading-6">
							<p>{{ tipsText }}</p>
						</div>
					</div>
				</div>
				<!--    右边-->
				<div class="w-[450px] h-[600px] Page_right md:w-[650px]">
					<!--        标题-->
					<div class="w-[450px] h-[80px] Page_title md:w-[650px]">
						<p>{{ title }}</p>
					</div>
					<!--  表单      -->
					<div class="w-[450px] h-[520px] Page_main md:w-[650px]">
						<div>
							<!--   发送邮箱-->
							<div>
								<el-form
									ref="emailRef"
									:model="userEmail"
									status-icon
									size="large"
									:rules="emailRules"
									label-position="top"
									class="demo-dynamic w-[300px] font-bold md:w-[500px]">
									<!--      邮箱-->
									<el-form-item :label="emailLabel" prop="email">
										<el-input v-model.trim="userEmail.email" type="text" autocomplete="off">
											<template #suffix>
												<el-button :disabled="isDisable" @click="send_email_Fn(emailRef)">
													<Loading :isShow="store.isShowLoading" type="bars"></Loading>
													{{ send_email_msg }}
												</el-button>
											</template>
										</el-input>
									</el-form-item>
									<!--    发送邮件按钮-->
								</el-form>
							</div>
							<!--    修改密码-->
							<div>
								<el-form
									ref="changeRef"
									:model="change_pwd"
									status-icon
									size="large"
									:rules="lostPasswordRules"
									label-position="top"
									class="font-bold w-[300px] md:w-[500px]">
									<!--        验证码-->
									<el-form-item :rules="code" :label="codeLabel" prop="code">
										<el-input v-model.trim="change_pwd.code" />
									</el-form-item>
									<!--        密码-->
									<el-form-item :label="pwdLabel" prop="password">
										<el-input v-model.trim="change_pwd.password" />
									</el-form-item>
									<!--        重复密码-->
									<el-form-item :label="rePwdLabel" prop="re_password">
										<el-input v-model.trim="change_pwd.re_password" />
									</el-form-item>
									<!--        修改密码按钮-->
									<button
										class="w-[300px] md:w-[500px] btn btn-md rounded-[15px] border-none bg-primary_1 hover:bg-primary_2"
										@click="Change_pwd_Fn(changeRef)">
										<Loading :isShow="store.isShowChangeLoading" type="bars"></Loading>
										{{ changePwdBtnText }}
									</button>
									<!--忘记密码-->
									<div class="h-[40px] text_container">
										<span class="link_style text-light_text_secondary">{{ changeText }}</span>
										<span class="link_go self-end text-link_2" @click="go_login_Fn">
											{{ toLoginText }}
										</span>
									</div>
								</el-form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch, onBeforeMount } from 'vue'
import { UserStore } from '@/store/models/user'
import { FormInstance } from 'element-plus'
import { ValidateData_Fn, lostPasswordRules, emailRules } from '@/views/validation/lost_password.ts'
import { UpErrorMessage_Fn, UpWarningMessage_Fn } from '@/pkg/message.ts'
import { useRouter } from 'vue-router'
import Vcode from 'vue3-puzzle-vcode'
import { LostPassword_Conf } from '@/config'
// store
const store = UserStore()
const router = useRouter()
// 获取el-form组件对象
let emailRef = ref()
let changeRef = ref()
// 是否显示图片验证码
const isShow = ref(false)
// 修改密码按钮文字
const changePwdBtnText = LostPassword_Conf.ChangePwdBtnText
// 是否加星号
// const required = Required

// // 是否显示加载动画
// const isShowLoading = ref(false)

// 是否禁止发送邮件
const isDisable = ref(false)
// 倒计时
const countTime = ref(0)
// 定时器
const timekeeping = ref()

// 标题
const title = LostPassword_Conf.Title
const emailLabel = LostPassword_Conf.EmailLabel
const codeLabel = LostPassword_Conf.CodeLabel
const pwdLabel = LostPassword_Conf.PwdLabel
const rePwdLabel = LostPassword_Conf.RePwdLabel

// 提示文字
const tipsTitle = LostPassword_Conf.TipsTitle
const tipsText = LostPassword_Conf.TipsText
const changeText = LostPassword_Conf.ChangePromptText
const toLoginText = LostPassword_Conf.ToLoginText

// 响应数据
const lost_pwd_Data = reactive({
	// 邮箱参数
	userEmail: {
		email: ''
	},
	// 修改密码参数
	change_pwd: {
		id: 0,
		// 验证码
		code: '',
		// 密码
		password: '',
		// 重复密码
		re_password: ''
	}
})

// 发送邮件按钮信息
const send_email_msg = ref(LostPassword_Conf.SendEmailText)
// 修改密码按钮信息

// 解构
const { userEmail, change_pwd } = toRefs(lost_pwd_Data)

// 监听密码
watch(
	() => change_pwd.value.password,
	(password) => {
		ValidateData_Fn(password)
	},
	{
		immediate: true
	}
)

onBeforeMount(() => {
	// 取到倒计时
	countTime.value = localStorage.getItem('countTime')
	timer(countTime.value)
})

// 先判断邮箱格式是否正确，如果正确弹出图形验证码框。验证成功后去发送邮件
const onShow = () => {
	isShow.value = true
}

// 关闭图形验证码
const onClose = () => {
	isShow.value = false
}

const timer = (time) => {
	timekeeping.value = setInterval(() => {
		if (time <= 0) {
			clearInterval(timekeeping.value)
			isDisable.value = false
			send_email_msg.value = LostPassword_Conf.SendEmailText
			return
		}
		// 禁止点击发送按钮
		isDisable.value = true
		// 关闭加载状态
		store.isShowLoading = false
		send_email_msg.value = time + LostPassword_Conf.SendSuccessEmailText
		time--
		// 存到本地
		localStorage.setItem('countTime', time)
	}, 1000)
}

// 图形验证成功
const onSuccess = () => {
	onClose() // 验证成功，手动关闭模态框
	// 验证成功后显示加载状态，禁止再次点击
	store.isShowLoading = true
	// 禁止点击发送按钮
	isDisable.value = true
	send_email_msg.value = '发送中'
	// 成功后发送邮件
	store.User_send_email_Fn(userEmail.value).then((r) => {
		if (r.code == 1000) {
			// 邮件发送成功后做时间限制
			countTime.value = LostPassword_Conf.CountTime
			timer(countTime.value)
		} else {
			// 禁止点击发送按钮
			send_email_msg.value = LostPassword_Conf.SendEmailText
			isDisable.value = false
			store.isShowLoading = false
		}
	})
}

// 发送邮件
const send_email_Fn = (emailEl: FormInstance) => {
	emailEl.validate((valid) => {
		if (!valid) {
			UpWarningMessage_Fn('邮件地址为空或格式错误')
			return
		}
		// 格式正确显示图片验证码
		onShow()
	})
}

// 修改密码
const Change_pwd_Fn = (changePwdEl: FormInstance) => {
	changePwdEl.validate((valid) => {
		if (valid) {
			store.isShowChangeLoading = true
			// 判断用户id是否存在，如果不存在说明用户没有发送邮件，不予修改密码
			if (store.ID == undefined) {
				store.isShowChangeLoading = false
				UpErrorMessage_Fn('请先发送邮件')
				return
			}
			store.User_change_pwd_Fn(change_pwd.value)
		}
	})
}

// 跳转登录页
const go_login_Fn = () => {
	router.push('/login')
}
</script>
<style scoped lang="scss">
:deep(.el-input__wrapper) {
	height: 45px;
	border-radius: 15px;
	background-color: rgb(255, 251, 240) !important;
}
.active {
	pointer-events: none;
	background: #000;
}
// button
:deep(.el-button) {
	background-color: #fffbf0;
	color: gray;
	border: none;
}
:deep(.el-button):hover {
	background-color: #fffbf0;
	border: none;
	color: black;
	font-weight: bold;
}
:deep(.el-form-item__label::before) {
	content: '*';
	color: #f56c6c;
	margin: 0 4px;
}
</style>
