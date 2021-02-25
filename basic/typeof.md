
##### 超长的整数怎么
在控制台输入 `Number.MAX_SAFE_INTEGER`可以看到最大支持的整数为 `9007199254740991`  
es11开始引可是使用BigInt数据类型，对比写法如下
~~~javascript
var t=9007199254740992;
t=t*t;
console.log(t);//6.582018229284824e+63

var t=9007199254740992n;
t=t*t;
console.log(t);//81129638414606681695789005144064n

~~~
需要注意的是BigInt和Int不是一个数据类型，无法混合计算
~~~javascript
var t=123;
var t2=123n;
console.log(t+t2);❌
console.log(t2+123n);✅
~~~

##### NaN
这是目前为止 js 语言中唯一的一个不等于自己的数据。为什么？因为 NaN 代表的是一个范围，而不是一个具体的数值。 在早期的 isNaN() 函数中，即使传入字符串，也会返回 true ，这个问题已经在 es6 中修复。
~~~javascript
const x = NaN;
x !== x  // true
~~~
~~~javascript
isNaN('abc');       // true
Number.isNaN('abc') // false
~~~
所以如果您想兼容旧浏览器，用 x !== x 来判断是不是NaN，是一个不错的方案



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

##### 浮点操作不精确，老生常谈了，不过可以接受误差
~~~javascript
0.3 - 0.2 !== 0.1  // true
0.3 - 0.2 - 0.1 <= Number.EPSILON // true
~~~


##### parseInt 太小的数字会产生 bug
~~~javascript
parseInt(0.00000000454);  // 4
parseInt(10.23);          // 10
~~~

~~~javascript
1 + null          // 1
1 + undefined     // NaN

Number(null)      // 0
Number(undefined) // NaN
~~~

##### void 是个固执的老头 跟谁都不沾亲~~
~~~javascript
void 0 === undefined          // true
void 1 === undefined          // true
void {} === undefined         // true
void 'hello' === undefined    // true
void void 0 === undefined     // true
~~~

##### 是否存在这样的变量 x ，使得它等于多个数字？通过隐式转换，这样不是什么难的事情。
~~~javascript
const x = {
  value: 0,
  toString() {
    return ++this.value;
  }
}

x == 1 && x == 2 && x == 3;    // true
~~~

##### null 是 object 类型，但又不是继承于 Object ，它更像一个历史遗留的 bug 。鉴于太多人在用这个特性，修复它反而会导致成千上万的程序出错。
~~~javascript
typeof null === 'object';              // true
Object.prototype.toString.call(null);  // [object Null]
null instanceof Object;                // false
~~~


##### 常用检测数据类型的方法
![检测数据类型对比](http://img.vuedata.cn/typeoflist.png)
> 总体来说要想很精准的判断target是否为某个类型，使用 target.constructor最为准确, typeof和Object.prototype.toString.call用来判断js常规类型比较好，其中后者更准确

##### 判断常规数据类型
~~~javascript
var _toString = Object.prototype.toString;
function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}
toRawType({}) //  Object 
toRawType([])  // Array    
toRawType(true) // Boolean
toRawType(undefined) // Undefined
toRawType(null) // Null
toRawType(function(){}) // Function
toRawType(1) // Number
toRawType(NaN) // Number
toRawType('123') // String
function Father(){}
toRawType(new Father() ) // Object
~~~

##### 判断是否为某个类的实例

* 对于es6 class的继承
  ~~~javascript
  class Father{
    constructor(){}
  }
  class Son extends Father{
    constructor(){super()}
  }
  var obj = new Son()
  obj.constructor===Father // false
  obj.constructor===Son // true
  obj instanceof Son //true
  obj instanceof Fahter //true
  ~~~


* 对于原型链继承
  ~~~javascript
  function Father(){
  }
  function Son() {
    Father.apply(this,arguments);
  }
  Son.prototype=new Father();

  var obj = new Son()
  obj.constructor===Father // true
  obj.constructor===Son // false
  obj instanceof Son //true
  obj instanceof Fahter //true
  ~~~

> 可以发现原型链继承方式下用constructor判断是否为某个类构建出来的对象是不准确的，应该使用instranceof来判断更准确


##### 类型转换
  * ==和===
    * == 会在比较的时候将类型强制转换后对比
    * === 比较的时候不会进行类型转换
    
* 几种需要特别注意的转换结果:
  * Number('f') :  NaN
  * Number('')/Number(' ')/Number(null): 0
  * Boolean(-1)/Boolean(''): false
  * Boolean({})/Boolean(' ')：true
  * String({}): "[object Object]"

* 什么时候触发类型转换
  当2个变量遇见 >、<、==、加减乘除、||、&& 时
* 转换为 什么？
  * 规则：优先转换数值，不行再转字符串
  * 字符串==数值：字符串转数值
  * 字符串==对象：对象转换为字符串
  * 数值==对象：对象转换为数值,这里注意其实Number(obj)的时候相当于 Number(obj.toString())
  * 对象==对象：比较指针地址
  * null == right : null只同null和undefined相等，其他情况均false
  * !!:触发布尔转换
  * 数组: 数组先触发toString 然后在看对比对象进行再次转换
    * [1,2,3]+[4,5,6] : [1,2,3].toString()+[4,5,6].toString()
    * []+null+1: [].toString()+null+1 -> ''+null+1 -> "null"+1 -> "null1"
  * ||或&&:触发布尔

* 几个特别的案例,可以想想为什么？
  * NaN!=NaN //true
  * NaN===NaN //false
  * if({})、if([]) //true , if表达式中内容如果是Object由于Object转换成boolean是true所以表达式结果为true,Array也是Object所以返回true
  * if(0)、if('') //false
