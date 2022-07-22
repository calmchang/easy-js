
## 监听nodejs自己发送的请求

我们想要监听nodejs自己对外发送的http请求时，可以直接重写http的request来达到拦截作用，大致代码如下

```javascript
const mainHttp = require('http');
let old_request=mainHttp.request;
mainHttp.request=function(){
  //这里就是拦截到的请求，可以做日志处理
  console.log('inject request',arguments);
  return old_request.apply(this, arguments);
}
```

