
### 函数组件的渲染优化

#### @ 组件使用的区别 `<Counter>`和`{Counter()}`?

~~~javascript
  const Counter=(props)=>{
    const {count,tag} = props;
    console.log(`渲染${tag}`)
    // p 标签上的data-time用于识别标签被创建时的时间戳，如果真发生了重新渲染则时间戳会发生变化
    return <p data-time={Date.now()}>tag:{tag},count={count}</p>
  }

  const Demo = (props) => {
    const [count, setCount] = useState(1);
    const [time, setTime] = useState(Date.now());

    return (
      <>
        <p>时间:{time}</p>
        <!-- 以下2种方法有什么区别？ -->
        <Counter count={count} tag={'组件1'}/>
        {Counter({count:count,tag:'组件2'})}
        <Btn onClick={()=>{setCount(v=>v+1)}} >计数器+1</Btn>
        <Btn onClick={()=>{setTime(Date.now())}} >更新时间</Btn>
      </>
    )
  }

  每次点击 `=计数器+1=`   
  控制台输出结果 :   
    渲染组件2  
    渲染组件1  
  <p>标签的data-time时间戳每次点击后`发生变化`

  每次点击 `=更新时间=`   
  控制台输出结果 :   
    渲染组件2  
    渲染组件1  
  <p>标签的data-time时间戳每次点击后`发生变化`
~~~


* 优化方法1：用`React.memo`  
  如果组件内部依赖刷新的参数比较简单，只依赖于props下面第一层属性的值的变更，则可以使用`React.memo`

  ```javascript

    const Counter=React.memo((props)=>{
      ...
    });

    此时每次点击 `=更新时间=`   
    控制台输出结果 :   
      渲染组件2  
      渲染组件1  
    <p>标签的data-time时间戳每次点击后`没有变化`
  ``` 
  
  问题：  
    通过 `{Counter()}`方法使用组件会被报错，因为经过`React.memo`处理后返回的Counter并不是一个方法，而是一个对象


* 优化方法2：使用`useMemo`  
  如果组件内部数据结构及标签较为复杂，那么需要针对性的使用`useMemo`来优化渲染

  ~~~javascript
    const Counter=(props)=>{
      const {count,tag} = props;
      console.log(`渲染${tag}`)

      - return <p data-time={Date.now()}>tag:{tag},count={count}</p>
      + return useMemo(()=>{
          console.log(`\t useMemo重新渲染 ${tag}`)
          return <p data-time={Date.now()}>tag:{tag},count={count}</p>
        },[count]);
    };

  此时每次点击 `=更新时间=`   
  控制台输出结果 :   
    渲染组件2  
    渲染组件1  
  <p>标签的data-time时间戳每次点击后`没有变化`
  ~~~  

    * 如果此时我们将`Counter`组件在`Demo`内部实现变为

      ~~~javascript
      const Demo = (props) => {
        const Counter=()=>{}
        return  ...
      }
      此时每次点击 `=更新时间=`   
      控制台输出结果 :   
        渲染组件2  
        渲染组件1  
          useMemo重新渲染 组件1 
        <p>标签的data-time时间戳每次点击后`变化`
      ~~~
      问题：
      * 使用`<Counter>`方法的组件每次点击的时候都重新渲染了  
      * 使用`{Counter()}`方法的组件每次点击的时候没有重复的渲染

      原因：  
      * 父组件渲染的时候`Counter`由于在`Demo`内部被重新创建了新的`Counter`对象，所以每次都是一个新对象  
      * 而`{Counter()}`经过第一次渲染后，返回的是一个`useMemo的对象`，所以再次渲染的时候会进行检测是否需要重新渲染  

      总结：
      * 我们尽量不要将组件的申明写在一个组件内部
      * React.memo处理后的组件是一个对象不是function，因此不能通过{Counter()}的方法调用
      * 复杂组件情况下，可以使用`useMemo`对需要避免重复渲染的部分进行优化