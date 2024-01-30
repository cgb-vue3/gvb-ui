<template>
	<div class="bg-white py-6 sm:py-8 lg:py-12">
		<div class="mx-auto max-w-screen-xl px-4 md:px-8">
			<!--			标题-->
			<div class="mb-4 text-center text-2xl font-sans text-gray-800 sm:text-3xl md:mb-6">
				{{ articleData.title }}
			</div>
			<!--      作者信息、文章信息-->
			<div></div>
			<!--      内容-->
			<article
				class="code dark:prose-invert pt-8 lg:prose-base lg:pt-8 md:prose-lg md:pt-8 prose-neutral"
				v-html="articleData.content"></article>
		</div>
		<!--		<div><comment :commentData="commentData" /></div>-->
	</div>
</template>
<script setup lang="ts">
// import comment from '@/components/web/articleDetails/comment/index.vue'
defineProps(['articleData', 'commentData'])
</script>

<style scoped lang="scss">
.code {
	@apply prose-pre:mockup-code prose-pre:text-warning prose-code:text-dark_text prose-pre:bg-dark_hover;
}
</style>
