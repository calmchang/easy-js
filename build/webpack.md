
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