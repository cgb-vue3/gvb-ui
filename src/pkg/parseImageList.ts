import { RespImageList_Type } from '@/api/layout/userManage/userList/type.ts'

export interface imageList_Type {
	id: string
	name: string
	path: string
}

const NewImageList: imageList_Type[] = []

export const ParseImageList = (imageList: RespImageList_Type): imageList_Type => {
	imageList.some((item) => {
		NewImageList.push({
			id: item.id,
			name: item.name,
			path: item.path
		})
	})
	return NewImageList
}
