<template>
	<div v-if="articleListStore.list" class="bg-white py-6 sm:py-8 lg:py-12">
		<portal :article-list="articleListStore.list" />
	</div>
</template>

<script setup lang="ts">
import portal from '@/components/web/portal/index.vue'
import { ArticleListStore } from '@/store/models/layout/articleManage/articleList'
const articleListStore = ArticleListStore()
// 获取文章数据
const getArticleList = async () => {
	await articleListStore.GetArticleList_Fn()
}
getArticleList()
</script>

<style scoped></style>
