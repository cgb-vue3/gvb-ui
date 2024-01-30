import { ElNotification } from 'element-plus'
import 'element-plus/es/components/notification/style/css'
export const UpSuccessNotification_Fn = (
	title: string,
	message: string,
	time: number = 3000,
	offset: number = 50
) => {
	ElNotification.success({
		title,
		message,
		showClose: true,
		duration: time,
		offset
	})
}

export const UpWarningNotification_Fn = (
	title: string,
	message: string,
	time: number = 3000,
	offset: number = 50
) => {
	ElNotification.warning({
		title,
		message,
		showClose: true,
		duration: time,
		offset
	})
}

export const UpInfoNotification_Fn = (
	title: string,
	message: string,
	time: number = 3000,
	offset: number = 50
) => {
	ElNotification.info({
		title,
		message,
		showClose: true,
		duration: time,
		offset
	})
}

export const UpErrorNotification_Fn = (
	title: string,
	message: string,
	time: number = 3000,
	offset: number = 50
) => {
	ElNotification.error({
		title,
		message,
		showClose: true,
		duration: time,
		offset
	})
}
