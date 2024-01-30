import { GaoDe } from '@/config'

export interface Weather_Type {
	data: {
		status: string
		count: string
		info: string
		infocode: string
		forecasts: [
			{
				city: string
				adcode: string
				province: string
				reporttime: string
				casts: [
					{
						date: string
						week: string
						dayweather: string
						nightweather: string
						daytemp: string
						nighttemp: string
						daywind: string
						nightwind: string
						daypower: string
						nightpower: string
						daytemp_float: string
						nighttemp_float: string
					}
				]
			}
		]
	}
}

export interface Params_Type {
	key: string
	extensions?: string
	city?: string
}
