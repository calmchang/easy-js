
##### 元素尺寸
  * 获取一个标签的真实宽度高度(比如<p>标签文字真实长度) dom.scrollWidth ,而获取一个标签的可视宽高度为 dom.clientWidth;
  * 获取屏幕的可视高度 window.screen.height*window.devicePixelRatio
  
##### 获取页面滚动条的位置

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

#####  position问题

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

##### 当前滚动的dom  
```javascript
  document.scrollingElement;
```

##### 元素位置   
```javascript
  dom.getBoundingClientRect() 可以获取到该元素目前相对浏览器窗口的坐标
```

##### 元素当前css样式值    
```javascript
  window.getComputedStyle(document.getElementById('item2')).top
```

##### 将滚动条滚动至元素可见位置  
```javascript
dom.scrollIntoView()
```
