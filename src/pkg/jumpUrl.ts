export const jumpUrl_Fn = (url) => {
	const path = window.location.protocol + '//' + url
	window.location.href = path
}
