
##### 安装

npm是随node一起安装的，无需单独安装


### 查看需要安装的模块可以安装的版本号列表
* npm view 包名 versions:查看在线可安装的所有版本
* npm view 包名 version :查看线上当前可安装的最新版本号
* npm ls 包名 :查看本地安装的包的版本号及依赖包版本号
* npm upgrade 包名@版本号:将包升级到对应版本号

##### 创建Npm账户
* npm adduser
* 输入用户名
* 输入密码
* 输入邮箱地址

##### 登录NPM账户
* npm login
* 输入用户名
* 输入密码
* 输入邮箱地址
##### 查看当前登录用户
* npm whoami

##### 创建自己的Npm包并发布  
* npm init
  初始化一个项目生成package.json基础配置也可以自行修改

* package.json说明
  * name:在npm上发布的包的名称
  * version:版本
  * main:入口js文件路径，在别人`import xx from 包名`时第一个加载入口
  * files:只有在这个数组内的文件夹名会被对外发布至npm

* 编写代码并打包好

* npm publish:发布包


### 升级包
* 修改代码后 `npm version patch` 升级包版本号
* 然后发布 `npm publish`


##### 下架自己的包  
npm unpublish 包名@版本号


##### 删除线上某个版本的包
* npm unpublish 包名@版本号
	如:npm unpublish cx-test-component@1.0.0 就删除了1.0.0的版本

##### 删除整个包
* npm --force unpublish 包名


##### 删除整个包
* npx force-unpublish mz-util-demo '原因'

### 注意事项
* 每次上传新项目，都需要npm adduser添加账户
* 邮箱必须进过验证
* 可以登录npm官网直接用账号登录查看自己上传的包


### 本地调试未发布的包

1. 假设我们有一个开发中的npm包，叫`my-cli`，源代码在`/User/my-cli/`目录下
2. 我们有一个正在开发中的项目叫`my-app`，项目目录在`/User/my-app/`目录下
3. 现在我们定位到开发中的项目`cd /User/my-app`下
4. 执行 `npm link /User/my-cli` 将npm包链接到npm上   
5. 在项目中直接使用 `require('my-cli')` 就可以使用啦
6. 当不需要使用想卸载的时候， `npm ls --global my-cli` 检查是否被npm link，如果有link目录则可以继续下面步骤 
7. 执行 `npm rm --global my-cli` 进行卸载


