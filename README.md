# my-project
## Git代码提交注意事项
- git账号必须为自己名字全写，邮箱必须设置
    - 查看git账号与邮箱地址
        - git config user.name  查看用户名
        - git config user.email 查看邮箱地址
    - 设置git的账号和邮箱
        - git config --global user.name 用户名
        - git config --global user.email 邮箱地址
- 目前我们所使用的版本控制系统为 git
	- master 主分支为
	- developer 开发分支
	- bug 分支 issue
		- 示例: bug 可以有版本号或者bug具体名称, 推荐采用 bugClose 中的 bug编号
	- feature 开发新功能分支
		- 示例: 开发一个添加用户的功能 分支为 feature-createUser
	- hotfixes 紧急bug修改分支 - 本分支必须是通过 master 进行创建, 修复结束 必须将本分支代码合并到 master 以及 	developer 两个分支
	- release 发布分支
- 完成提交流程实例
	- 检查当前分支 如果不是 develop 请运行 git checkout -b developer
	- 创建一个新的功能开发分支， 比如开发一个开户接口 git checkout -b feature-create
	- 开发功能完毕 进行提交 git add file name
	- git commit -m ‘描述性文字’
	- git push origin [新分支的名字]
	- 登录 github 以后，点击合并分支请求，将新功能分支 feature-create 合并到 developer 分支，待管理员审核通过即可
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
