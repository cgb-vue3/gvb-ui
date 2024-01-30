import Cookies from 'js-cookie'

// 存储
export const Set_Cookie = (cookieName: string, data, time: Date) => {
	Cookies.set(cookieName, data, { expires: time })
}
// 获取token
export const Get_Cookie = (cookieName: string): string | undefined => {
	return Cookies.get(cookieName)
}

// 清除token
export const Remove_Cookie = (cookieName: string) => {
	return Cookies.remove(cookieName)
}
