
# 基础

##### es6函数带默认参数时将生成声明作用域
~~~javascript
var x = 10;
function fn(x = 2, y = function () { return x + 1 }) {
  var x = 5;
  return y();
}
fn();   // 3
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











##### 格式化时间字符串  
~~~javascript
  var date = new Date(); 
  var type ="zh-CN";
  var types=["2-digit","numeric","narrow","short","long"];

  var options = {   
    hour:types[1],
    minute:types[1],
    second:types[1],
    hour12:false,
  };


  //14:08:30
  console.log( new Intl.DateTimeFormat(type,options).format(date) );


  var options = {   
  	year:types[1],
  	month: types[0],
    day: types[0],
    hour:types[1],
    minute:types[1],
    second:types[1],
    hour12:false
  };

  //2018/05/22 14:06:59
  console.log( new Intl.DateTimeFormat(type,options).format(date) );


  var options = {   
  	year:types[1],
  	month: types[2],
    day: types[0],

  };

  //2018年5月22日
  console.log( new Intl.DateTimeFormat(type,options).format(date) );


  var options = {   
  	year:types[1],
  	month: types[0],
    day: types[0],

  };

  //2018/05/22
  console.log( new Intl.DateTimeFormat(type,options).format(date) );

~~~

##### 格式化货币
~~~javascript
new Intl.NumberFormat(["zh-CN"],{maximumFractionDigits:2}).format(123456.1264);//"123,456.13"
~~~


##### import\.meta

import.meta是一个给JavaScript模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的URL。 

`console.log(import.meta); // { url: "file:///home/user/my-module.mjs" }`