

#### 常用
```html
<!-- html编码格式 -->
<meta charset="utf-8">

<!-- 使用webkit内核来渲染 -->
<meta name="renderer" content="webkit">
<!-- 在pc端优先使用chrome内核渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 关闭浏览器将 电话、邮箱、地址 自动转化为高亮链接 -->
<meta name="format-detection" content="telephone=no,email=no,adress=no">

<!-- 删除默认的苹果工具栏和菜单栏 -->
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- 
  决定了发送http请求时,request头内 referer 的值是怎么样的
  always:始终将当前访问的url完整地址添加到 referer 内
  origin:将 referer 的值设置为 origin 相同的值，大部分情况下也就是域名地址
  never:始终不添加 referer
-->
<meta name="referrer" content="always">

<!-- 3秒后刷新页面 -->
<meta http-equiv="Refresh" content="3">

<!-- 2秒后跳转url地址 -->
<meta http-equiv="Refresh" content="2;url=http://www.baidu.com/" >


<!-- 关键字,给搜索引擎用的  -->
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">  

```

#### 以下可以弃用  

```html
<!-- http1.0支持是用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出,样设定，访问者将无法脱机浏览。   -->
<meta http-equiv="pragma" content="no-cache">
<!-- http1.1支持可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。  -->
<meta http-equiv="expires" content="0">
<!-- http1.1支持清除缓存（再访问这个网站要重新下载！） -->
<meta http-equiv="cache-control" content="no-cache">
```