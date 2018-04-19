<template>
	<div class="sidebar">
		<el-menu :default-active="onRoutes" class="el-menu-vertical-demo"
		         background-color="#21262e"
		         text-color="#fff"
		         active-text-color="#ffd04b"
		         unique-opened router>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index">
						<template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
						<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index">
						<i :class="item.icon"></i>{{ item.title }}
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import { TeacherSideBarItem } from "../../js/util-data";

  export default {
    data() {
      return {
        items: TeacherSideBarItem
      }
    },
    computed: {
      onRoutes() {
        // return this.$route.path.replace('/', '');
      }
    }
  }
</script>

<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		width: 250px;
		left: 0;
		top: 70px;
		bottom: 0;
	}

	.sidebar > ul {
		height: 100%;
	}

	.el-menu{
		border: 0;
	}
</style>
