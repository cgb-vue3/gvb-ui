<!--<template>-->
<!--	<div class="bg-white py-6 sm:py-8 lg:py-12">-->
<!--		<portal v-if="!loading" :article-list="articleData" />-->
<!--	</div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import portal from '@/components/web/portal/index.vue'-->
<!--import { GetAllArticle_Api } from '@/api/layout/articleManage/articleList'-->
<!--import { watch, ref } from 'vue'-->
<!--import { ParseTime } from '@/pkg/time.ts'-->
<!--import { Base64 } from 'js-base64'-->
<!--import { useRoute } from 'vue-router'-->

<!--const articleData = ref()-->
<!--const loading = ref(false)-->
<!--const route = useRoute()-->

<!--const getArticle = async () => {-->
<!--	loading.value = true-->
<!--	try {-->
<!--		const r = await GetAllArticle_Api()-->
<!--		r.data.data.forEach((i) => {-->
<!--			i.issue = ParseTime(i.issue)-->
<!--			i.content = Base64.decode(i.content)-->
<!--		})-->
<!--		if (r.code == 1061) {-->
<!--			articleData.value = r.data.data-->
<!--			setTimeout(() => {-->
<!--				loading.value = false-->
<!--			}, 1000)-->
<!--		}-->
<!--	} catch (e) {-->
<!--		return e-->
<!--	}-->
<!--}-->

<!--watch(-->
<!--	() => route.path,-->
<!--	() => {-->
<!--		if (route.path == '/portal') {-->
<!--			getArticle()-->
<!--		}-->
<!--	},-->
<!--	{-->
<!--		immediate: true-->
<!--	}-->
<!--)-->
<!--</script>-->

<!--<style scoped></style>-->

<template>1</template>

<script setup lang="ts"></script>
