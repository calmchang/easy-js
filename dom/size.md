
##### @监听DOM变化

监听DOM的尺寸变化

```js
  const sizeListener=new ResizeObserver((items)=>{
    if(!items||items.length<=0)return;
    // items[0].target
    //尺寸变化
  })
  sizeListener.observe(dom);//开始监听
  //sizeListener.unobserve(dom);//释放监听
```

监听DOM内部的属性或子元素发生变化  

```js
    const mutationCallback = (mutations) => {
      for(let mutation of mutations){
        console.log(mutation.type);//哪个属性发生了变化
      }
    };
    let listener = new MutationObserver(mutationCallback);
    listener.observe(dom, {childList: true,attributes:true,subtree:true});
    //  listener.disconnect()//释放监听

```


##### @元素尺寸  
  * 获取一个标签的真实宽度高度(比如<p>标签文字真实长度) dom.scrollWidth ,而获取一个标签的可视宽高度为 dom.clientWidth;
  * 获取屏幕的可视高度 window.screen.height*window.devicePixelRatio  

##### @获取页面滚动条的位置

~~~html
<body>
  <div style="width:100px;height:1000px;"></div>
  <button id='btn'>获取滚动条位置</button>
  <script>
    document.querySelector("#btn").onclick = function () {
      console.log(document.documentElement.scrollTop);//正确:当有 <!DOCTYPE html> 标签时
      console.log(document.body.scrollTop);//错误：:当有 <!DOCTYPE html> 标签时
    };
  </script>
</body>

~~~

##### @position问题

~~~html
* {
    padding: 0;
    margin: 0;
    border: 0;
}
div{
  position:relative;
}
<body>
  <div style="height:200px;"></div>
  <div><p id="txt">123</p></div>
  <button id='btn'>获取txt的top值</button>
  <script>
    document.querySelector("#btn").onclick = function () {
      //当 div{position:relative}
      console.log(document.querySelector('#txt').offsetTop);//200
      //当 div{position:static}
      //console.log(document.querySelector('#txt').offsetTop);//0
    }
  </script>
</body>

~~~

##### @当前滚动的dom  
```javascript
  document.scrollingElement;
```

##### @元素位置   
```javascript
  dom.getBoundingClientRect() 可以获取到该元素目前相对浏览器窗口的坐标
```

##### @元素当前css样式值    
```javascript
  window.getComputedStyle(document.getElementById('item2')).top
```

##### @将滚动条滚动至元素可见位置  
```javascript
dom.scrollIntoView()
```

##### @监听元素进入可视范围
```javascript
let dom=document.querySelector('#id');
let observe = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) {
    // 移出可视范围内
    return;
  }
  //进入可视范围内
});
observe.observe(dom);
// 资源销毁
// observe.disconnect();|| observe.unobserve(dom)
```

##### @sticky-元素粘性定位
如下情况，stickyDom在DOM流中所处位置如果top>20px，则按实际位置渲染，当我们下滑滚动条时，如果top<20px则会将其固定在top=20px的位置上  

```html
<style>
.stickyDom{
  position: sticky;
  top:20px;
}
.block{
  width:100%;
  height:300px;
}
</style>
<body>
<section>
  <div class='block'>模块1</div>
  <div class='block stickyDom'>粘性模块</div>
</section>
</body>
``` 



##### @获取元素宽高  
 
* offsetWidth和clientWidth区别?

  offsetWidth：当前元素整体占用空间的大小,包含了滚动条和border在内  
  clientWidth：当前元素内的实际内容占用的空间大小，不包含滚动条和border
  >> 也就是offsetWidth去掉边框和滚动条占位后`offsetWidth - 元素border - scroll`的大小,但是如果元素是`display:inline`则值为0

例如一个dom的样式为：  
```css
.content:{
  width:1080px;
  padding:2px;
  border:5px solid red;
  margin:10px;
}
```
* 当 `box-sizing`为默认值`content-box`时
  * dom.offsetWidth= `内容宽度+padding+border`= 1080+(2*2)+(5*2)=1094,其中 `内容宽度=内容+滚动条宽度`
  * dom.clientWidth:`内容宽度+padding-scrollWidth`= 1080+(2*2)=1084

* 当 `box-sizing: border-box`时
  * dom.offsetWidth:`内容宽度+padding+border` = 1080 ,其中 `内容宽度=内容+滚动条宽度`
> 此时 contentWidth=1080-(2*2+5*2)=1066
  * dom.clientWidth:`内容宽度+padding-scrollWidth` = 1066+2*2=1070

> 注意：当.content{display:inline}时，clientWidth=0，offsetWidth根据实际元素内容占用宽度变化而不是设置的1080


##### @获取页面的宽高
我们在一个1920宽的显示器上，打开一个浏览器，将窗口调整为812宽度然后打开页面，页面右侧的滚动条宽度设置为100px
用以下方法获取值：  
```javascript
document.body.clientWidth=712
document.body.offsetWidth=812
document.documentElement.clientWidth=812
document.documentElement.offsetWidth=812
window.innerWidth=812
window.screen.availWidth=1920 //设备屏幕的宽度，也就是显示器的宽度
```
综合来看如果想正确获取当前浏览器窗口宽度的兼容方法为
```javascript
var width= Math.max(document.body.offsetWidth,document.documentElement.offsetWidth,window.innerWidth)
```



##### @自适应尺寸的属性

css3新增了4个属性可以用于告诉元素尺寸如何计算，可用在width,height上
* fill-available:表示撑满父元素可使用的空间
* fit-content:表示将元素宽度收缩为内容宽度
  ```html
  //结果为son的宽度为测试的宽度并且在father中水平居中显示了
  .father{
    width:1080px;
  }
  .son{
    width:fit-content;
    margin:auto;
  }
  <div class='father'>
    <div class='son'>测试</div>
  </div>
  ```
* min-conten:当前宽度采用其内部子元素尺寸最小的那个子元素作为当前元素的尺寸
* max-conten:当前宽度采用其内部子元素尺寸最大的的那个子元素作为当前元素的尺寸
