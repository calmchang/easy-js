# This是谁？
  

### 前菜-变量上的This
看看下面的输出结果  
```javascript
var name='123';
const name2='456';
let name3='789';

console.log(name);// 123
console.log(name2);// 456
console.log(name3);// 789

console.log(this.name);// 123
console.log(this.name2);// undefined ❓❓
console.log(this.name3);// undefined ❓❓

console.log(window.name);// 123
console.log(window.name2);// undefined ❓❓
console.log(window.name3);// undefined ❓❓

```

#### 问题1：这里为什么用const和let声明的变量在window下找不到呢？  
先了解下作用域，通常我们在编写一个js文件时，像下面这样：  
```javascript
// index.js
var name='cc';
function fn(){
}
```
实际在js读取时，类似在最外层加了一层大括号
```javascript
// index.js
{
  var name='cc';
  function fn(){
  } 
}
```
在这一层大括号内用var和function定义的变量是直接属于window作用域下的    

而const和let定义的变量属于块级作用域，它有如下特性：  
1. 内层作用域可以调用外层作用域的变量  
2. 外层作用域不能调用内层作用域的变量    

所以在定义const和let变量时被转化为下面这样：  
``` javascript
var name='cc';
function fn(){} 

const name2='456';
let name3='789';
```
等同于  
``` javascript
{
  var name='cc';
  function fn(){} 
  {
    const name2='456';
    let name3='789';
  }
}
```
所以window作用域下是不存在name2和name3的！  

#### 问题2：为什么用const和let声明的变量在this下找不到呢？   
在理解了问题1的window作用域概念后，这里就好理解了，这里的this就是指向window所以可以看到this.name是可以正确打印的  
而const和let声明的变量又不属于window作用域下，所以这里this也打印不出他们  


  
### 正菜-普通函数  
先看题目，基础入门，答错的可以回炉重造  
```javascript
function fn1(){
  console.log('fn1',this);
}
fn1();// Window
fn1.call('cc1');// cc1
fn1.apply('cc2');// cc2
fn1.bind('cc3')();// cc3
```
默认情况下函数没有明确调用对象的话，内部的this指向window，下文会解释为什么
> 想改变函数内部this的指向可以通过调用call、bind、apply改变

### 对象内的函数  
从这里开始很多人靠感觉来猜this了  
```javascript
var obj={
  name:'obj',
  fn1:function(){
    console.log('fn1',this)
  }
}
obj.fn1(); // obj
obj.fn1.call('cc1'); // cc1
var fn2 = obj.fn1;
fn2(); // Window ❓❓
fn2.call('cc2');// cc2
```
再增加一点难度  
```javascript
var tom={name:'tom'};
tom.fn3=obj.fn1;
tom.fn3(); // tom ❓❓
```
那么对于普通函数有什么办法可以有规律的找出this是谁呢？  

#### 一图搞懂：普通函数调用的变化原理如下图 
![](http://img.vuedata.cn/fun.jpg)

接下来解释下上面的图  
普通函数我们使用万物皆call法解决  
实现过程为：在被调用的方法后面增加`.call(方法前面的对象)`来显式判断内部this是谁,举几个例子：  
* `obj.fn1()`    
  将 `obj.fn1()` 变为 `obj.fn1.call()` 然后call内对象是调用fn1这个方法前面的对象，如果没有对象则是Window，所以最终转换成`obj.fn1.call(obj)`,结果输出`obj`  
* `fn2.call('cc2')` 已经显式调用了call所以不需要转换,结果输出`cc2`  
* `tom.fn3()`转换成`tom.fn3.call(tom)`,结果输出`tom`  
* `fn2()` fn2前没有明确写出是谁调用的fn2,所以转换成 `fn2.call(Window)`,结果输出`Window`  

##### 疑问：这里为什么`fn2.call(Window)`而不是`fn2.call(this)`?,我们看下面的代码  
```javascript
var obj3={
  name:'obj3',
  test:function(){
    console.log(this);
    var fn2 = obj.fn1;
    fn2(); 
  }
}
obj3.test();
```
结果分别输出了 `obj3`和`Window`，可以看到test内部在执行`fn2()`时，按照我们上面说的方法，如果`fn2.call(this)`的话，那么最终输出的应该是`obj3`，而实际情况输出的是`Window`，所以可以看出在函数调用时没有明确调用对象是谁时，则默认指向`Window`  





### 箭头函数  
人们常说：箭头函数不存在this、箭头函数里面的this在定义时就确定了，它指向的是函数外层的对象，那怎么理解这2句话？    
先看一个入门的例子，你答对了吗？  
```javascript
const fn1 = ()=>{
  console.log('fn1',this);
}
fn1();// Window
fn1.call('cc');// Window ❓❓
```
如果这里全部答对，那么恭喜你，入门了🎉💐🌼  
再深入一点，你可以尝试继续看下面的情况  
```javascript
const obj={
  name:'obj',
  fn1:()=>{
    console.log('fn1',this);
  },
  info:{
    fn2:()=>{console.log('fn2',this);}
  }
}

obj.fn1();// Window 
obj.info.fn2();// Window ❓❓
obj.fn1.call('cc');// Window 
obj.info.fn2.call('cc');// Window 
```
如果这里你也答对了，那么恭喜你，你可以在大部分场景下正确实战应用了🎉💐🌼   
那什么情况下这个this可能指向obj呢？继续看下去：    
```javascript
const obj={
  name:'obj',
  fn1:function(){
    let fn = ()=>{ console.log('fn1',this); }
    fn();
  },
  fn2:()=>{
    let fn = ()=>{ console.log('fn2',this); }
    fn();
  }
}
obj.fn1();// obj  ❓❓
obj.fn2();// Window ❓❓
obj.fn1.call('cc1');// cc1 ❓❓
obj.fn2.call('cc2');// Window ❓❓
```
这里开始如果你没答对，那么代表你没有真正理解箭头函数的this原理  
回到开始的问题，我们用一张图来演示箭头函数内部this指向的原理：
> 如果图片小请放大窗口  

![](http://img.vuedata.cn/arrowThis.png)

根据图片我们总结：
1. 箭头函数内部的this在`定义时就确定`了它`来源于哪个函数作用域下的this`
2. 在寻找箭头函数内this到底来源于哪里时，要往箭头函数`外层逐层寻找第一个是函数作用域`的区域，箭头函数内部的this指向的就是这个区域的this所指向的内容
3. 因为箭头函数不存在真正意义上的this，所以使用`call是无法直接改变内部的this指向`，而想要改变它this的指向则需要通过`改变其外层函数作用域的this指向来达到目的`

> 下次再碰上不知道如何找This时打开这两张图来参考吧






##### 严格模式下，函数的 this 是 undefined 而不是 Window
~~~javascript
// 非严格
function fn1() {
  return this;
}
fn1(); // Window

// 严格
function fn2() {
  'use strict';
  return this;
}
fn2(); // undefined
~~~



##### this指向谁?

~~~javascript

var myobj={
  count:1,
  getCount:function(){
    console.log(this);//myobj
  },
  getCountArrow:()=>{
    console.log(this);//window
  },
  getCountArrow2:function(){
    let fn=()=>{ console.log(this) };
    return fn();//myobj
  },
}
~~~

~~~
myobj.getCount() ` myobj `
myobj.getCountArrow() `window`
myobj.getCountArrow2() `myobj`
~~~

**原理**
* 普通函数：在执行的时候才绑定this,就像下面的步骤 

  `myobj.getCount()` 在执行时等同于执行了 `myobj.getCount.call(myobj)`;
  所以getCount内this指向了`myobj`

* 箭头函数：它的this指向取决于自外层第一个普通函数的this

  * getCountArrow 在定义的时候往外层寻找函数，myobj不是函数，再外层只有window所以this指向window。
  * getCountArrow2内的箭头函数`fn`往外层寻找函数  
    getCountArrow2是function,fn内的this指向getCountArrow2所指向的this  
    而调用 `myobj.getCountArrow2()`等同于 `myobj.getCountArrow2.call(myobj)` getCountArrow2内部的this指向了myobj, 
    所以 getCountArrow2 里的this是myobj,所以箭头函数内的this也是myobj
  * 利用这个原理，我们想改变getCountArrow2内fn箭头函数的this可以这么做
  `myobj.getCountArrow2.call({name:'cx'})` 这样fn的this就指向了{name:'cx'}了

**结合上面的原理以下输出的是**

* var fn=myobj.getCount;

  fn() ==> window.fn() ==> fn.call(window)  `window`

*  var fn=myobj.getCountArrow2;

    fn() ==> window.fn() ==> fn.call(window) ==> getCountArrow2内部的this === window ==> 箭头函数this===window `window`


**箭头函数的this是不能被改变的案例**
~~~javascript
var myobj={
    count:1,
    getCount:function(){
      console.log(this);
    },
    getCountArrow:()=>{
      console.log(this);
    },
    getCountArrow2:function(){
      let fn=()=>{ console.log(this) };
      return fn();
    },
  }
var fn = myobj.getCountArrow;
fn.call({name:'cx'});// 输出 windows

var fn = myobj.getCountArrow2;
fn.call({name:'cx'});// 输出 {name:'cx'} 因为getCountArrow2是function，function可以被改变this指针，而内部的箭头函数的this是取决于function的this是谁
~~~
