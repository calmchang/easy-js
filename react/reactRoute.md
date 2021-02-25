
### Switch的用处  
* Switch当path匹配到一个多个路由时，只会显示第一个匹配到的路由  
  ```javascript
    <Route>
      <p>i am home</p>
    </Route>
    <Route>
      <p>i am about</p>
    </Route>
    <Route>
      <p>i am user</p>
    </Route>
  ```
  渲染结果为:  
  i am home  
  i am about  
  i am user  

  ```javascript
  <Switch>
    <Route>
      <p>i am home</p>
    </Route>
    <Route>
      <p>i am about</p>
    </Route>
    <Route>
      <p>i am user</p>
    </Route>
  </Switch>
  ```
  渲染结果为:  
  i am home  

* Switch一定要包裹在多个`<Route>`组的外层  
错误的使用方法如下：
```javascript
<Switch>
    <div>
      <Route>
        <p>i am home</p>
      </Route>
      <Route>
        <p>i am about</p>
      </Route>
      <Route>
        <p>i am user</p>
      </Route>
    </div>
</Switch>
```

### 多路由嵌套
* 常用的APP框架路由嵌套实现
  * exact:代表必须path完全符合才匹配  
  * `<AppLayout>`:内容为`<div>{props.children}</div>`用来编写基本框架样式
  ```javascript
  <HashRouter>
      <Route>
        <AppLayout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/my' component={My} />
          </Switch>
        </AppLayout>
      </Route>
  </HashRouter>
  ```

### 给路由增加转场动画  
使用 `react-transition-group` 来实现  
拿上面多路由器嵌套的案例来举例,我们将其修改为  

```javascript
  const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back',
  };

  <HashRouter>
      <Route render={({ location, history }) => {
        return (
          <AppLayout>
            <TransitionGroup
              childFactory={(child) => React.cloneElement(child, { classNames: ANIMATION_MAP[history.action] })} // 控制路由时前进还是后退，以便实现不同的转场效果
            >
            <CSSTransition 
              key={location.pathname}  // 这里根据路由路径设定key，以便组件能识别出页面的唯一性
              timeout={500} // timeout为动画超时时间，指的是页面退出场景后多少时间后会将整个DOM销毁,如果这里设置的时间够长,那么页面就有类似缓存的效果,不会被清除
              //一般而言这里的时间应该和动画的时间相近
            >
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/my' component={My} />
              </Switch>
            </CSSTransition>
          </AppLayout>
        )
      }} />
  </HashRouter>
```

上面的动画css代码如下
```css
  /* 入场动画 */
  .forward-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .forward-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 500ms;
  }
  .forward-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .forward-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: all 500ms;
  }
  
  /* 路由后退时的入场/离场动画 */
  .back-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  
  .back-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 500ms;
  }
  
  .back-exit {
    opacity: 1;
    transform: translateX(0);
  }
  
  .back-exit-active {
    opacity: 0;
    transform: translate(100%);
    transition: all 500ms;
  }

  /* 这里由于我们希望2个页面切换的时候同时并行进行左右移动，所以需要将2个页面的布局定位进行并列处理，根据你的情况调整就行 */
  .forward-enter,
  .forward-enter-active,
  .forward-exit,
  .forward-exit-active,
  .back-enter,
  .back-enter-active,
  .back-exit,
  .back-exit-active
  {
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
  }
```