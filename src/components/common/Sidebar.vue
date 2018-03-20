<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
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
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: '0',
                        title: 'One',
                        subs: [
                            {
                                index: '/Sidebar1',
                                title: 'Sidebar1'
                            },
                            {
                                index: '/Sidebar2',
                                title: 'Sidebar2'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '1',
                        title: 'Two',
                        subs: [
                            {
                                index: '/Sidebar3',
                                title: 'Sidebar3'
                            },
                            {
                                index: '/Sidebar4',
                                title: 'Sidebar4'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: 'Three',
                        subs: [
                          {
                              index: '/Sidebar5',
                              title: 'Sidebar5'
                          },
                          {
                              index: '/Sidebar6',
                              title: 'Sidebar6'
                          }
                        ]
                    }
                  ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
