<template>
	<div class="w-[100%] border-[1px] border-light_border_text dark:border-dark_border_text">
		<el-table
			:data="tableData"
			:max-height="710"
			@select="handleCheckBox"
			@select-all="allHandleCheckBox"
			:class="{ darkHoverColumn: themeStore.themeType == 'dark' }"
			:header-cell-style="themeStore.themeType == 'light' ? headerLightStyle : headerDarkStyle"
			:cell-style="{ 'text-align': 'center' }"
			:row-style="themeStore.themeType == 'light' ? columnLightStyle : columnDarkStyle"
			style="width: 100%">
			<el-table-column type="selection" width="55" align="center" />
			<template v-for="(item, index) in tableTitle" :key="index">
				<!--				数列-->
				<el-table-column
					v-if="item.label !== '操作' && item.label !== '头像' && item.label !== '封面'"
					:prop="item.key"
					:label="item.label"
					:width="item.width" />
				<!--        头像-->
				<el-table-column
					v-if="item.label == '头像'"
					:prop="item.key"
					:label="item.label"
					:width="item.width">
					<template #default="scope">
						<el-avatar v-if="scope.row.avatar" :src="scope.row.avatar" />
						<el-avatar v-else>
							<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
						</el-avatar>
					</template>
				</el-table-column>
				<!--        封面-->
				<el-table-column
					v-if="item.label == '封面'"
					:prop="item.key"
					:label="item.label"
					:width="item.width">
					<template #default="scope">
						<el-avatar v-if="scope.row.banner" :src="scope.row.banner" />
						<el-avatar v-else>
							<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
						</el-avatar>
					</template>
				</el-table-column>
				操作列
				<el-table-column v-if="item.label == '操作'" :label="item.label" :width="item.width">
					<template #default="scope">
						<slot v-bind="scope" />
					</template>
				</el-table-column>
			</template>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
const p = defineProps(['tableTitle', 'tableData', 'store'])
import { ThemeTypeStore } from '@/store/models/theme/index.ts'
const themeStore = ThemeTypeStore()
// 头部主题
const headerDarkStyle = () => {
	return {
		height: '20px',
		background: '#141414',
		color: '#A3A6AD',
		'text-align': 'center',
		fontSize: '15px',
		border: 0
	}
}
const headerLightStyle = () => {
	return {
		height: '40px',
		background: '#ECF5FF',
		color: '#606266',
		'text-align': 'center',
		fontSize: '15px'
	}
}

// 数据列主题
const columnLightStyle = () => {
	return {
		height: '30px',
		color: '#606266'
	}
}
const columnDarkStyle = () => {
	return {
		height: '10px',
		background: '#1D1E1F',
		color: '#CFD3DC'
	}
}
// 多选
const handleCheckBox = (rowList) => {
	p.store.selectID.idList = []
	rowList.forEach((i) => {
		p.store.selectID.idList.push(i.id)
	})
}
// 全选
const allHandleCheckBox = (allRowList) => {
	p.store.selectID.idList = []
	allRowList.forEach((i) => {
		p.store.selectID.idList.push(i.id)
	})
}
</script>
<style>
.darkHoverColumn tbody tr:hover > td {
	background: #2e2e30 !important;
}
</style>
