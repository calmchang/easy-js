
## font-weight 字体粗细
font-weight各个值对应的重量名称：  
100 - Thin  
200 - Extra Light (Ultra Light)  
300 - Light  
400 - Normal  
500 - Medium  
600 - Semi Bold (Demi Bold)  
700 - Bold  
800 - Extra Bold (Ultra Bold)  
900 - Black (Heavy)  
normal - 同400相同  
bold - 同700相同  
bolder - 大于父节点的字重值  
lighter - 小于父节点的字重值


对于`font-family: -apple-system`苹方字体而言，各个字重对应`font-weight`关系如下： 

常规体: 400  
极细体: 100  
纤细体: 200  
细体: 300  
中黑体: 500  
中粗体: 700  

其中500和700在web端表现是一致的，所以可以合并为一个使用

## font-spider 字体生成器

font-spider 原理是由于字体文件一般都很大（因为包含所有字符的信息）而我们页面内可能只用到部分文字，所以font-spider将字体文件内我们用到的字符信息提取出来，打包成新的字体文件，这样字体文件的大小就很小了。


* 安装nodejs
* 安装font-spider `npm install font-spider -g`
* 编写一个html，页面内的内容如下，目的是将所有用到的文字用我们想用的字体绘制一遍

```html
<!DOCTYPE html>
<html>
<head>

	<style>
			@font-face
			{
			   font-family:diyFont;
			   src:url('JFRingmaster.ttf'); //JFRingmaster.ttf 为当前需要压缩的字体文件
			}
	</style>

</head>
	
<body>
	<p style="font-family: diyFont; font-size: 20px;">ChangXu这里把所有用到的文字输入在这里</p>
</body>
</html>

```

* 然后用font-spider来生成新的字体文件
	* `font-spider index.html`  
	* 执行完毕后会自动覆盖原来的ttf字体文件，然后拿这个字体文件去用就行啦

* 也可以利用gulp进行打包,详细见 `http://font-spider.org/`