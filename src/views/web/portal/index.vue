<template>
	<!--  轮播图-start-->
	<div class="max-w-screen-2xl mx-auto">
		<Gvb_carousel />
	</div>
	<!--  轮播图-end-->
	<div class="max-w-screen-2xl my-4 lg:my-10 mx-auto flex">
		<!--  卡片-start-->
		<!--		<Gvb_card />-->
		<div
			class="w-full h-[810px] hidden lg:flex lg:flex-col transition sticky lg:top-[100px] duration-[700ms] max-w-sm overflow-hidden rounded-box my_comps_bg shadow-lg">
			<div class="object-cover object-center w-full h-56 flex justify-center items-center">
				<el-avatar :src="userStore.userInfo.avatar" :size="150" />
			</div>

			<div
				class="flex justify-center items-center h-[100px] px-6 py-3 bg-dark_comps_bg dark:bg-dark_hover text-dark_text">
				<span class="w-[30%] flex justify-center">文章</span>
				<span class="w-[30%] flex justify-center">标签</span>
				<span class="w-[30%] flex justify-center">分类</span>
			</div>

			<div class="px-6 py-4">
				<h1 class="text-xl font-semibold text-gray-800 dark:text-white">Akita</h1>

				<p class="py-2">{{ userStore.userInfo.slogan }}</p>

				<div class="w-[100%] h-[50%] flex flex-col">
					<ul class="w-[80%] h-[100px] space-y-2">
						<li class="flex items-center space-x-1">
							<svg-icon name="sex" size="18"></svg-icon>
							<p>性别:</p>
							<p v-if="userStore.userInfo.sex == ''">暂未设置</p>
							<p v-else>{{ userStore.userInfo.sex }}</p>
						</li>
						<li class="flex items-center space-x-1">
							<svg-icon name="address" size="18"></svg-icon>
							<p>住址:</p>
							<p v-if="userStore.userInfo.addr == ''">暂未设置</p>
							<p v-else>{{ userStore.userInfo.addr }}</p>
						</li>
						<li class="flex items-center space-x-1">
							<svg-icon name="email" size="18"></svg-icon>
							<p>邮箱:</p>
							<p v-if="userStore.userInfo.email == ''">暂未设置</p>
							<p v-else>{{ userStore.userInfo.email }}</p>
						</li>
						<li class="flex items-center space-x-1">
							<svg-icon name="wechat" size="18"></svg-icon>
							<p>wechat:</p>
							<p v-if="userStore.userInfo.wechat == ''">暂未设置</p>
							<p v-else>{{ userStore.userInfo.wechat }}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--  卡片-start-->
		<div>
			<section class="my_compos_bg transition duration-[700ms]">
				<div class="container px-6 mx-auto">
					<div
						class="w-full h-[50px] flex justify-between items-center gap-3 border-b-[2px] border-dashed border-light_border_text dark:border-dark_border_text">
						<div class="flex items-center space-x-2">
							<span>所有文章</span>
							<span>我的文章</span>
						</div>
						<div class="flex items-center">
							<el-select
								v-model="articlesTypeValue"
								class="m-2"
								clearable
								placeholder="排序方式"
								size="small"
								@change="typeArticlesChange"
								style="width: 100px">
								<el-option
									v-for="item in sortArticlesOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value" />
							</el-select>
							<div @click="sortArticlesChange">
								<svg-icon v-if="sortFlag" name="Ascend" />
								<svg-icon v-else name="Descend" />
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2 transition duration-300">
						<template v-for="(item, index) in articleData" :key="index">
							<div>
								<img
									class="relative object-cover w-full transition duration-300 hover:translate-y-6 rounded-md h-96"
									:src="item.banner"
									alt="" />

								<div
									class="relative max-w-lg p-6 mx-auto -mt-20 bg-light_comps_bg dark:bg-dark_comps_bg rounded-md shadow">
									<a href="#" class="font-semibold hover:underline md:text-xl truncate">
										{{ item.title }}
									</a>

									<p class="mt-3 text-sm md:text-sm truncate">
										{{ item.abstract }}
									</p>

									<!--									articleInfo-start-->
									<div class="flex mt-2 justify-between items-center text-[12px]">
										<div class="flex h-full gap-2 items-center">
											<p class="hover:underline cursor-pointer gap-0.5 flex items-center">
												<svg-icon name="author" size="20" />
												{{ item.author }}
											</p>
											<el-tooltip :content="ParseTime(item.issue)" placement="top">
												<p
													class="cursor-pointer hover:underline hidden lg:flex gap-0.5 items-center">
													<svg-icon name="issue" size="16" />
													{{ CalculateDaysDifference(item.issue) }}天前
												</p>
											</el-tooltip>
											<p class="cursor-pointer hover:underline flex gap-0.5 items-center">
												<svg-icon name="look" size="18" />
												<span>{{ item.lookCount }}</span>
											</p>
											<p class="cursor-pointer hover:underline flex gap-0.5 items-center">
												<svg-icon name="comment" size="16" />
												<span>{{ item.commentCount }}</span>
											</p>
										</div>
										<button class="h-full hover:underline text-sm lg:text-md">查看全文</button>
									</div>
									<!--                  articleInfo-end-->
								</div>
							</div>
						</template>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GetAllArticle_Api } from '@/api/layout/articleManage/articleList'
import { onMounted, ref } from 'vue'
import { CalculateDaysDifference, ParseTime } from '@/pkg/time.ts'
import { Base64 } from 'js-base64'
import { UserStore } from '@/store/models/user'
const articleData = ref()
const loading = ref(false)
const userStore = UserStore()
const articlesTypeValue = ref('')
const getArticleParams = ref({
	page: 1,
	page_size: 6,
	sort: 0,
	type: ''
})
const sortFlag = ref(true)
const sortArticlesOptions = [
	{
		value: '',
		label: '按发布时间'
	},
	{
		value: 'look_count',
		label: '按浏览量'
	},
	{
		value: 'comment_count',
		label: '按评论量'
	}
]

onMounted(() => {
	getArticle()
})

const sortArticlesChange = () => {
	sortFlag.value = !sortFlag.value
	let sort
	if (sortFlag.value) {
		sort = 0
	} else sort = 1
	getArticleParams.value.sort = sort
	getArticle()
}

const typeArticlesChange = () => {
	getArticleParams.value.type = articlesTypeValue.value
	getArticle()
}

const getArticle = async () => {
	loading.value = true
	try {
		console.log(getArticleParams.value)
		const r = await GetAllArticle_Api(getArticleParams.value)
		if (r.code == 1061) {
			articleData.value = r.data.data
			setTimeout(() => {
				loading.value = false
				r.data.data.forEach((i) => {
					i.content = Base64.decode(i.content)
				})
			}, 1500)
		}
	} catch (e) {
		return e
	}
}
</script>
