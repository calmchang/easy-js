

### setState的更新机制

```javascript
//实际执行顺序是:+3,count=1的情况下，执行结果为4
this.setState({count:this.state.count+1});
this.setState({count:this.state.count+3});

//实际执行顺序是:+1,+3,count=1的情况下，执行结果为5，打印结果为1，1
this.setState((pre,props)=>{return {count:pre.count+1}})
console.log(this.state.count)
this.setState((pre,props)=>{return {count:pre.count+3}})
console.log(this.state.count)

//实际执行顺序是: +3,+100,count=1的情况下，执行结果为104
this.setState({count:this.state.count+1},()=>{this.setState({count:this.state.count+100})});
this.setState({count:this.state.count+3});

//实际执行顺序是: +1,+3,+100,count=1的情况下，执行结果为105
this.setState((pre,props)=>{return {count:pre.count+1}},()=>{this.setState({count:this.state.count+100})})
this.setState((pre,props)=>{return {count:pre.count+3}})

//实际执行顺序是: +3,+2,count=1的情况下，执行结果为6，打印结果为：1，1
this.setState({count:this.state.count+1},()=>{this.setState({count:this.state.count+100})});
console.log(this.state.count)
this.setState({count:this.state.count+3},()=>{this.setState({count:this.state.count+2})});
console.log(this.state.count)

//实际执行顺序是: +1,+2，+3，count=1的情况下，执行结果为7
setTimeout(() => {
  this.setState({count:this.state.count+1});
  this.setState({count:this.state.count+2});
  this.setState({count:this.state.count+3});
},0);

//实际执行顺序是: +1,1000,+2，+4，+3，count=1的情况下，执行结果为1009,打印顺序为：1000，1006，1009
setTimeout(() => {
  this.setState({count:this.state.count+1},()=>{this.setState({count:1000})});
  console.log(this.state.count)
  this.setState({count:this.state.count+2},()=>{this.setState({count:this.state.count+4})});
  console.log(this.state.count)
  this.setState({count:this.state.count+3});
  console.log(this.state.count)
},0);
```


### Function中的state

函数式组件中useState保存的状态，在异步调用时，注意state的值问题，最好使用ref来获取最新值

```javascript
export default function App() {
  const [count, setCount] = useState(0);

  const onClick = ()=>{
    setCount(count+1);
    setCount(count+5);
    setCount(count+10);// ⚠️问题1：最终setCount只被执行了最后这一行
  }
  // 1秒打印一次count值
  useEffect(()=>{
    setInterval(()=>{
      console.log(count);// ⚠️问题2：这里始终每秒打印的都是初始值0
    },1000);
  },[])
  return (
    <>
      <button onClick={onClick} >
        add
      </button>
      <div>count: {count}</div>
    </>
  );
}
```

以下解决这2个问题的方法：  

```javascript
// ⚠️ 1、使用useRef来包裹我们的state值
const useRefState=(v)=>{
  const [value,setValue] = useState(v);
  const refValue = useRef();
  refValue.current = value;
  useEffect(()=>{refValue.current=value},[value]);
  return useMemo(()=>[refValue,setValue]);
}

export default function App() {
  const [count, setCount] = useRefState(0);


  const onClick = ()=>{
    //⚠️ 2、推荐方法：用useState返回的set方法内回调方法来更新值
    setCount(pre=>pre+1);
    setCount(pre=>pre+5);
    setCount(pre=>pre+10);

    // ❌ 错误方法
    // setCount(count.current+1);
    // setCount(count.current+5);
    // setCount(count.current+10);
    // 注意这里最终还是只执行了最后一行setCount
    
    // ⚠️ 解决上面这个问题的方法
    // setTimeout(()=>{
    //   setCount(count.current+1);
    //   setCount(count.current+5);
    //   setCount(count.current+10);
    // },1)
    
  }
  // 1秒打印一次count值
  useEffect(()=>{
    // 使用useRef.current来获取最新值
    setInterval(()=>{
      console.log(count.current)
    },1000);
  },[])
  return (
    <>
      <button onClick={onClick} >
        add
      </button>
      <div>count: {count.current}</div>
    </>
  );
}
```

> 总结：我们自己在写Hooks的时候，为了防止外部调用不合理，尽量可以给外部使用者提供useRef的指针获取最新值，或者直接提供给外部一个getValue方法用来获取最新值

```javascript

// ❌ 坏的设计，value的地址每次都在发生变更
const useMyCount=(v)=>{
  const [value,setValue] = useState(v);
  return [value,setValue]
}
// ✅ 好的设计，值类型暴露给外部指针引用来获取
const useMyCount=(v)=>{
  const [value,setValue] = useState(v);
  const refValue = useRef();
  refValue.current = value;
  useEffect(()=>{refValue.current=value},[value]);
  return useMemo(()=>[refValue,setValue]);
}
// ✅ 好的设计,暴露给外部get和set的方法使用 
const useMyCount=(v)=>{
  const [value,setValue] = useState(v);
  const refValue = useRef();
  refValue.current = value;
  useEffect(()=>{refValue.current=value},[value]);
  const getValue = useCallback(()=>{
    return refValue.current;
  },[])
  return useMemo(()=>[getValue,setValue]);
}
```
