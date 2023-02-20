
## 盾与矛-网站安全技术

> 发表日期：2022-02-20

在开始正题前我们先做了一个小的测试  
下面这个站点当你点击按钮时，会调用算法计算出值为2  
你可以尝试调试代码，使其输出值为非2试试  
> 注意：这里需要真正改变函数计算的结果值而不是只修改dom的渲染值

你可以单独访问域名下的`/browser/debug.html`来单独打开这个站点
[在独立窗口中打开](http://localhost:3000/browser/debug.html)

<iframe src='./browser/debug.html'></iframe>

### 常用的一些增加站点安全的技术
1、 代码压缩：主要是将代码反格式化，使代码片段变为一整行，减少字符size，同时删除一些非必要的代码片段
2、 禁止调试：如上面的案例中，当使用开发者工具进行调试时，进行一定程度的阻碍，使开发者不能顺利调试    
3、 代码混淆：使代码在不影响执行的前提下变得不易阅读，无法识别  


接下来我介绍下上面这个测试案例中用到的技术实现


### 禁止右键菜单    
禁止用户点击右键主要是可以防止用户对某个DOM节点进行快速定位调试  
```js
  document.oncontextmenu=function(e){
    return false;
  }
  window.addEventListener('contextmenu',(e)=>{
      e.stopPropagation();
      e.preventDefault();
  });
```

### 禁止调试  

在网站开头执行下面的方法,当你启动控制台时会立马触发debugger，导致你无法对其它代码正常调试
```js
setInterval(function () { eval("debugger") }, 1);
```

原理：每1ms执行了一个匿名方法，方法内部仅仅只有"debugger",当用户没有打开开发者模式时并不会产生影响，仅在打开控制台时会触发断点调试


### 辅助禁止调试
如果你已经化解了上面的方法，当你给按钮方法增加了断点，并修改了值后，有没有发现没有生效？  
那是因为用到了第二个辅助禁止调试的方法，它的作用是检测用户有没有试图对代码进行调试的行为，如果有则重载网站

```js
let last=null;
function check(){
  if(!last){
    last= Date.now();
  }
  if(Date.now()-last>200){
    location.reload();
    return;
  }
  while(Date.now() - last<33){}
  last= Date.now();
  requestAnimationFrame(check)
}
requestAnimationFrame(check)
```

原理：
  主要是通过对整体JS进程的阻塞时间进行检测，一个正常的网站阻塞时间一般不大于200ms，而当有人对其加断点调试时，瞬间就能超过200ms，因此能判断是有调试行为的  
  这里我们用200毫秒作为检测值，实际情况应该根据网站整体最大的单方法阻塞时间进行取值，如果你有一个方法执行需要1秒，那么这里的值就必须大于1秒  
  该方法准确率非100%因此要保守使用，只能作为辅助

 
### 课后作业  
如何化解上面的防守攻势？ 

