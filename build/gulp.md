
##### 获取入参

```bash
gulp --env test
```

```javascript
const minimist = require('minimist');
var options = minimist(process.argv.slice(2));

// test
// options:{
//   env:test
// }
console.log(options.env)
```

##### 条件执行

```javascript
const gulpIf = require('gulp-if');
const terser = require('terser');
const ENV_PROD=true;
function uglify(cb){
  return gulp.src('*.js')
    // 如果是生产环境，执行压缩
    .pipe(gulpIf(ENV_PROD,terser()))
    .pipe(gulp.dest(''))
}

```

##### 模板替换

```javascript
const fileinclude = require('gulp-file-include');

function uglify(cb){
  return gulp.src('*.js')
    // 如果是生产环境，执行压缩
    .pipe(fileinclude({prefix:'@@',basepath:'@file'}))
    .pipe(gulp.dest(''))
}
```

```javascript
// index.js

@@include('./math.js')
function main(){

}

// math.js
function add(a,b){return a+b;}


// 打包后
// index.js
function add(a,b){return a+b;}
function main(){

}

```



##### 其它常用插件
gulp-replace:字符串替换
gulp-file-include:文件模板替换

