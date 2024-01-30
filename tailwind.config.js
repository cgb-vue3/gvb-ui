import colors from 'tailwindcss/colors.js'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#409EFF',

					secondary: '#ECF5FF',

					accent: '#86909C',

					neutral: '#86909C',

					'base-100': '#fafafa',

					info: '#002fa7',

					success: '#4ADE80',

					warning: '#E6A23C',

					error: '#f97f29'
				}
			}
		]
	},
	theme: {
		colors: {
			/*亮色主题*/
			// F5F5F5
			light_bg: '#FFFFFF',
			light_text: '#1D1E1F',
			light_text_secondary: '#86909C',
			light_hover: '#F2F3F5',
			light_border_text: '#DCDFE6',
			light_btn_bg: '#6366F1',
			/*暗色主题*/
			dark_bg: '#1D1E1F',
			dark_text: '#FAFAFA',
			dark_text_secondary: '#C9CDD4',
			dark_hover: '#263445',
			dark_border_text: '#86909C',
			dark_btn_bg: '#6366F1',
			dark_comps_bg: '#263445',

			/*头像按钮边框颜色*/
			light_avatar_btn_border: '#DCDFE6',
			dark_avatar_btn_border: '#86909C',

			/*组件亮色*/
			main_light: '#F5F5F5',
			main_dark: '#1D1E1F',

			/*主色*/
			primary_1: '#409EFF', //常规
			primary_2: '#306FFF', //悬浮
			primary_3: '#689FFF', //点击

			/*成功色*/
			success_1: '#27C346', //常规
			success_2: '#1DB440', //悬浮
			success_3: '#50D266', //常点击规

			/*警示色*/
			warning_1: '#FF9626', //常规
			warning_2: '#FF8D1F', //悬浮
			warning_3: '#FFB357', //常点击规

			/*错误色*/
			danger_1: '#F76965', //常规
			danger_2: '#F54E4E', //悬浮
			danger_3: '#F98D86', //常点击规

			/*链接色*/
			link_1: '#3C7EFF', //常规
			link_2: '#306FFF', //悬浮
			link_3: '#689FFF', //常点击规

			/*边框颜色*/
			broder_color_1: '#2E2E30', //浅色
			broder_color_2: '#484849', //一般
			broder_color_3: '#5F5F60', //深/悬浮
			broder_color_4: '#929293', //重/按钮描边
			broder_color_5: '#DCDFE6' //浅/按钮描边
			// /*边框颜色*/
			// fill_color_1: 'fade(#FFF, 4%)', //浅/禁用
			// fill_color_2: 'fade(#FFF, 8%)', //常规/白底悬浮
			// fill_color_3: 'fade(#FFF, 12%)', //常规/白底悬浮
			// fill_color_4: 'fade(#FFF, 16%)', //常规/白底悬浮
			//
			// /*文字颜色*/
			// text_color_1: 'fade(#FFF, 90%)', //强调/正文标题
			// text_color_2: 'fade(#FFF, 70%)', //次强调/正文标题
			// text_color_3: 'fade(#FFF, 50%)', //次要信息
			// text_color_4: 'fade(#FFF, 30%)' // 置灰信息
		}
	},
	plugins: [require('daisyui', 'flowbite/plugin'), require('@tailwindcss/typography')]
}
