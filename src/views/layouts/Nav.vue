<template>
    <nav>
        <el-menu class="menu"
                 background-color="#545C64"
                 text-color="#FFF"
                 :default-active="this.$route.path"
                 unique-opened
                 router>
            <!-- Chart -->
            <el-submenu index="chart">
                <template slot="title">
                    <i class="icon" :class="chart.icon"></i>
                    <span slot="title">{{chart.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(item,index) in chart.subMenu" :key="index" :index="item.path">
                        <i class="el-icon-caret-right"></i>
                        {{item.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <!-- DNS Mgr -->
            <el-submenu index="dnsMgr">
                <template slot="title">
                    <i class="icon" :class="dnsMgr.icon"></i>
                    <span slot="title">{{dnsMgr.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(item,index) in dnsMgr.subMenu" :key="index" :index="item.path">
                        <i class="el-icon-caret-right"></i>
                        {{item.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <!-- DHCP Mgr -->
            <el-submenu index="dhcpMgr">
                <template slot="title">
                    <i class="icon" :class="dhcpMgr.icon"></i>
                    <span slot="title">{{dhcpMgr.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(item,index) in dhcpMgr.subMenu" :key="index" :index="item.path">
                        <i class="el-icon-caret-right"></i>
                        {{item.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <!-- Setting -->
            <el-menu-item :index="setting.path">
                <i class="icon" :class="setting.icon"></i>

                <span slot="title">{{setting.name}}</span>
            </el-menu-item>
        </el-menu>
    </nav>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                chart: {
                    name: "DNS图表",
                    icon: "ion-md-stats",
                    subMenu: [
                        {path: "/", name: "DNS 访问图表"},
                        {path: "/Black", name: "黑名单日志图表"},
                        {path: "/DnsAccessList", name: "DNS 日志图表"},
                        {path: "/ProxyAccess", name: "Proxy 代理日志图表"}
                    ]
                },

                nginxMgr: {
                    name: "Nginx 配置",
                    icon: "ion-md-save",
                    subMenu: [
                        {path: "/nginxServer", name: "Nginx Server 配置"},
                        {path: "/nginxUpstream", name: "Nginx Upstream 配置"}
                    ]
                },
                dnsMgr: {
                    name: "DNS 管理",
                    icon: "ion-md-apps",
                    subMenu: [
                        {path: "/dnsRule", name: "DNS 多运营商代理设置"},
                        {path: "/dnsServer", name: "DNS 服务设置"},
                        {path: "/locDomain", name: "本地域名解析"},
                        {path: "/blackList", name: "黑名单设置"}
                    ]
                },
                dhcpMgr: {
                    name: "DHCP 管理",
                    icon: "ion-md-desktop",
                    subMenu: [
                        {path: "/dhcpServer", name: "DHCP 服务设置"},
                        {path: "/addressListIpv4Mgr", name: "IPv4 地址池管理"},
                        {path: "/addressListIpv4", name: "IPv4 地址列表"},
                        {path: "/addressListIpv6Mgr", name: "IPv6 地址池管理"},
                        {path: "/addressListIpv6", name: "IPv6 地址列表"}
                    ]
                },
                setting: {
                    name: "设置",
                    icon: "ion-md-settings",
                    path: "/setting"
                }
            };
        }
    };
</script>

<style scoped lang="less">
    @import "../../assets/less/conf";

    nav {
        height: 100%;

        .menu {
            min-height: 100%;
        }

        .icon {
            display: inline-block;
            width: 24px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 18px;
            color: #fff;
            margin-right: 5px;
            vertical-align: middle;
        }

        li,
        span {
            font-weight: 300;
        }
    }
</style>