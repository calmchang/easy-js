

### @时间
  * 在IOS内使用new Date('12-01-02 12:02:02') 引发异常，应该使用 new Date('12/01/02 12:02:02') 或 new Date(时间戳)

### @在UIWebView上图片随机会渲染不全的问题

> 网上有些解决方案说是因为使用了absolute或fixed布局导致，实际上将img以及其所有父级全部使用relative也是无法解决问题的
解决方法：
* 1、将IOS的webview切换成WKwebview
* 2、在`<img>`标签加载`src`前，保证图片已经成功被下载到本地
  ~~~javascript

  <!-- html -->
  <img id='photo' src='' />

  //js
  var src='xxx.jpg';
  var img = new Image()
  img.onload=()=>{
    //在这里将目标<img>标签的src进行赋值以保证图片一定是不需要从网上再次加载
    document.querySelector('photo').src=src;
  }
  img.src=src;
  ~~~


### @在早些版本的ios系统上的webview内，当input失去焦点后，窗口并没有回弹回去，解决方法是失焦后调用下面方法
 ~~~javascript
  window.onInputBlur=()=>{
    setTimeout(() => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop||0;
      window.scrollTo(0, currentPosition); 
    }, 100);
  }
  input.addEventListener('blur',()=>{window.onInputBlur()})
~~~


### @webview在打开瞬间窗口高度会发生变化,解决方法是将body,html的默认高度使用vw,vh，这样页面默认高度宽度是和屏幕大小一致了
~~~css
  body,html{
    width:100vw;
    height:100vh;
  }
~~~

### @移动端safari浏览器上，页面底部被工具栏遮挡了
~~~css
html{
  overflow:scroll
}
~~~