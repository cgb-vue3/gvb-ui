import type { App, Component } from 'vue'
// icon图标
import SvgIcon from '@/components/SvgIcon/index.vue'
// layout
import Layout from '@/components/layout/index.vue'
// 侧边栏
import Gvb_menu from '@/components/Gvb_comps/Gvb_menu.vue'
// 加载状态
import Loading from '@/components/Loading/index.vue'
// tags
import Tags from '@/components/tags/index.vue'
// 骨架屏
import Skeleton from '@/components/skeleton/index.vue'
// 对话框
import Gvb_dialog from '@/components/Gvb_comps/Gvb_dialog.vue'
// 按钮
import GvbBtn from '@/components/Gvb_comps/Gvb_btn.vue'
// Table组件
import Gvb_table from '@/components/Gvb_comps/Gvb_table.vue'
// theme切换主题组件
import Gvb_theme from '@/components/Gvb_comps/Gvb_theme.vue'
// from
import Gvb_from from '@/components/Gvb_comps/Gvb_from.vue'
// select
import Gvb_select from '@/components/Gvb_comps/Gvb_select.vue'
// 上传文件
import Gvb_upload from '@/components/Gvb_comps/Gvb_upload.vue'
// 上传头像打开抽屉的按钮
import Gvb_drawer_btn from '@/components/Gvb_comps/Gvb_drawer_btn.vue'
// 抽屉
import Gvb_drawer from '@/components/Gvb_comps/Gvb_drawer.vue'
// 分页
import Gvb_paging from '@/components/Gvb_comps/Gvb_paging.vue'
// 富文本
import Gvb_editor from '@/components/Gvb_comps/Gvb_editor.vue'
// 图片列表
import Gvb_imgList from '@/components/Gvb_comps/Gvb_imgList.vue'
// 面包屑
import Gvb_breads from '@/components/Gvb_comps/Gvb_breads.vue'
// 走马灯
import Gvb_carousel from '@/components/Gvb_comps/Gvb_carousel.vue'
import Gvb_mdEditorV3 from '@/components/Gvb_comps/Gvb_mdEditorV3/Gvb_md-editor-v3.vue'
const components: { [name: string]: Component } = {
	SvgIcon,
	Layout,
	Loading,
	Tags,
	Skeleton,
	Gvb_menu,
	GvbBtn,
	Gvb_dialog,
	Gvb_table,
	Gvb_theme,
	Gvb_from,
	Gvb_select,
	Gvb_upload,
	Gvb_drawer_btn,
	Gvb_drawer,
	Gvb_paging,
	Gvb_editor,
	Gvb_imgList,
	Gvb_breads,
	Gvb_carousel,
	Gvb_mdEditorV3
}
export default {
	install(app: App) {
		Object.keys(components).forEach((key: string) => {
			app.component(key, components[key])
		})
	}
}
