import { Weather_Type } from '@/api/layout/home/type.ts'
import { ExpiresTime, GetNowDate, GetWeek } from '@/pkg/time.ts'

const weatherList = {
	adCode: '',
	cityName: '',
	exTime: '',
	currentWeather: {
		week: '', // 星期
		date: '', // 日期
		maxTemp: '', //最高温度
		minTemp: '', //最低温度
		weather: '', // 天气类型
		wind: '', // 风向
		power: '', // 风力
		icon: '' // icon图
	},
	futureWeather: []
}

export const ParseWeather_Fn = (weathers: Weather_Type) => {
	// 清空weatherList
	weatherList.futureWeather = []
	const date = GetNowDate()
	weathers.forEach((i) => {
		weatherList.adCode = i.adcode
		weatherList.cityName = i.city
		weatherList.exTime = ExpiresTime(i.reporttime, '24:00:00')

		// 当前的天气
		weatherList.currentWeather = {
			week: GetWeek(i.casts[0].week),
			date: i.casts[0].date,
			maxTemp: i.casts[0].daytemp + '°',
			minTemp: i.casts[0].nighttemp + '°',
			weather: i.casts[0].dayweather,
			wind: i.casts[0].daywind + '风',
			power: i.casts[0].daypower + '级',
			icon: setWeatherIcon(i.casts[0].dayweather)
		}
		// 过滤掉当天的天气
		const filterWeather = i.casts.filter((item) => date != item.date)
		filterWeather.forEach((item) => {
			weatherList.futureWeather.push({
				week: GetWeek(item.week),
				maxTemp: item.daytemp + '°',
				minTemp: item.nighttemp + '°',
				weather: item.dayweather,
				icon: setWeatherIcon(item.dayweather)
			})
		})
	})
	return weatherList
}

// 根据天气类型返回对应的icon图名
const setWeatherIcon = (type: string): string => {
	let icon = ''
	const iconWeatherMap = {
		风: [
			'有风',
			'平静',
			'微风',
			'和风',
			'清风',
			'强风/劲风',
			'疾风',
			'大风',
			'烈风',
			'风暴',
			'狂爆风',
			'飓风',
			'热带风暴',
			'龙卷风'
		],
		多云: ['少云', '晴间多云', '多云'],
		雪: ['雪', '阵雪', '小雪', '中雪', '大雪', '暴雪', '小雪-中雪', '中雪-大雪', '大雪-暴雪', '冷'],
		雾: ['浮尘', '扬沙', '沙尘暴', '强沙尘暴', '雾', '浓雾', '强浓雾', '轻雾', '大雾', '特强浓雾'],
		晴: ['晴', '热'],
		雨夹雪: ['雨雪天气', '雨夹雪', '阵雨夹雪'],
		雨: [
			'阵雨',
			'雷阵雨',
			'雷阵雨并伴有冰雹',
			'小雨',
			'中雨',
			'大雨',
			'暴雨',
			'大暴雨',
			'特大暴雨',
			'强阵雨',
			'强雷阵雨',
			'极端降雨',
			'毛毛雨/细雨',
			'雨',
			'小雨-中雨',
			'中雨-大雨',
			'大雨-暴雨',
			'暴雨-大暴雨',
			'大暴雨-特大暴雨',
			'冻雨'
		],
		阴: ['阴', '霾', '中度霾', '重度霾', '严重霾', '未知']
	}
	for (const key in iconWeatherMap) {
		iconWeatherMap[key].forEach((item) => {
			// 判断是否有相等的天气，如果有返回key
			if (item == type) {
				// 判断key的类型返回对应的icon图
				switch (key) {
					case '风':
						icon = 'feng'
						break
					case '多云':
						icon = 'duoyun'
						break
					case '雪':
						icon = 'xue'
						break
					case '雾':
						icon = 'wu'
						break
					case '晴':
						icon = 'qing'
						break
					case '雨夹雪':
						icon = 'yujiaxue'
						break
					case '阴':
						icon = 'yin'
						break
					case '雨':
						icon = 'yu'
						break
				}
			}
		})
	}
	// 返回icon图名
	return icon
}
