
##### 宏任务和微任务执行流程
每次先执行1个宏任务
然后执行所有的微任务
如果在执行微任务期间又加入了新的微任务，则继续执行，全部执行完毕后
执行下一个宏任务

~~~javascript
setTimeout(function(){
  console.log('1')
},0);

new Promise((resolve)=>{
    console.log('2');
    resolve();
}).then(()=>{
  console.log('3')
  //Promise.resolve().then(()=>{console.log('5')}).then(()=>{console.log('6')});  
});
console.log('4');
~~~

~~~
输出 2 4 3 1
如果将注释行打开则输出
2 4 3 5 6 1，证明了在微任务中出现了新的微任务，会继续执行完所有微任务后，再执行宏任务

~~~


##### 下面的打印顺序是？
答案是：2, 4, 3, 5, 1
主线任务：2，4 
微任务：3，5 
宏任务：1
~~~javascript
setTimeout(() => {
  console.log(1);
}, 0);

new Promise((resolve) => {
  console.log(2);
  resolve();
}).then(() => console.log(3));

function callMe() {
  console.log(4);
}

(async () => {
  await callMe();
  console.log(5);
})();
~~~


##### setTimeout/setImmediate/process.nextTick的区别

* process.nextTick():效率最高，消费资源小，但会阻塞CPU的后续调用；采用的是idle观察者
* setTimeout():精确度不高，可能有延迟执行的情况发生，且因为动用了红黑树，所以消耗资源大；采用的是类似IO观察者
* setImmediate():消耗的资源小，也不会造成阻塞，但效率也是最低的。用的是check观察者

> 三种观察者的优先级顺序是：idle观察者>>io观察者>check观察者



#### 宏任务  
#|浏览器|node
--|:--:|--:
I/O|✅|✅
setTimeout|✅|✅
setInterval|✅|✅
setImmediate|❌|✅
requestAnimationFrame|✅|❌

### 微任务  
#|浏览器|node
--|:--:|--:
I/O|✅|✅
process.nextTick|❌|✅
Mulationobserver|✅|❌
Promise.then catch finally|✅|✅