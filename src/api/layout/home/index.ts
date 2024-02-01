import axios from 'axios'
import { Params_Type, Weather_Type } from '@/api/layout/home/type.ts'
enum API {
	// 高德获取天气接口
	GAO_DE_WEATHER_URL = 'https://restapi.amap.com/v3/weather/weatherInfo',
	// 高德获取本地ip接口
	CITY_URL = 'https://restapi.amap.com/v3/ip',
	// 高德获取省份接口
	Province_URL = 'https://restapi.amap.com/v3/config/district'
}

// 获取高德天气数据
export const GaoDeWeather_Api = (params: Params_Type): Promise<Weather_Type> => {
	return axios({
		method: 'get',
		url: API.GAO_DE_WEATHER_URL,
		timeout: 5000,
		params
	})
}

// 获取高德天气数据
export const Province_Api = (params: Params_Type): Promise<Weather_Type> => {
	console.log(params)
	return axios({
		method: 'get',
		url: API.Province_URL,
		timeout: 5000,
		params
	})
}

// 获取本地ip信息
export const GetIp_Api = (params: Params_Type) =>
	axios({
		method: 'get',
		url: API.CITY_URL,
		timeout: 5000,
		params
	})
