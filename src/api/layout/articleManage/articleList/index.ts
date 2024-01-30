import request from '@/api/request.ts'
// 接口
enum API {
	// 添加文章
	ADD_ARTICLE_URL = 'auth/v1/article/add',
	// 获取文章列表
	GET_ARTICLE_URL = 'auth/v1/article/getList',
	// 删除文章
	DEL_ARTICLE_URL = 'auth/v1/article/del',
	// 获取所有文章
	GET_ALL_ARTICLE_URL = 'v1/article/all',
	// 获取文章评论
	GET_COMMENT_URL = 'auth/v1/comment/get',
	// 添加文章评论
	ADD_COMMENT_URL = 'auth/v1/comment/add'
}

// 添加文章
export const AddArticle_Api = (data: any) => request.post(API.ADD_ARTICLE_URL, data)

// 获取文章列表
export const GetArticle_Api = (params: any) => {
	return request.get(API.GET_ARTICLE_URL, { params })
}

// 删除文章
export const DelArticle_Api = (data: any) => {
	return request.delete(API.DEL_ARTICLE_URL, {
		data
	})
}

// 获取所有文章
export const GetAllArticle_Api = (params) => {
	return request.get(API.GET_ALL_ARTICLE_URL, { params })
}

// 获取评论
export const GetComment_Api = (params: any) => {
	return request.get(API.GET_COMMENT_URL, { params })
}

//
export const AddComment_Api = (data: any) => request.post(API.ADD_COMMENT_URL, data)
