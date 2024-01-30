import axios from 'axios'
import { Get_Cookie } from '@/pkg/token.ts'
import { UpErrorMessage_Fn, UpSuccessMessage_Fn, UpWarningMessage_Fn } from '@/pkg/message.ts'
/** 环境变量 */
const ENV = import.meta.env
/** 创建axios实例 */
const request = axios.create({
	baseURL: ENV.VITE_APP_BASE_URL,
	timeout: 6000
})

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		// 发请求带上token
		const token: string | undefined = Get_Cookie('token')
		if (token) {
			config.headers = config.headers || {}
			config.headers['Authorization'] = token
		}

		// 配置密钥
		/* ------------*/
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
request.interceptors.response.use(
	(resp: any) => {
		// 响应成功的拦截
		if (resp) {
			// 判断code码
			const code = resp.data.code
			const message = resp.data.message
			if (code == 1031) {
				// 获取用户信息成功
				return resp.data
			} else if (code == 1032) {
				return resp.data
			} else if (code == 1038) {
				return resp.data
			} else if (code == 1039) {
				return resp.data
			} else if (code == 1040) {
				return resp.data
			} else if (code == 1042) {
				return resp.data
			} else if (code == 1041) {
				// 上传图片
				// 图片列表
				const imgList = resp.data.data.add_file_list
				imgList.forEach((i) => {
					// 判断上传的图片是否存在
					if (i.is_success) {
						UpSuccessMessage_Fn(i.file_name + i.message, 3000)
					} else {
						UpWarningMessage_Fn(i.file_name + i.message, 3000)
					}
				})
				return resp.data
			} else if (code == 1043) {
				return resp.data
			} else if (code == 1053) {
				// 重置密码
				return resp.data
			} else if (code == 1061) {
				return resp.data
			} else if (code == 1069) {
				return resp.data
			}
			UpSuccessMessage_Fn(message, 2000)
			return resp.data
		}
	},
	(error) => {
		// 处理错误信息
		if (error) {
			if (error.code === 'ERR_NETWORK') {
				UpErrorMessage_Fn('网络连接错误,请稍后重试')
				return Promise.reject(error.response)
			} else if (error.code === 'ECONNABORTED') {
				UpErrorMessage_Fn('服务异常,请稍后重试')
				return Promise.reject(error.response)
			} else if (error.response.data.code === 1037) {
				return Promise.reject(error.response)
			} else if (error.response.data.code === 1014) {
				UpErrorMessage_Fn('请先登录')
				return Promise.reject(error.response)
			}
			const message = error.response.data.message
			UpErrorMessage_Fn(message)
			return Promise.reject(error.response.data)
		}
	}
)

export default request
