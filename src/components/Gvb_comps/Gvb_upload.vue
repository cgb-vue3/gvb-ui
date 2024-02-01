<template>
	<el-upload
		:limit="limit"
		action="#"
		:http-request="upload"
		:show-file-list="false"
		:name="name"
		:list-type="listType">
		<button class="primaryBtn">
			{{ uploadOption.title }}
		</button>
		<template #tip>
			<div class="el-upload__tip text-light_text dark:text-dark_text">上传图片大小最大为5MB</div>
		</template>
	</el-upload>
</template>
<script lang="ts" setup>
const e = defineEmits(['upload'])
defineProps({
	listType: {
		type: String,
		default: 'text'
	},
	name: {
		type: String,
		default: 'images'
	},
	uploadOption: {},
	limit: {
		type: Number,
		default: 3
	}
})

// 上传文件
const upload = async (file) => {
	e('upload', file)
}
</script>
