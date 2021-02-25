##### 闭包的作用是

1. 在函数内嵌套一个函数，会生成一个独立的作用域
2. 子作用于可访问父作用域，反之不能

为什么使用闭包  

	1、为了设计私有方法和变量、避免全局变量污染
	2、希望一个变量长期驻扎在内存中。

案例:
~~~javascript
////////不使用闭包///////
let count=1;
function getCode(){
  count++;
  return `code is ${count}`
}
getCode();//1
getCode();//2
getCode();//3

////////使用闭包///////
/**
* 1、利用闭包我们实现了将count私有化，防止被别人通过window.count进行修改
* 2、因为私有作用域，我们实现了类似对象的效果，每个getCode2生产出一个独立的对象f1,fn2，fn1和fn2在执行的时候都拥有自己的变量count计数器
*/
function getCode2(){
  let count=1;
  return function (){
    count++;
    return `code is ${count}`
  }
}
let fn1=getCode2();
let fn2=getCode2();

fn1();//1
fn1();//2
fn1();//3

fn2();//1
fn2();//2
fn2();//3
~~~


##### 函数表达式（非函数声明）中的函数名不可覆盖,当然，如果设置 var CC = 123 ，加声明关键词是可以覆盖的。
~~~javascript
const c = function CC() {
  CC = 123;
  return CC;
};

c(); // Function
~~~



##### Function.prototype 竟然是个函数类型。而自定义函数的原型却是对象类型。
~~~javascript
typeof Function.prototype === 'function';  // true

function People() {}
typeof People.prototype === 'object';      // true
~~~
所以我们设置空函数可以这么做：
~~~javascript
// Good 
const noop = Function.prototype;

// Bad
const noop = () => {};
~~~



##### .call.call 到底在为谁疯狂打call？,所以 fn1.call.call(fn2) 等效于 fn2.call(undefined)。而且无论您加多少个 .call，效果也是一样的。
~~~javascript
function fn1() {
  console.log(1);
}

function fn2() {
  console.log(2);
}

fn1.call.call(fn2); // 2
~~~



##### 构造函数如果 return了新的数据,在实例化构造函数时，返回非对象类型将不生效
~~~javascript
// 不返回
function People() {}
const people = new People();   // People {}

// 返回数字
function People() {
  return 1;
}
const people = new People();   // People {}

// 返回新对象
function Animal() {
  return {
    hello: 'world',
  };
}
const animal = new Animal();  // { hello: 'world' }
~~~


##### es6函数带默认参数时将生成声明作用域
~~~javascript
var x = 10;
function fn(x = 2, y = function () { return x + 1 }) {
  var x = 5;
  return y();
}
fn();   // 3
~~~



##### apply、bind、call区别
  * apply和call 传参方式不同
    * fn.call(this,a,b,c);
    * fn.apply(this,[a,b,c]);
    * fn.bind(this,a,b,c);
  * bind用于生成新对象,apply和call立即执行，当需要生成一个新对象一直绑定某个obj的时候，使用bind
    * var myFn=fn.bind(this,a,b,c); myFn();


