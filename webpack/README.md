
## 常用插件
#### @DefinePlugin
在编译阶段定义常量

常见使用方法:

webpack.config.js
```javascript
    new webpack.DefinePlugin({
      VERSION_HASH: JSON.stringify(`${Date.now()}-${(new Date()).toLocaleString()}`),
      BUILD_ENV:JSON.stringify(process.env.build_env),   
      MOCK: '1':false,
    }),
```
index.js
```
  console.log(VERSION_HASH);//用来打印本代码编译时的时间戳
  //这里只有当MOCK为false时，编译才会删除内部片段，如果MOCK为0或者Undefined则不会
  if(MOCK){
    let mock = require('mock')
  }
```
