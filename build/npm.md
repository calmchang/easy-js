
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

1. 首先终端下定位在你当前的工程目录下  
2. 执行 `npm link /未发布的Npm包的目录`   
3. require('未发布的npm包') 就可以使用了    


