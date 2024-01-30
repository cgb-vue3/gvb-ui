<template>
	<MdEditor
		@onHtmlChanged="onHtmlChanged"
		v-model="text"
		:autoFocus="true"
		@onGetCatalog="onGetCatalog"
		:toolbarsExclude="toolbars"></MdEditor>
</template>

<script setup>
import { reactive } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { AddArticleStore } from '@/store/models/layout/articleManage/addArticle'
const addArticleStore = AddArticleStore()

const state = reactive({
	text: '',
	catalogList: []
})

// Html内容
const onHtmlChanged = (html) => {
	addArticleStore.valueHtml.push(html)
}

// 目录
const onGetCatalog = (list) => {
	state.catalogList = list
}
// 工具栏
const toolbars = ['katex']
defineExpose({
	state,
	onHtmlChanged
})
</script>
