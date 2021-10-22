

#### 1像素边框  

核心是利用`transform:scale(.5)`将整个外部的框缩放一半达到目的  

```scss
.border {
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid black;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: left top;
  }
}
```

#### 文本溢出

* 单行溢出
  ```css
  .line-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ```

* 多行溢出
  ```css
  .three-ellipsis {
    overflow: hidden;

    /* 必要组合 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
  }
  ```
* 效果图  
  ![](http://img.vuedata.cn/ellipsis.jpg)


#### 隐藏滚动条

```css
&::-webkit-scrollbar {
      display: none;
    }
```

#### 修改滚动条样式  
```css
//整体
::-webkit-scrollbar{
  width:10px;//滚动条宽度
  background:red;//滚动条颜色
  display:block;//强制一直显示
}
//整个滚动条的轨道
::-webkit-scrollbar-track
{
  width: 3px;
  background-color: #F5F5F5;//整个滚动条背景颜色
}
//滚动条当前可拖动的bar的样式
::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #D62929;
}
```

#### 图片保持宽高比居中自动裁剪填充

```css
img{
  object-fit:cover;
}
````