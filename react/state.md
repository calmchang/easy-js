

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

