<template>
	<div class="bg-white py-6 sm:py-8 lg:py-12">
		<div class="mx-auto max-w-screen-2xl px-4 md:px-8">
			<div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
				<template v-for="(item, index) in articleList" :key="index">
					<div class="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
						<a
							class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
							@click="goDetail(item)">
							<img
								:src="item.banner"
								loading="lazy"
								alt="Photo by Minh Pham"
								class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
						</a>

						<div class="flex flex-1 flex-col p-4 sm:p-6 bg-base-100 dark:bg-dark_comps_bg">
							<h2 class="mb-2 text-lg font-semibold text-gray-800">
								<a
									href="#"
									class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">
									{{ item.title }}
								</a>
							</h2>
							<p v-if="item.abstract" class="mb-8 text-gray-500">{{ item.abstract }}</p>
							<p v-else class="mb-8 text-gray-500">暂无简介...</p>

							<div class="mt-auto flex items-end justify-between">
								<div class="flex items-center gap-2">
									<div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
										<img
											:src="item.authorAvatar"
											loading="lazy"
											alt="Photo by Brock Wegner"
											class="h-full w-full object-cover object-center" />
									</div>
									<div>
										<span class="block text-[14px] text-indigo-500">{{ item.author }}</span>
										<span class="block text-[12px] text-gray-400">{{ item.issue }}</span>
									</div>
								</div>
								<span class="rounded border px-2 py-1 text-[12px] text-gray-500">
									{{ item.category }}
								</span>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '@/router'
defineProps(['articleList'])
const goDetail = (item) => {
	router.push({
		path: '/articleDetails',
		query: { id: item.id }
	})
}
</script>

<style scoped></style>
