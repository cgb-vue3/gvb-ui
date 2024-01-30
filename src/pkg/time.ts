import moment from 'moment'
// 时间戳转换成时间
export const TimestampToTime_Fn = (timestamp: number): string => {
	// 时间戳为10位需*1000，时间戳为13位不需乘1000
	const date = new Date(timestamp * 1000)
	const Y = date.getFullYear() + '-'
	const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	const h = date.getHours() + ':'
	const m = date.getMinutes() + ':'
	const s = date.getSeconds()
	return Y + M + D + h + m + s
}

// 格式化年月日
export const GetNowDate = (): string => {
	const date = new Date()
	// const sign2 = ':'
	const year = date.getFullYear() // 年
	let month = date.getMonth() + 1 // 月
	let day = date.getDate() // 日

	// 给一位数的数据前面加 “0”
	if (month >= 1 && month <= 9) {
		month = '0' + month
	}
	if (day >= 0 && day <= 9) {
		day = '0' + day
	}
	return year + '-' + month + '-' + day
}

// 判断当前是周几
export const GetWeek = (w: number): string => {
	const weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
	return weekArr[w - 1]
}

// 计算时间差
export const ExpiresTime = (objT, exT: string): number => {
	moment.suppressDeprecationWarnings = true
	// 当前日期时间
	const curT = new Date()
	// 当前日期
	const curD = objT.split(' ')[0]
	// 目标日期时间
	const objD = curD + ' ' + exT

	const diff = moment(objD).format('x') - moment(curT).format('x')
	const time = moment.duration(diff)
	const hours = time.hours() //小时差
	const minutes = time.minutes() //分钟差
	// 返回分钟差
	return hours * 60 + minutes
}

export const ParseTime = (time): string => {
	time = time.replace(/-/, '年')
	time = time.replace(/-/, '月')
	time = time.replace(/T/, '日')
	return time.split(':')[0] + ':' + time.split(':')[1]
	//2022年03月16日16:00:00
}

export function CalculateDaysDifference(targetDate: string): number {
	// 解析目标日期字符串
	const targetDateTime = new Date(targetDate)

	// 获取当前日期时间
	const currentDate = new Date()

	// 计算时间差（毫秒）
	const timeDifference = currentDate.getTime() - targetDateTime.getTime()

	// 转换为天数
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

	return daysDifference
}
