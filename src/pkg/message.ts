import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

export const UpSuccessMessage_Fn = (message: string, time: number = 3000) => {
	ElMessage.success({
		showClose: true,
		grouping: true,
		message,
		duration: time
	})
}

export const UpWarningMessage_Fn = (message: string, time: number = 3000) => {
	ElMessage.warning({
		showClose: true,
		grouping: true,
		message,
		duration: time
	})
}
export const UpErrorMessage_Fn = (message: string, time: number = 3000) => {
	ElMessage.error({
		showClose: true,
		grouping: true,
		message,
		duration: time
	})
}

export const UpMessage_Fn = (message: string, time: number = 3000) => {
	ElMessage({
		showClose: true,
		grouping: true,
		message,
		duration: time
	})
}
