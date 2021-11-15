# 常用字符串转换编码


## URL编码
特点：利用ascii码表内的部分编码对unicode字符串进行编码，常用于对url内的参数部分进行编码
![](http://img.vuedata.cn/uricode.jpg)


## Base64
特点：将二进制数据以字符形式转换  
缺点：
1、只能将ascii码内的字符进行转换  
2、Base64编码的数据体积通常是原数据的体积4/3，也就是Data URL形式的图片会比二进制格式的图片体积大1/3  

![](http://img.vuedata.cn/base64.jpg)

base64转换时需要注意：   
1、转换的字符必须是ascii码内的字符，也就是编码为0-255之间，我们可以通过如下实验得出   
```javascript
btoa(String.fromCharCode(0)); // ✅ 可以正常转换
btoa(String.fromCharCode(254));// ✅ 可以正常转换
btoa(String.fromCharCode(255));// ✅ 可以正常转换
btoa(String.fromCharCode(256));// ❌ 报错
```

2、如果遇到ascii码255以外编码的字符时怎么办？用`encodeURIComponent`  
```javascript
var text = btoa( encodeURIComponent(String.fromCharCode(256)) ); // ✅ 转换成功
console.log( decodeURIComponent(atob(text)) ); // 成功还原
```

## charCode
特点：将字符和数字编码互相转换，常用在需要将字符变为二进制数据进行存放时

![](http://img.vuedata.cn/charcode.jpg)



