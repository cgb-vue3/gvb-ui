<template>
	<div v-loading="loading" class="mainContainer flex justify-between">
		<!--    card-start-->
		<div class="w-[20%] h-[100%]">
			<card></card>
		</div>
		<!--    card-end-->
		<!--    information-start-->
		<div
			class="w-[78%] h-[100%] px-4 bg-light_bg dark:bg-dark_comps_bg text-light_text dark:text-dark_text flex flex-col justify-between">
			<!--      header-start-->
			<p class="w-[100%] h-[50px] flex items-center text-xl">个人信息设置</p>
			<!--      header-ent-->
			<!--      setting-start-->
			<div class="w-[100%] h-[750px] flex">
				<el-tooltip v-if="!isEditing" content="请先进入编辑状态" placement="top">
					<el-form ref="ruleFormRef" :model="ruleForm" label-position="top" class="w-[350px]">
						<el-form-item label="昵称" :rules="rules.nickname" prop="nickname">
							<el-input :disabled="!isEditing" v-model="ruleForm.nickname"></el-input>
						</el-form-item>
						<el-form-item label="手机号" :rules="rules.phone" prop="phone">
							<el-input :disabled="!isEditing" v-model="ruleForm.phone"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" :rules="rules.email" prop="email">
							<el-input :disabled="!isEditing" v-model="ruleForm.email"></el-input>
						</el-form-item>
						<el-form-item label="微信号">
							<el-input :disabled="!isEditing" v-model="ruleForm.WeChat"></el-input>
						</el-form-item>
						<el-form-item label="个人简介">
							<el-input
								:disabled="!isEditing"
								v-model="ruleForm.sign"
								:rows="4"
								type="textarea"
								placeholder="Please input" />
						</el-form-item>
						<el-form-item label="性别" :rules="rules.gender" prop="gender">
							<el-select
								:disabled="!isEditing"
								clearable
								v-model="ruleForm.gender"
								placeholder="选择性别"
								size="large"
								style="width: 170px">
								<el-option
									v-for="item in genderOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
						<div class="flex justify-between">
							<el-form-item label="省">
								<el-select
									:disabled="!isEditing"
									clearable
									filterable
									remote
									:loading="provinceLoading"
									:filter-method="handleProvinceFilter"
									v-model="selectedProvince"
									placeholder="选择省份"
									size="large"
									style="width: 170px">
									<el-option
										v-for="item in provinceOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
							<el-form-item label="城市">
								<el-select
									clearable
									filterable
									v-model="selectedCity"
									placeholder="选择城市"
									size="large"
									style="width: 170px"
									:disabled="!isEditing">
									<el-option
										v-for="item in cityOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value" />
								</el-select>
							</el-form-item>
						</div>
						<el-form-item>
							<!-- 编辑按钮 -->
							<el-button style="width: 350px" type="primary" @click="submitForm(ruleFormRef)">
								{{ isEditing ? '保存' : '编辑' }}
							</el-button>
						</el-form-item>
					</el-form>
				</el-tooltip>
				<el-form v-else ref="ruleFormRef" :model="ruleForm" label-position="top" class="w-[350px]">
					<el-form-item label="昵称" :rules="rules.nickname" prop="nickname">
						<el-input :disabled="!isEditing" v-model="ruleForm.nickname"></el-input>
					</el-form-item>
					<el-form-item label="手机号" :rules="rules.phone" prop="phone">
						<el-input :disabled="!isEditing" v-model="ruleForm.phone"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" :rules="rules.email" prop="email">
						<el-input :disabled="!isEditing" v-model="ruleForm.email"></el-input>
					</el-form-item>
					<el-form-item label="微信号">
						<el-input :disabled="!isEditing" v-model="ruleForm.WeChat"></el-input>
					</el-form-item>
					<el-form-item label="个人简介">
						<el-input
							:disabled="!isEditing"
							v-model="ruleForm.sign"
							:rows="4"
							type="textarea"
							placeholder="Please input" />
					</el-form-item>
					<el-form-item label="性别" :rules="rules.gender" prop="gender">
						<el-select
							:disabled="!isEditing"
							clearable
							v-model="ruleForm.gender"
							placeholder="选择性别"
							size="large"
							style="width: 170px">
							<el-option
								v-for="item in genderOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value" />
						</el-select>
					</el-form-item>
					<div class="flex justify-between">
						<el-form-item label="省">
							<el-select
								:disabled="!isEditing"
								clearable
								@clear="clearProvince"
								filterable
								remote
								:loading="provinceLoading"
								:filter-method="handleProvinceFilter"
								v-model="selectedProvince"
								placeholder="选择省份"
								size="large"
								style="width: 170px">
								<el-option
									v-for="item in provinceOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
						<el-form-item label="城市">
							<el-tooltip v-if="!selectedProvince" content="请先选择省份" placement="top">
								<el-select
									filterable
									v-model="selectedCity"
									placeholder="选择城市"
									size="large"
									style="width: 170px"
									:disabled="!selectedProvince">
									<el-option
										v-for="item in cityOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value" />
								</el-select>
							</el-tooltip>
							<el-select
								clearable
								v-else
								filterable
								v-model="selectedCity"
								placeholder="选择城市"
								size="large"
								style="width: 170px"
								:disabled="!selectedProvince">
								<el-option
									v-for="item in cityOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
					</div>
					<el-form-item>
						<!-- 编辑按钮 -->
						<el-button style="width: 350px" type="primary" @click="submitForm(ruleFormRef)">
							{{ isEditing ? '保存' : '编辑' }}
						</el-button>
					</el-form-item>
				</el-form>
				<div class="w-[400px] ml-20 flex flex-col items-center space-y-4">
					<el-avatar class="text-2xl" v-if="ruleForm.avatar == ''" :size="200">暂无头像</el-avatar>
					<el-avatar v-else :src="ruleForm.avatar" :size="200"></el-avatar>
					<el-drawer
						class="bg-light_bg dark:bg-dark_bg text-light_text dark:text-dark_text"
						:append-to-body="drawerOption.append_to_body"
						v-model="drawerOption.isOpen"
						:before-close="handleClose"
						:size="drawerOption.size"
						:close-on-click-modal="drawerOption.close_on_click_modal"
						:close-on-press-escape="drawerOption.close_on_press_escape"
						:direction="drawerOption.direction">
						<template #header>
							<span class="text-light_text dark:text-dark_text">{{ drawerOption.title }}</span>
						</template>
						<gvb_upload
							@upload="upload"
							class="flex flex-col items-center"
							:upload-option="uploadStore.uploadOption.avatar" />
						<Gvb_imgList
							@TransferImagesPath="TransferImagesPath"
							v-loading="!imageListStore.list"
							:drawer-visible="visibleStore.isDrawerVisible"
							:imageList="imageListStore.list" />
						<Gvb_paging :store="imageListStore" :getPag_Fn="imageListStore.GetImagePagList_Fn" />
						<template #footer>
							<div style="flex: auto">
								<el-button @click="drawerOption.isOpen = false">关闭</el-button>
								<el-button type="primary" @click="confirmClick">保存</el-button>
							</div>
						</template>
					</el-drawer>
					<el-button @click="controlDrawerOpening">更新头像</el-button>
				</div>
			</div>
			<!--      setting-end-->
		</div>
		<!--    information-end-->
	</div>
</template>

<script setup lang="ts">
import Card from '@/views/system/personalCenter/comps/card.vue'
import 'element-plus/theme-chalk/el-message-box.css'
import { ElMessageBox } from 'element-plus'
import { ref, watch, onMounted } from 'vue'
import { Province_Api } from '@/api/layout/home'
import { GaoDe } from '@/config'
import { FormInstance } from 'element-plus'
import Gvb_upload from '@/components/Gvb_comps/Gvb_upload.vue'
import { UploadStore } from '@/store/models/upload'
import { UserStore } from '@/store/models/user'
import { ImageListStore } from '@/store/models/imageList'
import { EditUser_Api } from '@/api/layout/userManage/userList'
import { UpErrorMessage_Fn, UpSuccessMessage_Fn } from '@/pkg/message.ts'
import Gvb_imgList from '@/components/Gvb_comps/Gvb_imgList.vue'
import { VisibleStore } from '@/store/models/visible'
const uploadStore = UploadStore()
const userStore = UserStore()
const imageListStore = ImageListStore()
const visibleStore = VisibleStore()
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
	nickname: userStore.userInfo.nickname,
	phone: userStore.userInfo.phone,
	email: userStore.userInfo.email,
	sign: userStore.userInfo.slogan,
	gender: userStore.userInfo.sex,
	WeChat: userStore.userInfo.wechat,
	avatar: userStore.userInfo.avatar
})
const loading = ref(false)
// 获取省份加载状态
const provinceLoading = ref(false)
const selectedProvince = ref('')
const selectedCity = ref('')
const genderOptions = ref([
	{
		value: '男',
		label: '男'
	},
	{
		value: '女',
		label: '女'
	}
])
const provinceOptions = ref([])
const cityOptions = ref([])
const addr = ref(userStore.userInfo.addr)
const drawerOption = ref({
	title: '媒体库',
	isOpen: false,
	direction: 'rtl',
	append_to_body: true,
	size: '600',
	close_on_click_modal: true,
	close_on_press_escape: false
})

// 用于判断是否更换了头像
const updateAvatarFlag = ref(false)

onMounted(() => {
	// 在组件挂载时调用计算方法
	initializeLocation()
	getImagesList()
	loading.value = true
	setTimeout(() => {
		loading.value = false
	}, 2000)
})

const handleClose = (done: () => void) => {
	if (!updateAvatarFlag.value) {
		drawerOption.value.isOpen = false
		return
	}
	ElMessageBox.confirm('你还未更换头像，确定要退出吗？', '确认信息', {
		center: true // 使用 center 属性来将 MessageBox 放置在页面正中间
	})
		.then(() => {
			done()
		})
		.catch(() => {
			// catch error
		})
}

const controlDrawerOpening = () => {
	drawerOption.value.isOpen = !drawerOption.value.isOpen
	updateAvatarFlag.value = true
}

const confirmClick = () => {
	updateUserInfo()
}

// 获取imgList组件中选中的图片path
const TransferImagesPath = (path) => {
	ruleForm.value.avatar = path
}

// 组件创建调用接口
const getImagesList = () => {
	imageListStore.GetImagePagList_Fn()
}

// 重新获取用户信息
const reacquireUserInfo = () => {
	userStore.GetUserInfo_Fn()
}

// 清除省份信息，清除城市信息
const clearProvince = () => {
	selectedCity.value = ''
	cityOptions.value = []
	reacquireUserInfo()
}

// 是否处于编辑状态的状态变量
const isEditing = ref(false)

const initializeLocation = () => {
	const addrArray = addr.value.split('-')

	// 如果拆分结果包含两个元素，第一个元素是省份，第二个元素是城市
	if (addrArray.length === 2) {
		selectedProvince.value = addrArray[0]
		selectedCity.value = addrArray[1]
	} else {
		console.error('字符串格式不符合预期')
	}
}

// 验证规则
const rules = ref({
	nickname: [{ required: true, message: '请输入昵称', trigger: ['blur', 'change'] }],
	phone: [
		{ required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
		{ pattern: /^[0-9]{11}$/, message: '手机号必须是11位数字', trigger: ['blur', 'change'] }
	],
	email: [
		{ required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
		{ type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
	],
	gender: [{ required: true, message: '请选择性别', trigger: ['blur', 'change'] }]
})

const submitForm = (formEl: FormInstance | undefined) => {
	if (!isEditing.value) {
		isEditing.value = !isEditing.value
		return
	} else isEditing.value = !isEditing.value

	if (!formEl) return
	formEl.validate((valid) => {
		if (valid) {
			updateUserInfo()
		} else {
			UpErrorMessage_Fn('用户信息未通过验证')
			return false
		}
	})
}

const updateUserInfo = async () => {
	loading.value = true
	try {
		let role = ''
		if (userStore.userInfo.role == '超级管理员') {
			role = '1'
		} else if (userStore.userInfo.role == '管理员') {
			role = '2'
		} else if (userStore.userInfo.role == '普通用户') {
			role = '3'
		}
		let addr = ''
		if (selectedCity.value == '') {
			addr = selectedProvince.value
		} else {
			addr = selectedProvince.value + '-' + selectedCity.value
		}
		const data = {
			id: userStore.userInfo.id,
			nickname: ruleForm.value.nickname,
			email: ruleForm.value.email,
			role: role,
			phone: ruleForm.value.phone,
			slogan: ruleForm.value.sign,
			avatar: ruleForm.value.avatar,
			sex: ruleForm.value.gender,
			wechat: ruleForm.value.WeChat,
			addr: addr
		}
		await EditUser_Api(data)
		reacquireUserInfo()
		updateAvatarFlag.value = false
		setTimeout(() => {
			loading.value = false
			UpSuccessMessage_Fn('编辑成功')
		}, 2000)
	} catch (e) {
		loading.value = false
		UpErrorMessage_Fn('编辑失败')
		return e
	}
}

// 上传图片
const upload = async (file) => {
	try {
		const r = await uploadStore.UploadImages_Fn(file.file, 'avatar')
		await imageListStore.GetImagePagList_Fn()
		// 判断上传的图片是否存在
		if (r.data.add_file_list[0].is_success) {
			ruleForm.value.avatar = r.data.add_file_list[0].url
			await updateUserInfo()
		} else {
			UpErrorMessage_Fn('图片已存在，更新头像失败！')
			reacquireUserInfo()
		}
	} catch (e) {
		return e
	}
}

// 获取省数据
const handleProvinceFilter = async (query: string) => {
	// 如果输入为空，则不执行搜索
	if (!query.trim()) {
		provinceOptions.value = []
		return
	}

	// 开始加载省份数据
	provinceLoading.value = true
	try {
		// 在这里调用你的搜索省份的接口
		const res = await Province_Api({
			key: GaoDe.key,
			keywords: query
		})

		console.log(res)

		// 筛选出省份的结果
		const provinceResults = res.data.districts.filter(
			(district: any) => district.level === 'province'
		)

		// 更新 provinceOptions
		provinceOptions.value = provinceResults.map((province: any) => ({
			value: province.name,
			label: province.name
		}))
		// 清空城市信息
		cityOptions.value = []
		// 省份信息获取成功，停止加载状态
		provinceLoading.value = false
	} catch (e) {
		console.log(e)
		// 省份信息获取成功，停止加载状态
		provinceLoading.value = false
	}
}
// 获取城市数据
const handleCityFilter = async () => {
	// 如果输入为空或者未选中省份，则不执行搜索
	if (!selectedProvince.value) {
		return
	}

	const params = {
		key: GaoDe.key,
		keywords: selectedProvince.value
	}

	try {
		// 在这里调用你的搜索城市的接口，传递选中的省份信息
		const res = await Province_Api(params)

		// 更新 cityOptions
		cityOptions.value = processCityData(res.data.districts[0].districts)
	} catch (e) {
		console.error(e)
	}
}

// 解析城市数据
const processCityData = (cityArray) => {
	return cityArray.map((city) => ({
		value: city.name,
		label: city.name
	}))
}

// 监听选中省份的变化，当选中省份变化时调用获取城市信息的方法
watch(
	() => selectedProvince.value,
	() => {
		handleCityFilter()
	}
)
</script>

<style scoped></style>
