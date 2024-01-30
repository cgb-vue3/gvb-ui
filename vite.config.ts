import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	// noinspection TypeScriptValidateTypes
	return defineConfig({
		plugins: [
			vue(),
			eslintPlugin({
				include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
			}),
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			}),
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]'
			})
		],
		resolve: {
			// 配置路径别名
			alias: {
				'@': resolve('./src')
			}
		},
		server: {
			host: '0.0.0.0',
			port: env.VITE_APP_PORT
			// proxy: {
			// 	'/api': {
			// 		target: 'localhost:8080/api', //目标源，目标服务器，真实请求地址
			// 		changeOrigin: true, //支持跨域
			// 		rewrite: (path) => path.replace(/^\/api/, ""), //重写真实路径,替换/api
			// }
		}
	})
}
