import Vue from 'vue'
// 自定义指令防止按钮重复点击 v-preventReClick(使用时)
const preventReClick = Vue.directive('preventReClick', {
	inserted: function (el, binding) {
		el.addEventListener('click', () => {
			if (!el.disabled) {
				el.disabled = true
				el.style.opacity = '0.5'
				el.style.cursor = 'not-allowed'
				setTimeout(() => {
					el.disabled = false
					el.style.opacity = '1'
					el.style.cursor = ''
				}, binding.value || 1500)
			}
		})
	}
})
export default preventReClick
