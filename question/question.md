
## =====基础=====

### 跨域设置问题

```javascript
var xhr=new XMLHttpRequest()
xhr.withCredential=true;//此选项作用？设置后跨域配置有什么区别？
xhr.open('POST','跨域接口');
xhr.send();
```

### @使taskA和taskB并发执行，并当A、B、C三个任务全部执行完毕后返回  
```javascript
async function task(){
  await taskA();
  await taskB();
  await taskC();
  return true;
}
```

### @输出结果是？为什么？涉及类型转换  
```javascript
  if(""){console.log(true)}
  if([]){console.log(true)}
  console.log([]=="");
```

### @正则表达式  
将手机号码 13712345678 用正则表达式转换成 137-1234-5678 格式
> '13712345678'.replace(/(\d{3})(\d{4})(\d{3})/,'$1-$2-$3')

### this是谁?  
```javascript

var x={
  name:'tom',
  fn1:function(){
    console.log(this);
  },
}
x.fn1();
var temp = x.fn1;
temp();
x.fn1.call({name:'cc'});

var x={
  name:'tom',
  fn2:()=>{
    console.log(this);
  }
}
x.fn2();
var temp = x.fn2;
temp();
x.fn2.call({name:'cc'});

var x={
  name:'tom',
  fn3:function(){
    let temp=()=>{ console.log(this) };
    temp();
  }
}
x.fn3();
var temp = x.fn3;
temp();
x.fn3.call({name:'cc'});

var x={
  name:'tom',
  fn4:function(){
    return ()=>{ console.log(this) };
  }
}
x.fn4()();
x.fn4.call({name:'cc'})();


```

### @完成test1和test2函数，打印所有传入的参数值  
```javascript
function test1(){}
const test2=()=>{}
test1(1,2,3,4,5)
test2(1,2,3,4,5,6)
```

### mixin、@extend、@include、%item、@function 区别？

### @事件传递机制  
* 如何改动能分别输出：
  * 1,2,3,4
  * 4,1,2,3
  * 4
  * 1,2  

```html
  <body>
    <div id="parent">
      <div id="child"> click </div>
    </div>

    <script>
      var child=document.getElementById('child');
      var parent=document.getElementById('parent');
      child.addEventListener('click', (event)=> {
        console.log(1);
      });
      child.addEventListener('click', (event)=> {
        console.log(2);
      });
      child.addEventListener('click', (event)=> {
        console.log(3);
      });
      parent.addEventListener('click', (event)=>{
        console.log(4);
      },true);

      // event.stopImmediatePropagation();
      // event.stopPropagation(); 
    </script>
  </body>
```




### @项目中遇到的困难及解决过程？

### 如何优化首屏时间？

### 页面自适应策略？

### iframe父子之间通信，如何做适配？

### static  relative 区别

### 跨域cookie解决方案

## =====React=====
### @函数式组件中 父组件如何调用子组件的方法 useImperativeHandle + forwardRef

### @并发调用setState后的值  
```javascript
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      count:0,
      family:{
        father:{name:'aa'},
        son:{name:'cc'}
      }
    }
  }

  changeName(){
    this.setState({
      family:{
        son:{name:'x'}
      }
    });
    console.log(this.state);
  }

  add(){
    setState({count:this.state.count+1});
    console.log(this.state.count);
    //当多处同时调用add时会怎样？
  }


  reduc(){
    setTimeout(() => {
      this.setState({count:this.state.count-1},()=>{this.setState({count:999})});
      this.setState({count:this.state.count-1},()=>{this.setState({count:this.state.count-1})});
      this.setState({count:this.state.count-1});
      console.log(this.state.count);
      //输出996，这里的setState是阻塞式执行，每一行setState执行完自己后，跳入下一行执行
    },0);
    
  }


}
```

### @react-router如何做到页面的缓存及页面切换的过场动画

### @平时如何调试react项目？渲染效率？多余渲染？耗时？
useMemo useCallback


## =====Antd=====
### @如何改写antd的全局样式比较合理？比如所有组件的基础高度，less javascriptEnabled



## =====webpack=====



### @webpack解释下下面这段配置的结果
```javascript
splitChunks: {
  cacheGroups: {
    modules: {
      test: /(node_modules)/,
      priority: 2,
      name:"modules",
      chunks:'all',
      enforce:true
    },
    default: {
      name:'default',
      minChunks: 2,
      priority: 1,
      chunks:'all',
      enforce:true
    }
  },
},
plugins:[
 new HtmlWebpackPlugin({
    template:path.join(__dirname,'index.html'),filename:'index.html',inject:true
  }),
]
```

### @webpack层面优化项目能做哪些？