
## tree-shake

使用es6模块引用的代码，webpack在打包时经过TerserPlugin或其他压缩代码插件时会进行tree-shake把没有使用的模块代码剔除

```javascript
// math.js
const add=(a,b)=>{}
const div=(a,b)=>{}

export {
  add,div
}
export default {
  add,div
}
```


```javascript
// main.js

// 案例1：以下代码打包后div会被剔除
import {add} from 'math.js'
add(1,2);

// 案例2：以下代码打包后div由于没有实际引用，也会被剔除
import {add,div} from 'math.js'
add(1,2);

// 案例3：以下代码打包后2个方法都将被保留
import {add,div} from 'math.js'
add(1,2);
div;

// 案例4：以下代码打包后2个方法都将被保留,因为Math对象的导出包含了add和div，所以无法单独tree-shake
import Math from 'math.js'
Math.add(1,2);

```


## 如何在引用第三方库的时候也能利用tree-shake

假设有一个第三方库名字叫：`my-math`,其中内容如下

目录结构：
* my-math\
  * src
    * addMath
      * index.js
    * subMath
      * index.js
    * index.js //入口
  * package.json
  
源代码：

```javascript
// addMath/index.js
function addMath(a,b){
  return a+b;
}
export default addMath;

```

```javascript
// subMath/index.js
function subMath(a,b){
  return a-b;
}
export default subMath;

```

```javascript
// index.js

export {default as addMath} from './addMath';
export {default as subMath} from './subMath';

// 以上方式暴露方法或下面的方式，效果是一样的
// import addMath from './addMath';
// import subMath from './subMath';
// export default {
//   addMath,subMath
// }

```

接下来现在我们项目中通过npm安装了`my-math`包,并使用了其中部分模块

```javascript
// project.js

// 只使用到了add模块
import {addMath} from 'my-math';
console.log( addMath(1,2) );
```

此时打包后的结果的确只是将`addMath`部分抽离出来

现在我们修改一下`subMath`模块代码,我们模拟在这个代码模块中又引用了一个第三方模块`clipboard`

```javascript
// subMath/index.js
import ClipboardJS from 'clipboard';
function subMath(a,b){
  let t = new ClipboardJS();
  console.log(t);
  return a-b;
}
export default subMath;

```

此时打包后的项目也不存在`subMath`模块中代码，但是`clipboard`的代码却被打包进去了

我们尝试换一种方法引用模块

```javascript
// project.js

// 只使用到了addMath模块
import addMath from 'my-math/src/addMath';
console.log( addMath(1,2) );
```

此时打包后发现`subMath`和`clipboard`没有被打进去，所以我们想要达到tree-shake我们需要通过直接引用目标模块的代码来实现
实现方法有2种
1、如上面的解决方法，我们手动指明代码模块的路径，这样编码风格不太友好
2、在webpack中使用`babel-plugin-import`插件，自动将import代码进行转义,具体参数可以参考npm上的文档，我们以刚才的项目为例在babel plugins内增加import插件的配置
```javascript
// webpack.config.js
rules: [
  {
    test: /\.js[x]?$/,
    exclude: /node_modules/,
    use: {
      loader:'babel-loader',
      options:{
          plugins: [
            [
              // 重点
              "import", { 
                // 检查匹配到引用my-math库时触发
                libraryName: "my-math" ,

                // 代表转换后会引用 库名/src目录下/模块名/index.js
                // src: import addMath from 'my-math' -> import addMath from 'my-math/src/add-math/'
                // js: import addMath from 'my-math' -> import addMath from 'my-math/js/add-math/'
                // aaa: import addMath from 'my-math' -> import addMath from 'my-math/aaa/add-math/'
                libraryDirectory:"src",

                // true: import addMath from 'my-math' -> import addMath from 'my-math/src/add-math/'
                // false: import addMath from 'my-math' -> import addMath from 'my-math/src/addMath/'
                camel2DashComponentName:false,

                // 代表需要同时引用该模块的css对应的目录 
                // css: import from 'my-math/addMath/style/css/index.css'
                // true: import from 'my-math/addMath/style/index.css'
                // aaa: import from 'my-math/addMath/style/aaa/index.css'
                style: 'css',
              }
            ]
          ]
      }
    }
  }
]

```


## 图片资源的按需加载  
遇到动态引用图片的情况如： require(`@/assets/iamges/${lang}/${imageName}`)   
由于webpack在生产构建时不能确定哪些资源目录会被引用，所以不会将图片输出到构建文件夹内  
解决方法是通过在文件头部显示的调用 require.context('@/assets/images/tw/', false, /\.(png|jpg|jpeg|gif|svg)$/);  
告知webpack这个文件夹下的所有哪类文件，我是需要使用的，请帮我输出到目标文件夹下


## 常用插件
#### @DefinePlugin
在编译阶段定义常量

常见使用方法:

webpack.config.js
```javascript
    new webpack.DefinePlugin({
      VERSION_HASH: JSON.stringify(`${Date.now()}-${(new Date()).toLocaleString()}`),
      BUILD_ENV:JSON.stringify(process.env.build_env),   
      MOCK: '1':false,
    }),
```
index.js
```
  console.log(VERSION_HASH);//用来打印本代码编译时的时间戳
  //这里只有当MOCK为false时，编译才会删除内部片段，如果MOCK为0或者Undefined则不会
  if(MOCK){
    let mock = require('mock')
  }
```

#### @HtmlWebpackPlugin多页面输出

以下是一个例子，包含了2个页面入口：  
在chunks内需要指明该入口html包含哪些模块，如果不指明chunks则会将webpack打包后相关的模块全部引入到html内
这里我们每个页面都用到了公共的模块runtime和node_modules_bundle也需要写入chunks内  

```javascript
module.exports = {
  mode: 'development',
  entry: {
    'index':'./src/index.js',
    'help':'./src/help.js'
  },
  optimization: {
    runtimeChunk:{
        name: 'runtime'//所有入口有自己的runtime.js
    },
    splitChunks: {
      cacheGroups: {
        /**
         * 将剩下的node_modules下的库抽离成一个bundle
         */
        node_modules: {
          test: /(node_modules)/,
          priority: 99,
          name:"node_modules_bundle",
          chunks:'all',
          enforce:true
        },
      }
    }
  },
  ....
  plugins:[
    new HtmlWebpackPlugin({
      chunks:['index','runtime','node_modules_bundle-gundle'],
      template:path.join(__dirname,'index.html'),
      filename:'index.html',
      inject:true
    }),
    new HtmlWebpackPlugin({
      chunks:['help','runtime','node_modules_bundle'],
      template:path.join(__dirname,'index.html'),
      filename:'help.html',
      inject:true
    }),
  ]
```


#### @optimization配置  
* minimize:trye||false  是否开启压缩
* splitChunks 配置如何提取代码为独立文件的方式

  * cacheGroups 这里将配置所有我们需要提取的独立代码块 
    案例一：
      匹配 `import 'xxxx'`原始文件名称含有`antd`字符的模块，提取至`antd-bundle`文件内，如果是js则提取为 `antd-bundle.js`如果是css则`antd-bundle.css`  
    ```javascript
    antd: {
      test: /(antd)/,
      priority: 100,
      name:"antd-bundle",
      chunks:'all',
      enforce:true,
    },
    ```
    案例二：
      匹配所有`import 'xxx'` 原始文件是`.css`结尾的模块，提取值`styles-bundle`文件内，如果是js则提取为 `styles-bundle.js`如果是css则`styles-bundle.css`
      > 这里匹配的都是原始文件名，并不会匹配`.scss`转化为`.css`的文件  
    ```javascript
    styles: {
      name: 'styles-bundle',
      test: /\.css$/,
      chunks: 'all',
      enforce: true,
    },
    ```
    * priority:优先级，当我们如上配置了多个模块，又正巧有文件同时匹配规则时，则按优先级高的匹配执行
    * chunks:'all'||'async'||'initial' : 匹配以哪种方式加载的模块，all代表所有，async代表是异步加载的模块,initial直接引用的模块  
      举个例子： 
      ```javascript
        //这个css为异步加载的模块
        import ('./btn.css').then(res=>{});
        //这个css为直接加载的模块
        import './input.css';
      ```

      如果我们配置如下：  
      ```javascript
        styles: {
          name: 'styles-bundle',
          test: /\.css$/,
          chunks: 'async',
          enforce: true,
        }
      ```

      * chunks配置为'async'时:`btn.css`符合规则，将被提取至`styles-bundle.css`，并且在`HtmlWebpackPlugin`注入时，不会将这个模块注入至html内  
      * chunks配置为'initial'时:`input.css`符合规则，将被提取至`styles-bundle.css`，在`HtmlWebpackPlugin`注入时，会注入`styles-bundle.css`这个模块
      * chunks配置为'all'时:`input.css`符合规则，将被提取至`styles-bundle.css`，在`HtmlWebpackPlugin`注入时，会注入`styles-bundle.css`这个模块
    * enforce:强制打包这个模块，忽略minChunk,size等一系列条件



#### @配置babel的几种方式
方式一: 
需要安装的库：  
* babel-loader
* @babel/core
* @babel/preset-env
* @babel/polyfill

`@babel/preset-env` + 页面引入 `@babel/polyfill`  
webpack内balbel-loader配置preset-env并且将`useBuiltIns设置为usage`  
在页面文件头部引入 `import "@babel/polyfill"`  
```javascript
//webpack.config.js
test: /\.js$/,
exclude: /node_modules/,
use: {
  loader:'babel-loader',
  options:{
      presets: [ 
          [
            "@babel/preset-env",{
                useBuiltIns:'usage',
                targets: {
                    chrome: "40",
                },
              }
            ],
          
      ],
  }
},

//index.js
import "@babel/polyfill"
async test(){
  return new Promise(res=>res())
}

```



方式二：  
需要安装的库：  
* babel-loader
* @babel/core
* @babel/preset-env
* @babel/runtime-corejs3
* @babel/plugin-transform-runtime

使用 `@babel/plugin-transform-runtime` 插件代替页面头部引入@babel/polyfill,此时也不需要配置useBuiltIns   
babel/plugin-transform-runtime解决了@babel/polyfill的变量污染问题，因为polyfill会将api直接注入到全局对象上

```javascript
{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
          options:{
              presets: [ 
                  [
                    "@babel/preset-env",{
                        targets: {
                            chrome: "40",
                        },
                      }
                  ],
                  
              ],
              plugins: [
                  ["@babel/plugin-transform-runtime"],
              ] 
          }
        },
      },
```



#### webpack3中公共模块的提取
在webpack4中我们使用`splitChunks`来提取公共模块，而在webpack3中我们使用`new webpack.optimize.CommonsChunkPlugin`来提取  
编写方法上我们需要在entry内将需要提取的模块单独编写出来
```javascript
//webpack.config.js
module.exports ={
  entry:{
    index:'..../index.js',
    myBundle:['react','react-dom'],//这里我们将公共模块放入myBundle包中
  },
  //...
  plugins:[
    // 这里通过 CommonsChunkPlugin 插件将myBundle模块单独提取成[name].js文件
    // 这样如果你使用HtmlWebpackPlugin插件时则会自动注入进html内引用
    new webpack.optimize.CommonsChunkPlugin({
      name: ['myBundle'],
      filename: '[name].js'
    })
  ]
}
```
#### 思考: webpack3的 CommonsChunkPlugin、webpack4中splitChunks同webpack.DllPlugin提取的模块有什么区别？

1、webpack.DllPlugin插件提取的文件可以作为静态资源引用，并且可以实现需要编译时手动编译一次  
2、CommonsChunkPlugin、splitChunks配置的公共模块在调试过程中随你的代码变动而动态重新编译提取所以性能上不如webpack.DllPlugin  

所以根据场景不同选择不同方案即可  

#### 问题：为什么webpack.DllPlugin提取出来的react模块包含了 react.development.js和react.production.js ?
那是因为在引用react模块时，react的index.js内会根据`process.env.NODE_ENV`环境变量引用不同版本的js,而我们打包时由于`process.env.NODE_ENV`不确定导致将2个环境下的js都引用进去了  
解决方法是在webpack内通过DefinePlugin在代码中注入NODE_ENV环境变量，以便require时能正确判断环境引用对应版本  
```
 new webpack.DefinePlugin({
  'process.env.NODE_ENV': devMode?'"dev"':'"production"'
}),
```