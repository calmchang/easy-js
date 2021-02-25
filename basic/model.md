

单例、工厂、适配器、装饰器、发布订阅、代理


##### 利用闭包和Map给数据创建表，利用查表法快速查找数据
使用场景:
* 有一个几万长度的员工列表，需要快速能找到员工对应的数据
~~~javascript
function makeBufferMap(list){
    let map = {};
    list.forEach(item=>map[item]=true);//这里true也可以换成数据
    return function (val){
      return map[val];
    }
}
var findStaff = makeBufferMap(['jack','tom','peter']);
findStaff('jack');//true
findStaff('a');//false
findStaff('peter');//true
~~~
