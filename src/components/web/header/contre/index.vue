<template>
	<div class="flex gap-3">
		<template v-for="(item, index) in menu" :key="index">
			<div
				@click="router.push(item.path)"
				class="w-auto rounded-md h-[30px] text-xl font-mono hover:text-primary_1 hover:bg-light_hover dark:hover:bg-dark_hover flex justify-center items-center">
				<span class="px-2">
					{{ item.name }}
				</span>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import router from '@/router'
defineProps(['menu'])
</script>
