<template>
    <div id="app">
        <el-container>
            <el-header height="50px" class="layout-header">
                <Header/>
            </el-header>
            <el-container>
                <el-aside width="280px">
                    <Nav/>
                </el-aside>
                <el-main class="layout-main">
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from '@/views/layouts/Header'
    import Nav from '@/views/layouts/Nav'

    export default {
        name: 'App',
        watch: {
            // 路由监听
            // $route(to) {
            //     // Title 动态切换
            //     document.title = to.meta.title;
            // }
        },
        // mounted() {
        //     // 获取默认 Title
        //     document.title = this.$route.meta.title;
        // },
        components: {
            Header,
            Nav
        }
    }
</script>

<style lang="less">
    @import "assets/less/main";
</style>
