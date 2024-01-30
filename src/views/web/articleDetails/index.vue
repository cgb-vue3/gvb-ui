<template>
	<div class="bg-white py-6 sm:py-8 lg:py-12">
		<articleDetails v-if="!loading" :articleData="articleData" />
	</div>
</template>

<script setup lang="ts">
import articleDetails from '@/components/web/articleDetails/index.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRoute()
const articleData = ref({})
// const commentData = ref({})
const loading = ref(false)
// 获取文章数据
import { GetAllArticle_Api } from '@/api/layout/articleManage/articleList'
import { ParseTime } from '@/pkg/time.ts'
import { Base64 } from 'js-base64'
const getAllArticle = async (id) => {
	loading.value = true
	// 分页参数
	try {
		const r = await GetAllArticle_Api({ id })
		r.data.data.forEach((i) => {
			i.issue = ParseTime(i.issue)
			i.content = Base64.decode(i.content)
		})
		articleData.value = r.data.data[0]
		setTimeout(() => {
			loading.value = false
		}, 1)
	} catch (e) {
		return e
	}
}

// const getComment = async (id) => {
// 	// 获取评论
// 	try {
// 		const r = await GetComment_Api({ article_id: id })
// 		r.data.data.forEach((i) => {
// 			i.issue = ParseTime(i.issue)
// 			i.sub_comment.forEach((sub) => {
// 				sub.issue = ParseTime(sub.issue)
// 				sub.sub_comment.forEach((rep) => {
// 					rep.issue = ParseTime(rep.issue)
// 				})
// 			})
// 		})
// 		commentData.value = r.data.data
// 	} catch (e) {
//  return e
// 	}
// }

watch(
	route,
	() => {
		getAllArticle(route.query.id)
		// getComment(route.query.id)
	},
	{
		immediate: true
	}
)
</script>

<style scoped></style>
