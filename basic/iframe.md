
#### 父子iframe的嵌套、通信、窗口大小自适应

父页面
```html
 <script>
    // 父窗口收到子页面的消息
    window.addEventListener('message',(e)=>{
      const {msg,id}=e.data;
      if(msg==='resize'){
        //设置iframe窗口高度
        document.querySelector(`#${id}`).style.height=e.data.height+'px';
      }
    })
 </script>
<iframe id="footer" name="footer" src="https://可以跨域.com/子页面.html" ></iframe>
```
子页面  

```javascript
function sendMessage(data){
  window.parent.postMessage(data,'*')
}
window.onload=function(){
  //发送一条页面resize消息，通知父窗口更新iframe窗口大小
  sendMessage({
    msg:'resize',
    id:window.name,//获取父页面上iframe的name
    height:document.body.offsetHeight,//获取当前页面的总高度
    width:document.body.offsetWidth,//获取当前页面总宽度
  })
}
```