


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
