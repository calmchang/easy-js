

### @document.documentElement.clientWidth为0的问题

在安卓webview上页面打开时获取 `document.documentElement.clientWidth` 有时会0
解决方案：
```javascript
  let w = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
```