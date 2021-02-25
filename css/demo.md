

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

#### 图片保持宽高比居中自动裁剪填充

```css
img{
  object-fill:cover;
}
````