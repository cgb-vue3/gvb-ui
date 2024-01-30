import { defineStore } from 'pinia'
import { Upload_Images_Api } from '@/api/upload'
import { ref } from 'vue'

export const UploadStore = defineStore('UPLOAD', () => {
	const uploadOption = ref({
		banner: {
			title: '上传封面'
		},
		avatar: {
			title: '上传头像'
		}
	})

	// 上传图片
	const UploadImages_Fn = async (file) => {
		const formData = new FormData()
		formData.append('images', file)
		try {
			return await Upload_Images_Api(formData)
		} catch (e) {
			return e
		}
	}
	return {
		uploadOption,
		UploadImages_Fn
	}
})
