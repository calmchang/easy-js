

##### 取整操作
~~~javascript
var x = 1.23 | 0;  // 1
var x = ~~1.23;  // 1
var x = parseInt(1.23);// 1
~~~


##### +转换成int
~~~javascript
var x = +'123.345';
//等同于
var x = Number('123.345');
~~~

##### %取模
~~~javascript
var x = 1%3;//1
var x = 2%3;//2
var x = 3%3;//0
var x = 4%3;//1
var x = 5%3;//2
var x = 6%3;//0
~~~

##### ^ 异或运算