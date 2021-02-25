


### \<select\>
  * 获取选项值的时候 dom.selectedOptions[0]不兼容，应该用dom.options[dom.selectIndex]获取到对象

### \<img\>
  * src为空的时候，display设置为none
  * 标签内最好添加 onerror=''  错误监听，不然可能引发全局异常

### \<a\>
	* 打电话及发短信实现（打电话需要<meta name="format-detection" content="telephone=yes">将电话功能打开)
	* <a href="sms:10086">发短信给: 10086</a> 
	* <a href="tel:020-11811922">打电话给:0755-10086</a>

### \<input\>
  * 在禁止用户编辑的时候，设置readonly="readonly",不要用disabled
  * type为file的时候，如果display设置为none会导致某些机器无法正常使用，所以通过透明度来隐藏<div style="opacity:0;"><input /></div>
  * android机上，当软键盘弹出后可能会遮挡输入框，解决方法使用 scrollIntoViewIfNeeded
    ~~~javascript
    window.addEventListener("resize", function() {
      if(document.activeElement){
        if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
          if(document.activeElement.scrollIntoViewIfNeeded){
            window.setTimeout(function() {
              document.activeElement.scrollIntoViewIfNeeded();
            },0);
        }
        }
      }
    });
    ~~~
  * 唤醒摄像头
    ~~~html
        <input type="file" accept="image/*" capture="camera">//必须拍照
        <input type="file" accept="video/*" capture="camcorder">//必须录像
        <input type="file" accept="audio/*" capture="microphone">//必须拍照或录像

        <input id="fileImage" type="file" accept="image/*">//获取图片
        <input id="fileImage" type="file" accept="video/*">//获取录像
        <input id="fileImage" type="file" accept="audio/*">//获取图片或录像
    ~~~ 

### \<meta\>
  * 通常模式
    ~~~html
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1, maximum-scale=1,user-scalable=no">
    ~~~
  * 缩放模式
    ~~~html
    <script>
    var deviceWidth =  parseInt(window.screen.width);
    var destWidth = 640;
    var deviceScale = deviceWidth/destWidth;
    document.write('<meta name="viewport" content="width='+destWidth+', user-scalable=no">');
    </script>
    ~~~

### \<video\>
  * 自动播放
    * 在普通浏览器下当video标签加载完毕后调用play进行播放
    ```javascript
    domVideo.play();
    ```

    * 在苹果浏览器下
    ```javascript
      document.body.addEventListener("touchstart", ()=>{
        domVideo.play()
      }, { once: true });
    ```
    * 在微信浏览器下
    ```javascript
      document.addEventListener("WeixinJSBridgeReady", () => {
        domVideo.play()
      });
    ```