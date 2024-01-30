<template>
	<div style="border: 1px solid #ccc" :class="{ dark: !themeTypeStore.changeTheme }">
		<Toolbar
			style="border-bottom: 1px solid #ccc"
			:editor="editorRef"
			:defaultConfig="toolbarConfig"
			:mode="mode" />
		<Editor
			style="height: 730px; overflow-y: hidden"
			v-model="addArticleStore.valueHtml"
			:defaultConfig="editorConfig"
			:mode="mode"
			@onCreated="handleCreated" />
	</div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IToolbarConfig } from '@wangeditor/editor'
import { AddArticleStore } from '@/store/models/layout/articleManage/addArticle'
import { UploadStore } from '@/store/models/upload'
import { ThemeTypeStore } from '@/store/models/theme'
type InsertFnType = (url: string, alt: string, href: string) => void
const addArticleStore = AddArticleStore()
const uploadStore = UploadStore()
const themeTypeStore = ThemeTypeStore()
const mode = ref('default') // 或 'simple'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const handleCreated = (editor) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
	excludeKeys: [
		'insertVideo', // 删除视频
		'uploadVideo',
		'group-video',
		'insertImage',
		'insertLink',
		'insertTable' // 删除表格
	]
}

// 编辑器配置
const editorConfig = {
	MENU_CONF: {}
}
// 默认值
editorConfig.placeholder = '请输入内容...'

// 修改 uploadImage 菜单配置
editorConfig.MENU_CONF['uploadImage'] = {
	// 自定义上传图片
	async customUpload(file: File, insertFn: InsertFnType) {
		try {
			const r = await uploadStore.UploadImages_Fn(file)
			const list = r.data.add_file_list
			list.forEach((i) => {
				insertFn(i.url)
			})
		} catch (e) {
			return e
		}
	}
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value
	if (editor == null) return
	editor.destroy()
})
</script>

<style scoped>
/*
 *  以下样式由于全局reset文件被覆盖，所以需要重新定义
 */

:deep(h5),
.h5 {
	font-size: 18px;
}

:deep(h4),
.h4 {
	font-size: 16px;
	font-weight: bold;
}

:deep(h3),
.h3 {
	font-size: 19px;
	font-weight: bold;
}

:deep(h2),
.h2 {
	font-size: 22px;
	font-weight: bold;
}

:deep(h1),
.h1 {
	font-size: 25px;
	font-weight: bold;
}
:deep(i) {
	font-style: italic;
}
:deep(.w-e-toolbar .w-e-menu i) {
	font-style: normal;
}
:deep(ol) {
	list-style-type: decimal;
}
.dark {
	/* textarea - css vars */
	--w-e-textarea-bg-color: #1d1e1f;
	--w-e-textarea-color: #e5eaf3;
	--w-e-textarea-border-color: transparent;
	--w-e-textarea-slight-border-color: #e8e8e8;
	--w-e-textarea-slight-color: #d4d4d4;
	--w-e-textarea-slight-bg-color: #18222c;
	/* 选中的元素，如选中了分割线 */
	--w-e-textarea-selected-border-color: #141414;
	/* 工具，如图片拖拽按钮 */
	--w-e-textarea-handler-bg-color: #4290f7;

	/* toolbar - css vars */
	--w-e-toolbar-color: #e5eaf3;
	--w-e-toolbar-bg-color: #1d1e1f;
	--w-e-toolbar-active-color: #fff;
	--w-e-toolbar-active-bg-color: #999;
	--w-e-toolbar-disabled-color: #999;
	--w-e-toolbar-border-color: #e5eaf3;

	/* modal - css vars */
	--w-e-modal-button-bg-color: #1d1e1f;
	--w-e-modal-button-border-color: #d9d9d9;
}
</style>
