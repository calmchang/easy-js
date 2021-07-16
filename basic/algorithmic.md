
##### 二进制右移操作符 >>和>>>
* `>>` 带符号右移，会保持原来正负数符号
  ~~~javascript
  2>>1 = 1;
  -2>>1 = -1;
  ~~~
  > 2>>1 代表2的二进制右移一位，00000010>>1 变成 00000001 所以是1，右移一位相当于除2  
* `>>>` 无符号右移，将正负符号当做普通的位运算
  ~~~javascript
  `2>>>1=1`
  `-1>>>1=2147483647`
  ~~~ 

##### 深度遍历
拿DOM作为遍历对象，实现2种遍历方法案例

~~~javascript
/**
原理：节点的子节点先遍历，再遍历同级节点
node:一个节点
fn:每个节点需要执行的操作
**/
async deep(node,fn){
  await fn(node);
  if(node.children){
    for(let i=0;i<node.children.length;i++){
      await this.deep(node.children[i],fn);
    }
  }
}
~~~

##### 广度遍历

~~~javascript
/**
原理：节点的同级节点先遍历，再遍历子节点
node:一个节点
fn:每个节点需要执行的操作
**/
async wide(node,fn){
  let queue = [];
  queue.push(node);
  while (queue.length != 0) {
    let item = queue.shift();
    await fn(item);
    for (let j = 0; j < item.children.length; j++) {
      queue.push(item.children[j])
    }
  }
}
~~~

![](http://img.vuedata.cn/algoDeepAndWidth.gif)

##### 防抖
* 原理：函数在调用倒计时n时间内没有重复调用，则执行函数，不然重新倒计时
* 应用场景：常用在鼠标滚动等一些超高频操作下需要执行函数刷新时
~~~javascript
function run(fn,ms){
  let tm=null;
  return function(){
    if(tm){console.log('触发防抖');clearTimeout(tm);}
    tm=setTimeout(()=>{
      fn.apply(this, arguments);
    },ms)
  }
}
var fn = run(e=>console.log('触发任务'),2000);
fn();
fn();
fn();
~~~

##### 节流
* 原理：当函数未执行完前重复调用将无效
* 应用场景：常用在定时刷新

~~~javascript
function run(fn,ms){
  let canrun=true;
  return function(){
    if(!canrun)return;
    canrun=false;
    tm=setTimeout(()=>{
      fn.apply(this, arguments);
      canrun=true;
    },ms)
  }
}
var fn = run(e=>console.log('触发任务'),2000);
fn();
fn();
fn();
~~~

##### 优化版冒泡排序
~~~javascript
/**
 特点:优化后遍历次数可以较小，基本满足前端常见排序要求了
 **/
function bubbleSort(arr) {
  let len = arr.length;
  let k = len - 1;
  let isSwap = false;//是否交换标记
  let pos = 0;//最后一次交换位置
  let temp = null;
  for (let i = 0; i < len; i++) {
    isSwap = false;
    pos = 0;
    for (let j = 0; j < k; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        pos = j;
        isSwap = true;
      }
    }
    if (!isSwap) { return arr; }
    k = pos;
  }
  return arr;
}
~~~


##### 选择排序
~~~javascript
/**
特点：最大数据交换次数是固定的数组长度相等，遍历次数永远固定
 **/
function selectionSort(arr) {
  let len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {   //寻找最小的数
        minIndex = j;         //将最小数的索引保存
      }
    }
    if(i!=minIndex){
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}
~~~

##### 快速排序 
复杂度：Ο(nlogn) ~  Ο(n2) 
~~~javascript
function quickSort(arr){  
  if (arr.length <= 1) {  
    return arr;  
  }  

  //取出数组中间的一位作为比较对象 如 [5,0,6,3,8] 则取出6，数组变为[5,0,3,8]
  var povitIndex = arr.length>>>1;  
  var povit = arr.splice(povitIndex, 1)[0];  

  //接下来就是遍历[5,0,3,8]将比6小的数放入到leftArr,相反放入rightArr
  var leftArr = [], rightArr = [];  
  for (var i = arr.length - 1; i >= 0; i--) {  
    if (arr[i] < povit) {  
        leftArr.push(arr[i]);  
    } else {  
        rightArr.push(arr[i]);  
    }  
  }  
  //遍历下来后生成了 leftArr[5,0,3],rightArr[8]

  //接下来递归调用，继续将leftArr和rightArr这2个数组重复以上的操作
  //最终将leftArr+povit+rightArr 合并为一个数组即得最终排序后结果
  return quickSort(leftArr).concat([povit], quickSort(rightArr));  
}  

~~~

##### 二分查找 - 适用于对排序后的数组,时间复杂度O(logn)

应用场景:
* 给出一个排序好的数组，让你找出里面某个值的对象所在位置
  > 你也可以将数组初始化成Map，利用查表法来找数据，这样第一次时间复杂度为O(n)，以后每次都是O(1)

~~~javascript
/**
* arr:[1,2,3,4]排序后的数组
* target:目标寻找的值
* type:left|right|''  查询方式，left:查询最左值，right:查询最右值
*/
function bsearch(arr, target, type){
    let begin = 0;
    let end = arr.length;
    let idx =-1;
    
    while(begin < end ) {
        let mid = (begin + end) >> 1;//右移一位相当于除2
        if(arr[mid] == target) {
            if(type === 'right'){
                begin =  mid+1;
            }
            else if(type === 'left'){
                end =  mid;
            }else{
                return mid;
            }
            
        }
        else if(arr[mid] > target) {
            end = mid;
        }
        else if(arr[mid] < target) {
            begin = mid + 1; 
        }
    }
    
    if(type === 'right'){
        idx = arr[begin-1]===target?begin-1:-1;
    }
    else if(type === 'left'){
        idx =  arr[begin]===target?begin:-1;
    }
    console.log(`${idx}位`)
    return idx;
    
}
bsearch([1,4,5,7,11],5); //2
bsearch([1,3,3,3,5],3,'left')；//1
bsearch([1,3,3,3,5],3,'right'); //3

~~~



##### 动态规划

动态规划的思想  
它的思想就是把一个大的问题进行拆分，细分成一个个小的子问题，且能够从这些小的子问题的解当中推导出原问题的解。同时还需要满足以下两个重要性质才能进行动态规划:
  * 最优子结构性:   
    既所拆分的子问题的解是最优解。  
  * 子问题重叠性质:   
    既在求解的过程当中，每次产生的子问题并不总是新问题，有些子问题会被重复计算多次。  
    动态规划算法正是利用了这种`子问题的重叠性质`，对`每一个子问题只计算一次`，然后将其计算结果保存在一个表格中，当再次需要计算已经计算过的子问题时，只是在表格中简单地查看一下结果，从而获得较高的解题效率

##### 动态规划 - 爬楼梯问题 (菲波那切数列也是这个原理)
复杂度：O(n)  
题目：在爬楼梯时，每次你可以爬1格或者2格，问爬到n层可能出现多少种爬楼梯的组合
分析：
  每爬一次只可能是1格或2格，所以爬到第四层的数据如下:
  第一层可能性有：1种[1]   
  第二层可能性有：2种[1、2]  
  第三层可能性有：3种[1,1,1],[1,2],[2,1]  
  第四层可能性有：5种[1,1,1,1],[2,2],[1,2,1],[2,1,1],[1,1,2]  
  发现每层的可能性都是上2层可能性之合，这里符合动态规划里每个子问题的解是固定的，并且每次子问题会被重复计算，那么我们就可以将每层的可能性存在表内，当下一次计算的时候，直接从表内读取数据计算，避免在计算第N层的时候重复从第1层计算一遍

~~~javascript
function fn(n) {
    if (n === 1 || n === 2) {
        return n;
    }
    var ways = [];
    ways[0] = 1;
    ways[1] = 2;
    //当前层的可能性是前2层的可能性相加
    for(var i=2; i<n; i++){
        ways[i]=ways[i-1] + ways[i-2];
    }
    return ways[n-1];
}
console.log(fn(3));//3
~~~


##### 动态规划 - 二维地图上，起点到终点所有路径问题
复杂度：O(W x H)    
题目：  假设有w*h的坐标系，问从(sx,sy)到达(dx,dy)的所有可能路径，这里简单化只考虑移动方向只能是向下或者向右的可能

分析：    
  由于要到达一个坐标点(x,y)必须是经过它的上下左右4个方向上的其中一个，符合动态规划子问题的特性，我们只需要把每个坐标点自己相对自己相邻的坐标点的路径数量计算出来，那么最终(dx,dy)的到达路径总数就是它相邻的所有坐标点的他们的路径总数之和

  比如在2*2的地图上，问从(0,0)到达(1,1)的所有可能性
  * 1、初始化(0，0)坐标点 `[0][0]=1` 因为到达(0，0)的可能性只有1种就是它自己，我们需要从(0,0)->(1,1)从左到右，从上到下逐个遍历所有格子,保证被遍历的格子之前所有可以到达它的格子已经被遍历过
  * 2、从(0,0)坐标开始向它的右边和下方查找相邻坐标点，发现有(0,1),(1,0),开始逐个遍历
  * 3、遍历(0,1)坐标点初始化`[0][1]=1`,查找(0,1)相邻周边的已经被遍历过的坐标点有哪些，发现只有(0,0)，所以将到达(0,0)的可能路径总数加上 `[0][1]+=[0][0]`,[0][1]目前变成了2`
  * 4、以此类推

~~~javascript
function findRoad(sx, sy, dx, dy) {
    //按照地图尺寸生成一个二维数组
    let root = new Array(dx-sx+1).fill(null);  
    root.forEach((item,idx)=>{
      root[idx]=Array(dy-sy+1);
    });

    root[0][0] = { 
      total: 1, //到达当前坐标点有多少种可能性
      from: [] //所有到达当前坐标点的前一个坐标
    };
    //从左到右，从上到下遍历，保证当前坐标点的所有前序节点都已经被遍历过
    for (let x = sx; x <= dx; x++) {
      for (let y = sy; y <= dy; y++) {
        if (x == sx && y == sy) continue;
        let log = [];
        let total = 0;
        //遍历当前格子的上方或者左方的格子
        if (y - 1 >= sy) {
          let temp = { x, y: y - 1 };
          log.push(temp);
          total += root[x][y - 1].total;
        }
        if (x - 1 >= sx) {
          let temp = { x: x - 1, y };
          log.push(temp);
          total += root[x - 1][y].total;
        }

        root[x][y] = {
          from: log,
          total: total
        };
      }
  }
   console.log(`到达${dx},${dy}可能性有:${root[dx][dy].total}种`);
  return root;
}

function drawMap(roadMap) {
    let w = roadMap.length;
    let h = roadMap[0].length;
    let x = w - 1;
    let y = h - 1;

    let drawRoad = function(arr, w, h) {
        let points = new Array(h).fill(null);  
        points.forEach((item,idx)=>{
          points[idx]=Array(w).fill(0);
        });
        
        arr.forEach(({ x, y }) => {
          points[y][x] = 1;
        });
        var t = points.map((yy) => {
          return yy.join("");
        });
        t = t.join("\n");
        console.log(t);
    };
    let deep=function (root, cx, cy, line) {
        let node = root[cx][cy];
        if (node.from && node.from.length > 0) {
          for (let i = 0; i < node.from.length; i++) {
            let { x, y } = node.from[i];
            let newLine = [...line];
            newLine.push({ x, y });
            deep(root, x, y, newLine);
          }
        } else {
          drawRoad(line, root.length, root[0].length);
        }
      }

    deep(roadMap, x, y, [{ x, y }]);
}

drawMap(findRoad(0,0,2,2))//到达2,2可能性有:6种
/**
 * 
111
001
001

110
011
001

100
111
001

110
010
011

100
110
011

100
100
111
*/
drawMap(findRoad(0,0,2,1))//到达2,1可能性有:3种
/*
111
001

110
011

100
111
*/
~~~




##### 贪心算法 - 计算最小找零数
问题：给出几种硬币面额，给出需要找零的总额，计算最少数量硬币找零的组合
譬如：有4元、3元、2元、1元，问找零13元的使用硬币最少的组合式啥？答案应该是 4+4+4+1 一共4个硬币

第一种算法，这种算法比较快但是有时候不准确，比如这里传入[5,4,1]计算找零13的时候就会出现返回[5,5,1,1,1]而不是[4,4,5]
~~~javascript
//arr:所有硬币的面额
//total:需要找零的总额
function fn(arr,total){
  let ret=0;
  for(let i=0;i<arr.length;i++){
    if(arr[i]<=total){
      ret = Math.max(arr[i],ret);
    }
  }
  return ret;
}
function test(arr,total){
  let out=[];
  while(total>0){
    let ret = fn(arr,total);
    if(ret>0){
      total-=ret;
      out.push(ret);
    }else{
      console.log('异常')
      break;
    }
  }
  console.log(out);
}
test([4,3,2],13);//[4,4,2,3]
test([5,3,1],13);//[5,5,3]
test([5,4,1],13);//[5，5，1，1，1]

~~~

##### 改进一下后
复杂度：O(Coins x Amount)    
分析：  
  利用动态规划的子问题最优解方法，我们需要将 1~总额 的每一位的最少找零数计算出来
~~~javascript

function coinChange (coins,amount){
    let coinInfo = new Array(amount+1).fill(null);
    coinInfo.forEach((item,idx)=>coinInfo[idx]={total:999})
    
    //total:当前找零的值需要的最少硬币数量
    //keyCoin:找零路径的起始位置
    coinInfo[0].total = 0;

    for(let coin = 1; coin <= amount; coin++){
        for(let j = 0; j < coins.length; j++){
            let curCoin= coins[j];
            let remain = coin - curCoin;
            if(remain>=0){
              if(coinInfo[remain].total+1  < coinInfo[coin].total ){
                  coinInfo[coin].total = coinInfo[remain].total+1;
                  coinInfo[coin].keyCoin = curCoin;
              }
            }
        }
    }
    //复原最优的找零路径
    let sum = coinInfo[amount].keyCoin;
    let res = [sum];
    amount = amount - sum;
    while(amount > 0){
        sum = coinInfo[amount].keyCoin;
        res.push(sum);
        amount = amount - sum;
    }
    console.log(coinInfo,res);
}
coinChange([5,4,1],8);

~~~
