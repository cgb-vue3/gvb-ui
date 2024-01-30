import { defineStore } from 'pinia'
import { Params_Type, Weather_Type } from '@/api/layout/home/type.ts'
import { ref } from 'vue'
import { GaoDeWeather_Api, GetIp_Api } from '@/api/layout/home'
import { GaoDe } from '@/config'
import { ParseWeather_Fn } from '@/pkg/getWeather.ts'
import { Get_Cookie, Set_Cookie } from '@/pkg/token.ts'

export const WeatherStore = defineStore(
	'WEATHER',
	() => {
		// 城市名
		const cityName = ref(Get_Cookie('cityName'))

		// 天气数据
		const weatherInfo = ref()

		// 获取高德天气数据
		const GetGaoDeWeather_Fn = async (exTime: Date): Promise<Weather_Type> => {
			try {
				const params = {
					key: GaoDe.key
				}

				// 获取ip信息,将地址存入本地
				const r = await GetIp_Api(params)
				Set_Cookie('cityName', r.data.city, exTime)

				try {
					const cityParams: Params_Type = {
						key: GaoDe.key,
						extensions: GaoDe.extensions,
						city: cityName.value
					}
					const res = await GaoDeWeather_Api(cityParams)
					weatherInfo.value = ParseWeather_Fn(res.data.forecasts)
				} catch (e) {
					return
				}
			} catch (e) {
				return
			}
		}

		return {
			GetGaoDeWeather_Fn,
			cityName,
			weatherInfo
		}
	}
	// {
	// 	persist: {
	// 		enabled: true
	// 	}
	// }
)
