# 异步加载及分包

在React项目中，当站点路由、组件越来越多，体积越来越大的时，为了提升加载速度、减少流量消耗，我们主要会使用到两个技术：异步加载、代码分包  

这篇文章主要讲解的是组件的异步加载及代码分包实现方法  


### 异步加载
React项目中，我们主要用到`Suspense`和`lazy`实现组件的异步加载，Suspense和lazy是React对象下的两个对象。    

#### Suspense  
Suspense是一个React组件，它的作用是当它内部子组件未加载完毕时，以fallback内组件代替展示  

简单使用方法如下：
```jsx
  import React,{Suspense} from 'react';
  <Suspense fallback={<div>loading</div>}>
    <MyComponent />
    <MyComponent2 />
  </Suspense>
```

Suspense内部的异步组件需要通过`lazy`来加载返回的一个异步加载组件

#### lazy

lazy返回的是一个React组件  
lazy接收的是一个Promise,当它异步加载完毕后需要resolve一个标准的`export deafult`，对象内是一个React组件  

常规使用方法：
```jsx
import React,{lazy} from 'react';
const MyComponent = lazy(()=>import('./myComponent.jsx'));

<Suspense fallback={<div>loading</div>}>
  <MyComponent />
</Suspense>
```

你也可以自己封装Promise来异步加载你的组件  
原理解释代码： 
```jsx
import React,{lazy} from 'react';
const MyComponentAsync = lazy( ()=>{
  return new Promise(resolve=>{
    const MyComponent=(props)=>{
      return <div>MyComponent</div>
    }
    setTimeout(()=>{
      resolve({
        default:MyComponent
      })
    },2000)
  }
}))

<Suspense fallback={<div>loading</div>}>
  <MyComponentAsync />
</Suspense>

```

### 代码分包  
原理：在webpack构建的项目下，webpack会自动将异步加载的代码块进行单独chunk切割，这样当在需要调用的时候再去动态加载它  

实现：以下是两个异步加载方式的对比，一个是基于require一个基于es6 import  

<!-- panels:start -->
<!-- div:left-panel -->
```jsx
  let Component;
  require.ensure([], load => {
      Component = load('./myComponent.jsx').default;
    });
```
<!-- div:right-panel -->
```jsx
  import('./myComponent.jsx').then(com=>{
    Component = com.default;
  })
```
<!-- panels:end -->

被异步加载的代码块,webpack会将其拆分到独立的`[chunkname].js`代码包中，在需要的时候异步加载这个文件,`[chunkname]`的名字将由webpack自动分配  

我们也可以人为来自己制定代码块如何拆分组合，比如我希望将`myComponent.jsx`和 `myComponent2.jsx`两个模块统一拆分到`myChunk.js`这个文件中

<!-- panels:start -->
<!-- div:left-panel -->
```jsx
  let Component,Component2;
  require.ensure([], load => {
      Component = load('./myComponent.jsx').default;
  },"myChunk");
  require.ensure([], load => {
      Component2 = load('./myComponent.2jsx').default;
  },"myChunk");
```
<!-- div:right-panel -->
```jsx
  import(/*webpackChunkName:'myChunk'*/'./myComponent.jsx').then(com=>{
    Component = com.default;
  })
  import(/*webpackChunkName:'myChunk'*/'./myComponent2.jsx').then(com=>{
    Component = com.default;
  })
```
<!-- panels:end -->


### 配合React-Router实现路由页面异步加载

这里我们以react-router问案例来实现页面的异步加载  

```jsx
import React, { Suspense,lazy } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

const Page1 = lazy(()=>import(/*webpackChunkName:'page1'*/'./page1.jsx') );
const Page2 = lazy(()=>import(/*webpackChunkName:'page2'*/'./page2.jsx') );

const BasicRoute = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div>loading page</div>}>
        <Routes>
          <Route path='/' element={<Page1 />} />
          <Route path='/2' element={<Page2 />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

ReactDOM.render(<BasicRoute />, document.getElementById('main-view'));
```