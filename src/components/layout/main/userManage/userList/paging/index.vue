<template>
	<Gvb_paging :store="store" :getPag_Fn="getPag_Fn" />
</template>
<script setup lang="ts">
defineProps(['store', 'getPag_Fn'])
</script>

<style scoped></style>
