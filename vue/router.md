
#### @页面按需加载

通过webpackChunkName来给页面分组按需加载  
```javascript
let pageA = () =>
  import( /* webpackChunkName: "group-a" */ '@/pages/pageA');
let pageB = () =>
  import( /* webpackChunkName: "group-a" */ '@/pages/pageB');

```


#### @页面缓存策略，控制页面缓存及缓存的释放


* 1、使用keep-alive组件来时页面保留缓存，通过include绑定缓存页面名称的列表来告知哪些页面需要缓存  
> cachedViews=['pagename','pagename2']，存放了需要缓存的页面名称

```html
  <keep-alive :include="cachedViews">
    <router-view/>
  </keep-alive>
```

* 2、给页面添加一个meta属性，标记出哪些页面默认需要缓存，以便我们统一处理
```javascript
var router = new Router({
    routes: [
    {
      path: '/pageA',
      name: 'pageA',
      component: pageA,
      meta: { keepAlive: true }
    },
    {
      path: '/pageB',
      name: 'pageB',
      component: pageB,
    },
  ]
})
```

* 3、然后拦截路由加载前的钩子，检查路由是否需要被缓存，通过控制cachedViews列表来达到缓存  
```javascript
router.beforeEach((to, from, next) => {
  console.log(`before each ${from.name}->${to.name}`);
  if (to.meta && to.meta.keepAlive) {
    //这里目的是让store更新 cachedViews 数组内的缓存页面列表
    Vue.prototype.$store.commit("addCache", to.name);
  }

  if (to.query && to.query.removeCache) {
    Vue.prototype.$store.commit("removeCache", from.name);
  }
  next();
});
```

