
##### 页面加载完毕  

以下是一个完整DOM加载完毕后的事件执行过程  
如果只是使用window.onload或window.addEventListener('load')，需要确保在DOM加载完毕前声明，不然可能会出现异常  

```javascript
var init=false;
function onLoaded(){
  if(init)return;
  init=true;
}
if(document.readyState=='interactive'||document.readyState=='complete'){
    onLoaded();
}else{
  window.addEventListener('DOMContentLoaded',function(){
    onLoaded();
  })
  window.addEventListener('load',function(){
    onLoaded();
  })
}
```

##### stopImmediatePropagation 和 stopPropagation 区别
1、stopPropagation 会阻止当前事件继续传播给其他节点，而如果当前节点同一事件有多个监听的话，则都会执行
2、stopImmediatePropagation 是 stopPropagation的强化版，区别是如果当前节点同一事件有多个监听的话，也会阻止其他监听执行

~~~javascript
var child = document.getElementById('child');
var parent = document.getElementById('parent');

child.addEventListener('click', (event)=> {
    console.log(1);
});

child.addEventListener('click', (event)=> {
    console.log(2);
    //代码1
    //event.stopImmediatePropagation();
});

child.addEventListener('click', (event)=> {
    console.log(3);
    //代码2
    // event.stopPropagation();
});

parent.addEventListener('click', (event)=>{
    console.log(4);
},false);
正常输出:1,2,3,4
若将最后一段false改为true,输出:4 1 2 3
若放开 代码1 输出: 1 2 
若放开 代码2 输出: 1 2 3 
~~~