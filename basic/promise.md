
##### Promise.allSettled

在所有的 promise 都结束的时候做一些操作，而并不在乎它们是成功还是失败  
Promise.allSettled() 方法返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise ，并带有一个对象数组，每个对象表示对应的 promise 结果。
~~~javascript
const promise1 = Promise.resolve(100);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'info'));
const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 200, 'name'))
Promise.allSettled([promise1, promise2, promise3]).
    then((results) => console.log(results));
/* 
    [
        { status: 'fulfilled', value: 100 },
        { status: 'rejected', reason: 'info' },
        { status: 'fulfilled', value: 'name' }
    ]
*/
~~~



##### 手写实现Promise

~~~javascript
class __Promise{

  constructor(task){
    this.status='';//pending,fulfilled,rejected
    this.callback = [];
    this.value='';
    this.task=task;
    this.run();
  }
  run=()=>{
    this.status='pending';
    setTimeout(()=>{
      this.task(this.reslove,this.reject);
    },0)
  }
  reslove=(value)=>{
    this.status='fulfilled';
    this.nextTask('reslove',value);
  }
  reject=()=>{
    this.status='rejected';
  }

  then=(reslove,reject)=>{
    this.callback.push({reslove,reject});
    return this;
  }

  nextTask=(type,value)=>{
    let task = this.callback.shift();
    let next;
    if(type==='reslove' && task){
      next = task.reslove(value);
      if( next && next.constructor === __Promise){
        next.then((reslove_value)=>{
          this.nextTask('reslove',reslove_value)
        });
      }else{
        this.nextTask('reslove',next);
      }
    }
  }

}


let p=new __Promise(resolve => {
  setTimeout(resolve, 1000,'step1')
}).then(val => {
  console.log(val);
  return new __Promise(reslove=>{
   setTimeout(reslove,1000,'2-1');
  }).then(v=>{
    console.log(`3-1:${v}`)
    return new __Promise(reslove=>{
      setTimeout(reslove,2000,'5-1')
    })
    // return '4-1';
  });
}).then(val => {
  console.log('step2:'+val)
})

~~~
