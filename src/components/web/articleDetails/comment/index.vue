<template>
	<div>
		<div class="bg-white py-6 sm:py-8 lg:py-10">
			<div class="mx-auto max-w-screen-xl px-4 md:px-8">
				<div class="mb-4 flex items-center justify-between border-t border-b py-3">
					<div class="flex flex-col gap-0.5">
						<span class="block font-bold">评论</span>
					</div>
				</div>
				<!--        评论区-->
				<div v-if="commentData.length > 0" class="divide-y">
					<template v-for="(item, index) in commentData" :key="index">
						<!-- review - start -->
						<div class="flex flex-col gap-3 py-3">
							<div class="flex justify-between items-center gap-x-3">
								<div class="flex">
									<el-avatar :src="item.author_avatar"></el-avatar>
									<div class="px-3">
										<span class="block text-sm font-bold">{{ item.author }}</span>
										<span class="block text-sm text-gray-500">{{ item.issue }}</span>
									</div>
								</div>
								<span class="text-primary_1 font-bold" @click="repComment(item)">回复</span>
							</div>
							<p class="text-gray-600">
								{{ item.content }}
							</p>
							<!--        写评论-->
							<div v-if="showWriteComment == item.ID" class="flex flex-col items-end gap-3">
								<!--          输入框-->
								<el-input
									ref="focus"
									v-model="RepData.content"
									:rows="5"
									type="textarea"
									:placeholder="`回复:${item.author}`" />
								<button class="btn btn-sm lg:btn-md" @click="submit(item)">发布</button>
							</div>
							<!--             子评论-->
							<template v-for="(subItem, index) in item.sub_comment" :key="index">
								<div class="flex flex-col gap-3 py-3 pl-8">
									<div class="flex justify-between items-center gap-x-3">
										<div class="flex">
											<el-avatar :src="subItem.author_avatar"></el-avatar>
											<div class="px-3">
												<div class="flex items-center gap-2">
													<span class="text-sm">{{ subItem.author }}</span>
													<span class="text-md text-primary_1 font-bold">回复了</span>
													<span class="text-sm">{{ subItem.reply }}</span>
												</div>
												<span class="block text-sm text-gray-500">{{ subItem.issue }}</span>
											</div>
										</div>
										<span class="text-primary_1 font-bold" @click="repComment(subItem)">回复</span>
									</div>
									<p class="text-gray-600">
										{{ item.content }}
									</p>
									<!--        写评论-->
									<div v-if="showWriteComment == subItem.ID" class="flex flex-col items-end gap-3">
										<!--          输入框-->
										<el-input
											ref="focus"
											v-model="RepData.content"
											:rows="5"
											type="textarea"
											:placeholder="`回复:${subItem.author}`"></el-input>
										<button class="btn btn-sm lg:btn-md" @click="submit(item)">发布</button>
									</div>
								</div>
							</template>
							<!--              回复-->
						</div>

						<!-- review - end -->
					</template>
				</div>
				<div v-else class="flex justify-center items-center py-10 text-light_text_secondary">
					<span>暂无评论...</span>
				</div>
				<!--        写评论-->
				<div class="flex flex-col justify-between items-end gap-3">
					<!--          输入框-->
					<div class="w-[100%] gap-3 flex">
						<el-avatar :src="userStore.userInfo.avatar" />
						<el-input
							v-model="data.content"
							:rows="5"
							type="textarea"
							placeholder="输入您的评论..." />
					</div>
					<button class="btn btn-sm lg:btn-md" @click="submit(null)">发布</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { AddComment_Api } from '@/api/layout/articleManage/articleList'
import { useRoute } from 'vue-router'
import { UserStore } from '@/store/models/user'
import { UpWarningMessage_Fn } from '@/pkg/message.ts'
const route = useRoute()
const userStore = UserStore()
const focus = ref(null)
defineProps(['commentData'])
const data = ref({
	article_id: parseInt(route.query.id),
	par_comment_id: 0,
	user_id: userStore.userInfo.id,
	deep: 0,
	content: '',
	par_user_id: 0
})

const RepData = ref({
	article_id: parseInt(route.query.id),
	par_comment_id: 0,
	user_id: userStore.userInfo.id,
	deep: 0,
	content: '',
	par_user_id: 0
})
const showWriteComment = ref(0)
const submit = async (i) => {
	let commentData = {}
	if (i == null) {
		if (data.value.content.length == 0) {
			UpWarningMessage_Fn('评论内容不能为空')
			return
		}
		commentData = data.value
	} else {
		if (RepData.value.content.length == 0) {
			UpWarningMessage_Fn('评论内容不能为空')
			return
		}
		commentData = RepData.value
	}
	try {
		await AddComment_Api(commentData)
	} catch (e) {
		return e
	}
}

// 回复
const repComment = (i) => {
	RepData.value.par_comment_id = i.ID
	RepData.value.par_user_id = i.comment_user_id
	if (RepData.value.deep == 0) {
		RepData.value.deep = 1
	} else if (RepData.value.deep == 1) {
		RepData.value.deep = 2
	}
	nextTick(() => {
		showWriteComment.value = i.ID
		nextTick(() => {
			focus.value[0].focus()
		})
	})
}
</script>

<style scoped></style>
