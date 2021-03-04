##### indexOf() 不需要再比较数字,按位操作效率高点，代码也简洁一些。也可以使用es6的 includes() 。但写开源库需要考虑兼容性的道友还是用 indexOf 比较好
~~~javascript
const arr = [1, 2, 3];
// 存在，等效于 > -1
if (～arr.indexOf(1)) {

}
// 不存在，等效于 === -1
!~arr.indexOf(1);
~~~

##### 创建数组
~~~javascript
new Array(5) === Array(5)  // length=5  and  [ , , , , ]
new Array(1,2,3) === Array(1,2,3) === Array.of(1,2,3)//length=3 and  [1,2,3]
Array.of(5) // length=1 and [7]
Array.from([1,2,3])// [1,2,3] 
Array.from(“abc”) // [‘a’,’b’,’c’]
[1,2,3].fill(8)// [8,8,8]
[1].slice(-2)// [1]  因为-2的位置在1的左边，所以从1的左边一直取数据到结尾，所以结果[1]
[1].slice(-3)// [1] 
[1,2].slice(-2)// [1,2]
[1,2].slice(-3)// [1,2]  
[1,2,[3,4]].flat(Infinity) // [1,2,3,4]
~~~

##### 创建2*2的二维数组

~~~javascript
//方法一 ✅
var arr = new Array(2).fill(null);  
arr.forEach((item,idx)=>{
  arr[idx]=Array(2).fill(null);
})
arr[0][1]=123;//操作数组

//方法二 ❌
var arr = Array(2);
arr.forEach(item=>item=Array(2));//Array(2)后，由于没有对数组进行赋值填充，forEach是无法遍历到数组内容的

~~~

##### fill注意事项
~~~javascript
//原始目的是想创建一个数组，并且用默认年龄为1岁填充数据
var arr = new Array(2).fill({age:1});
//随后对其中一个数据的年龄进行了修改
arr[0].age=15;

console.log(arr);
//打印后发现所有数据的age都变成了15
//0:{age:15}
//1:{age:15}

~~~
> fill在填充的时候只是将数组空间内的内容指向 fill对象的指针，并不是重新申请了对象，所以要慎用对象、数组去填充

##### 数组之间计算

* 交集:2个数组内都有的则算
~~~javascript
var arr1=[1,2,3];
var arr2=[1,4,5,2];
arr1.filter( (v)=>arr2.includes(v) ) //[1,2]
~~~
* 差集:属于数组A，不属于数组B的
~~~javascript
var arr1=[1,2,3];
var arr2=[1,4,5,2];
arr1.filter( (v)=>!arr2.includes(v) )//[3]
~~~
* 并集:2个数组内不重复的都算
~~~javascript
var arr1=[1,2,3];
var arr2=[1,4,5,2];
[...new Set( [...arr1,...arr2] ) ]//[1,2,3,4,5]
~~~
* 补集:2个数组内重复的则不要
~~~javascript
var arr1=[1,2,3];
var arr2=[1,4,5,2];
[...arr1.filter( (v)=>!arr2.includes(v) ) , ...arr2.filter( (v)=>!arr1.includes(v) ) ] //[3,4,5]
~~~

##### 数组遍历
![数组遍历方法](http://img.vuedata.cn/arraymap.png)
> 除了for是万精油，性能也最好外，其实其他几种方法都是针对不同场景下的，所以不用太纠结性能问题，只要选择适合自己的场景就行，杠精的话可以用for实现一切

#### 常用数组数据的添加和获取
![常用数组数据的添加和获取](http://img.vuedata.cn/arraygetpost2.png)

##### for...of，for...in,[...]区别

~~~javascript

var arr = [1,2,3];
for(n of arr{console.log(n)} //✅
arr.forEach(item=>console.log(item)) //✅

for(n of "abc")console.log(n)//✅ a,b,c
[...'abc'];//✅['a','b','c']
for(n in "abc")console.log(n)//❌ 0,1,2

var arrObj = {name:'1',age:12};
for(n of arrObj{console.log(n)} // ❌
for(n in arrObj{console.log(n)} // ✅ name,age

var m = new Map();
m.set('peter',23);
m.set('tom',11);
for(n in m)console.log(n);//❌
for(n of m)console.log(n);//✅ ['peter',23],['tom',11]
[...m];//✅ [['peter',23],['tom',11]]


var reg = /[0-3]/g;
var data = '2020'; 
var ret = data.matchAll(reg);
for(n of ret)console.log(n);//✅ ['2',index:0,input:'2020],['0',index:1,input:'2020],['2',index:2,input:'2020],['0',index:3,input:'2020]
[...data.matchAll(ret)];//✅ [ ['2',index:0,input:'2020],['0',index:1,input:'2020],['2',index:2,input:'2020],['0',index:3,input:'2020]  ]

~~~