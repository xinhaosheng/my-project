<template>
    <div>
        <div class="logo">
            <h1>Srun</h1>
        </div>
        <div class="tools">
            <!-- 注销 -->
            <button type="button" @click="logout">
                <i class="icon ion-md-power"></i>
            </button>
            <!-- 翻译 -->
            <!-- <button class="btn" @click="translate">
                <i class="icon ion-md-globe"></i>
            </button> -->
            <!-- 通知 -->
            <!-- <span class="text">版本：V {{version}}</span> -->
        </div>
    </div>
</template>

<script>
	export default {
		name: "Header",
		data() {
			return {
				version: ''
			};
		},
		methods: {
			// 注销
			logout() {
				this.$confirm("您确定要注销吗？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						let url = "/user/logout";
						this.tools.get(url);
						location.reload();
					})
					.catch(() => {
					});
			},
			// 翻译
			translate() {
				let lang = this.$store.state.currentLang;
				lang === 'zh' ? lang = 'en' : lang = 'zh';
				this.$store.commit('updateLang', lang);
				location.reload();
            },
			// 获取版本信息
			getVersion() {
				let url = '/system/version';
				request.get(url, res => {
					this.version = res;
				});
			},
		},
		mounted() {
			this.getVersion();
		}
	};
</script>

<style scoped lang="less">
    @import "../../assets/less/conf";

    .header;

    .logo {
        display: inline-block;
        padding-left: @height;
        cursor: default;

        h1 {
            color: #fff;
            line-height: @height;
        }
    }

    .tools {
        width: 500px;
        float: right;

        button {
            width: @height;
            text-align: center;
            cursor: pointer;
            float: right;

            .icon {
                color: #fff;
                line-height: @height;
                font-size: 1.5rem;
            }


            &:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        }

        .text {
            float: right;
            line-height: 50px;
            font-size: 1rem;
            color: #fff;
            margin-right: 20px;
        }
        .btn{
            float: right;
            line-height: 50px;
            margin-right: 20px;
        }
        .icon {
            color: #fff;
            line-height: @height;
            font-size: 1.5rem;
        }
    }
</style>
