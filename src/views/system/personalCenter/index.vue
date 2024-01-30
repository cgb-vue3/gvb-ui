<template>
	<div>
		<div v-if="!loading">加载中...</div>
		<div v-else>
			<div>
				<h2>个人信息</h2>
				<p>昵称: {{ user.nickname }}</p>
				<p>性别: {{ user.gender }}</p>
				<p>手机号: {{ user.phone }}</p>
				<p>邮箱: {{ user.email }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
	setup() {
		const loading = ref(true)
		const user = ref({
			nickname: '',
			gender: '',
			phone: '',
			email: ''
		})

		onMounted(() => {
			// 模拟从服务器获取用户信息
			fetchUserData()
		})

		const fetchUserData = () => {
			// 使用 axios 发送请求
			// 这里仅为示例，你需要替换成实际的 API 地址和接口
			axios
				.get('https://api.example.com/user')
				.then((response) => {
					user.value = response.data
					loading.value = false
				})
				.catch((error) => {
					console.error('Error fetching user data:', error)
				})
		}

		return {
			loading,
			user
		}
	}
}
</script>

<style></style>
