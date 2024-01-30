import { defineStore } from 'pinia'
import { RespImageList_Api } from '@/api/layout/userManage/userList'
import {
	Paging_Type,
	RespImageList_Type
	// RespUserPagingList_Type
} from '@/api/layout/userManage/userList/type.ts'
import { Ref, ref } from 'vue'
import { PromiseType } from '@/api/user/type.ts'

export const ImageListStore = defineStore('IMAGE-LIST', () => {
	// 当前用页
	const currentPage = ref(1)
	// 当前用户页条数
	const pageSize = ref(10)
	// 用户列表数据
	const list: Ref<RespImageList_Type | undefined> = ref()
	// 用户总数
	const total: Ref<number | undefined> = ref(0)
	// 每次返回的数据
	const sizes = [10]
	// 分页高度
	const pagHeight: string = 'height:50px'
	// 分页大小
	const pagSize: Ref<boolean> = ref(true)
	// 分页器大小
	const small = ref(true)
	// 获取用户列表
	const GetImagePagList_Fn = async (): PromiseType<RespImageList_Type> => {
		try {
			// 分页参数
			const params: Paging_Type = {
				page: currentPage.value,
				page_size: pageSize.value,
				sort: 0
			}

			const r = await RespImageList_Api(params)
			list.value = r.data.listData
			total.value = r.data.total
		} catch (e) {
			return
		}
	}

	return {
		currentPage,
		pageSize,
		list,
		total,
		sizes,
		pagHeight,
		pagSize,
		small,
		GetImagePagList_Fn
	}
})
