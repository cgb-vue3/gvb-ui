import request from '@/api/request.ts'

enum API {
	UPLOAD_IMAGES_URL = '/v1/images'
}

// 登录接口
export const Upload_Images_Api = (formData: FormData) =>
	request.post(API.UPLOAD_IMAGES_URL, formData)
