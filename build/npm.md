
##### 安装

npm是随node一起安装的，无需单独安装

##### 常用命令

* 查看当前安装的webpack版本号:`npm ls webpack`
	* 查看本地安装的包的版本号及依赖包版本号:`npm ls 包名`
* 查看线上最新包的版本号：`npm view 包名 version`
* npm upgrade 包名@版本号:将包升级到对应版本号

##### 创建或登录自己Npm账户
* npm adduser
* 输入用户名
* 输入密码
* 输入邮箱地址

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

##### 下架自己的包  
npm unpublish 包名@版本号


##### 删除整个包
* npm --force unpublish 包名