import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { DelArticle_Api, GetArticle_Api } from '@/api/layout/articleManage/articleList'
import { Paging_Type, RespUserPagingList_Type } from '@/api/layout/userManage/userList/type.ts'
import { ParseTime } from '@/pkg/time.ts'
import { Base64 } from 'js-base64'

export const ArticleListStore = defineStore('ARTICLE-LIST', () => {
	// 当前用页
	const currentPage = ref(1)
	// 当前页条数
	const pageSize = ref(10)
	// 排序
	const sort = ref(1)
	// 列表数据
	const list: Ref<RespUserPagingList_Type | undefined> = ref()
	// 总数
	const total = ref(0)
	// 每次返回的数据
	const sizes = [10, 20, 30, 40]
	// 分页高度
	const pagHeight: string = 'height:60px'
	const type = ref('like_count')
	// 文章id列表
	const selectID = ref({
		idList: []
	})
	// 表单配置
	const tableOption = ref({
		options: [
			{ label: 'edit', name: '编辑' },
			{ label: 'del', name: '删除', title: '是否删除该文章？' }
		],
		// 表单头
		title: [
			{
				label: 'ID',
				key: 'id',
				width: '50'
			},
			{
				label: '封面',
				key: 'banner',
				width: '70'
			},
			{
				label: '文章标题',
				key: 'title'
				// width: '210'
			},
			{
				label: '简介',
				key: 'abstract'
			},
			{
				label: '文章分类',
				key: 'category',
				width: '100'
			},
			{
				label: '文章标签',
				key: 'tags',
				width: '100'
			},
			{
				label: '浏览量',
				key: 'look',
				width: '80'
			},
			{
				label: '评论量',
				key: 'commentCount',
				width: '80'
			},
			{
				label: '点赞量',
				key: 'like',
				width: '80'
			},
			{
				label: '发布时间',
				key: 'issueTime',
				width: '200'
			},
			{
				label: '操作',
				width: '200'
			}
		]
	})

	// 获取文章
	const GetArticleList_Fn = async () => {
		try {
			// 分页参数
			const params: Paging_Type = {
				page: currentPage.value,
				page_size: pageSize.value,
				sort: sort.value,
				type: type.value
			}
			const r = await GetArticle_Api(params)
			r.data.data.forEach((i) => {
				i.issue = ParseTime(i.issue)
				i.content = Base64.decode(i.content)
			})
			list.value = r.data.data
			total.value = r.data.total
		} catch (e) {
			return e
		}
	}
	// 删除文章
	const DelArticle_Fn = async () => {
		try {
			const data = {
				idList: selectID.value.idList
			}
			return await DelArticle_Api(data)
		} catch (e) {
			return e
		}
	}
	return {
		currentPage,
		pageSize,
		list,
		total,
		sizes,
		pagHeight,
		type,
		tableOption,
		selectID,
		GetArticleList_Fn,
		DelArticle_Fn
	}
})
