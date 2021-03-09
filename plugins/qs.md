
### stringify  
通过 qs.stringify({data}, { arrayFormat: 'indices' }) 可以将对象转化成ajax通信的参数

arrayFormat各种情况下的返回结果

* qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })  
  // 'a[0]=b&a[1]=c'
* qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })  
  // 'a[]=b&a[]=c'
* qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })  
  // 'a=b&a=c'
* qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })  
  // 'a=b,c'
