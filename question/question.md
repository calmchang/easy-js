
## =====基础=====

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
  if(""){console.log(true)} // false
  if([]){console.log(true)} // true
  console.log([]==""); // true
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

// ==============================================
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

// ==============================================

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

// ==============================================
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

### 如何优化首屏时间？loaded,domloaded

### 页面自适应策略？使用rem的注意事项？

### iframe父子之间通信，如何做适配？

### static  relative 区别

### @跨域设置问题、跨域cookie解决方案

```javascript
var xhr=new XMLHttpRequest()
xhr.withCredential=true;//此选项作用？设置后跨域配置有什么区别？
xhr.open('POST','跨域接口');
xhr.send();
```

![](http://img.vuedata.cn/iframecros.jpg)

1、你本地调试的站点地址为 `http://localhost:3000`     
2、你需要调用的接口域名为 `http://api.test.com`  
问题一：本地调试时如何可以跨域调用？
问题二：  
  此时你站点内嵌了一个iframe，打开了 `http://app.b.com/` 的站点，而`app.b.com`内会调用 `api.b.com` 的接口    
  此时有什么问题嘛？



### 如何将一个文件上传给后端？blob相关

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


### @redux在什么情况下用？有什么可以代替方案么？


## =====Antd=====
### @如何改写antd的全局样式比较合理？比如所有组件的基础高度，less javascriptEnabled


## =======Vue=======

### @分组懒加载  
```javascript
let tabHome = () => import( /* webpackChunkName: "group-home" */ '@/pages/index/home');
```

### @页面缓存  
1、用Vuex内设置一个cacheList[]数组，存放需要缓存的页面名称
2、router内通过钩子拦截页面跳转计算哪些页面需要keepAlive，管理cacheList  

```javascript

router.beforeEach((to, from, next) => {
  console.log(`before each ${from.name}->${to.name}`);
  if (to.meta && to.meta.keepAlive) {
    Vue.prototype.$store.commit("addCache", to.name);
  }

  if (to.query && to.query.removeCache) {
    Vue.prototype.$store.commit("removeCache", from.name);
  }
});
```
3、结合keepAlive include
```javascript
<keep-alive :include="cachedViews">
  ...
</keep-alive>

computed: {
    cachedViews() {
      return this.$store.state.cacheView;
    },
  },
```

## =====设计架构=====

### 直接使用getter\setter和使用proxy的区别？为什么要用proxy？
proxy的apply可以拦截方法调用  
hash可以处理key in中隐藏某些属性  
construct可以拦截new  

### @设计一个toast组件需要注意点什么？

### @webpack、rollup区别？

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


## ======综合======

* @自己解决过什么比较有技术难度的问题？
* @平时关注哪些公众号？
* @说说做公众号H5开发要接入哪些功能？
* @站点的统计用什么？
* @职业发展方向？
* @与同事利益有冲突时怎么抉择？比如2选1的晋升
