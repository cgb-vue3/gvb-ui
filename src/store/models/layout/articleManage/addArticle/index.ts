import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AddArticle_Api } from '@/api/layout/articleManage/articleList'

export const AddArticleStore = defineStore('ADD-ARTICLE', () => {
	// 添加文章配置
	const addArticleOption = ref({
		// 添加文章抽屉配置
		drawerOption: {
			title: '添加文章',
			headersButton: [{ label: 'close', name: '关闭' }],
			size: '1500px',
			type: 'addArticle',
			closeClickModal: false,
			closePressEscape: false,
			footer: {
				btn: [
					{ label: 'finish', name: '完善信息' },
					{ label: 'clear', name: '清空' }
				]
			}
		},
		// 文章封面抽屉配置
		bannerDrawerOption: {
			title: '媒体库',
			headersButton: [{ label: 'close', name: '关闭' }],
			size: '600px',
			type: 'addArticleBanner',
			closeClickModal: true,
			closePressEscape: true
		},
		// 文章数据
		dialogOption: {
			label: 'addArticle',
			title: '添加文章',
			avatarPath: '',
			input: [
				{
					label: 'title',
					name: '文章标题',
					data: '',
					type: 'text',
					placeholder: '请输入文章标题',
					width: '100',
					maxlength: 15
				},
				{
					label: 'abstract',
					name: '简介',
					data: '',
					type: 'textarea',
					placeholder: '请输入...',
					width: '100',
					maxlength: 30
				}
			],
			select: {
				options: [
					{
						label: 'categoryTitle',
						name: '文章分类',
						data: '',
						width: '100',
						clearable: true,
						placeholder: '请选择',
						option: [
							{
								value: '日常',
								label: '日常'
							},
							{
								value: 'java',
								label: 'java'
							},
							{
								value: 'go',
								label: 'go'
							}
						]
					},
					{
						label: 'tagTitles',
						name: '文章标签',
						multiple: true,
						clearable: true,
						data: '',
						width: '100',
						placeholder: '请选择',
						option: [
							{
								value: '日常',
								label: '日常'
							},
							{
								value: 'java',
								label: 'java'
							},
							{
								value: 'go',
								label: 'go'
							}
						]
					}
				]
			},
			banner: [
				{
					label: 'articleBanner',
					name: '文章封面',
					placeholder: '从媒体库选择文章封面',
					width: '100',
					size: '200',
					type: 'uploadAvatar'
				}
			],
			footer: [
				{ label: 'cancel', title: '取消' },
				{ label: 'save', title: '存为草稿' },
				{ label: 'submit', title: '发布文章' }
			]
		}
	})
	// 内容
	const valueHtml = ref('')
	// 添加文章
	const AddArticle_Fn = async (data: any) => {
		try {
			return AddArticle_Api(data)
		} catch (e) {
			return e
		}
	}
	// 清除文章数据
	const ClearArticleData_Fn = () => {
		for (let i = 0; i <= addArticleOption.value.dialogOption.input.length - 1; i++) {
			addArticleOption.value.dialogOption.input[i].data = ''
		}
		for (let i = 0; i <= addArticleOption.value.dialogOption.select.options.length - 1; i++) {
			addArticleOption.value.dialogOption.select.options[i].data = ''
		}
		addArticleOption.value.dialogOption.avatarPath = ''
		valueHtml.value = ''
	}

	return {
		valueHtml,
		addArticleOption,
		AddArticle_Fn,
		ClearArticleData_Fn
	}
})
