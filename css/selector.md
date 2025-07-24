

##### 名词解释 - 同级层:代表和当前元素在同一个层级的元素，不是当前元素的父元素也不是当前元素的子元素
~~~html
<div>
  <p></p><!--不匹配div同级层-->
</div>
<p></p><!--匹配div的同级层-->
~~~

##### 几个父子元素筛选器的区别

* `div~h3{color:red}`
匹配某父元素内的div元素之后的同级层的所有h3元素(中间可以间隔其它元素)
~~~html
<style>
    h3{color:black}
    div~h3{color:red;}
</style>
<body>
    <div>
      <h3>00<h3><!--不匹配-->
    </div>
    <hgroup>
      <div></div>
      <p>11</p>
      <h3>22<h3><!--匹配-->
      <section>
        <h3>33</h3><!--不匹配-->
        <hgroup>
          <h3>44</h3><!--不匹配-->
        </hgroup>
      </section>
    </hgroup>
    <h2>66</h2>
    <h3>77</h3><!--匹配-->
</body>
~~~
<!-- [![](http://img.vuedata.cn/codesandboxicon1.png?imageView/2/w/32)](https://codesandbox.io/s/css-84ssw?file=/index.html) -->
[![](../assets/jsdoc/codesandboxicon2.png)](https://codesandbox.io/s/css-84ssw?file=/index.html)


* `div>h3{color:red}`
匹配某父元素内的div元素的`第1层子元素`是h3的对象
~~~html
<style>
    h3{color:black}
    div>h3{color:red;}
</style>
</head>
<body>
    <div>
      <h3>00<h3><!--匹配-->
      <section>
        <h3>11</h3><!--不匹配-->
      </section>
      <h3>22<h3><!--匹配-->
    </div>
    <h3>33</h3><!--不匹配-->
    <div></div>
    <h3>44</h3>
</body>
~~~
[![](../assets/jsdoc/codesandboxicon2.png)](https://codesandbox.io/s/brother3-l3ole)

* `div h3{color:red}`
匹配某父元素内的div元素内所有子元素是h3的(无论多少层嵌套)
~~~html
<style>
    h3{color:black}
    div h3{color:red;}
</style>
</head>
<body>
    <div>
      <h3>00<h3><!--匹配-->
      <section>
        <h3>11</h3><!--匹配-->
      </section>
      <h3>22<h3><!--匹配-->
    </div>
    <h3>33</h3><!--不匹配-->
    <div></div>
    <h3>44</h3><!--不匹配-->
</body>
~~~
[![](../assets/jsdoc/codesandboxicon2.png)](https://codesandbox.io/s/brother2-74yi6?file=/index.html)


* `div+h3{color:red}`
匹配某父元素内的div元素后第1个是h3元素的对象
~~~html
<style>
    h3{color:black}
    div h3{color:red;}
</style>
</head>
<body>
    <div>
      <h3>00<h3><!--不匹配-->
      <h3>01<h3><!--不匹配-->
    </div>
    <div></div>
    <h3>11<h3><!--匹配-->
    <h3>22<h3><!--不匹配-->
</body>
~~~
[![](../assets/jsdoc/codesandboxicon2.png)](https://codesandbox.io/s/brother4-rfx5b?file=/index.html)


##### 同时满足有类A和类B的DOM
`.A.B{...}`


##### &#58;first-child 或 nth-child(1)
`p:first-child` 匹配某父元素下第1个元素是p元素的对象
~~~html
<p>1</p><!--匹配-->
<hgroup>
  <p>1-1</p><!--匹配-->
  <p>1-2</p><!--不匹配-->
</hgroup>

<p>2</p><!--不匹配-->
<hgroup>
  <span>3-1</span>
  <p>3-2</p><!--不匹配-->
  <p>3-3</p><!--不匹配-->
</hgroup>
~~~

##### &#58;first-of-type 或 nth-of-type(1)
`p:first-of-type` 匹配某父元素下第1次出现的p元素对象
~~~html
<hgroup>
  <p>1-1</p><!--匹配-->
  <p>1-2</p><!--不匹配-->
</hgroup>

<p>2</p><!--匹配-->
<hgroup>
  <span>3-1</span>
  <p>3-2</p><!--匹配-->
  <p>3-3</p><!--不匹配-->
</hgroup>
~~~