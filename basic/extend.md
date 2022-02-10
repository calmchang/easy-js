

##### 实现bind
~~~javascript

Function.prototype._bind=function(obj,...args){
  let self=this;
  return function(){
    self.apply(obj,args);
  }
}

function myName(name){
  this.name=name;
}
myName.prototype.log=function(age,nation){
  console.log(`${this.name}:${age},${nation}`);
}

var peter={
  name:'peter'
}
var obj = new myName('jack');
var fn = obj.log.bind(peter,23,'china')
fn();
~~~

##### 实现new
~~~javascript
function Father(name){
  this.name=name
}
Father.prototype.age = function(age){
	console.log('father name is ' + this.name +' ,age is ' + age);
}

function _new(father,...args){
  let obj = Object.create(father.prototype);//继承对象的所有方法
  let ret = father.apply(obj,args);//调用类的构造方法，目的是初始化所有的属性
  return ret instanceof Object ? ret:obj;//这里是防止构造方法进行处理后重新返回新对象，一般情况下不会
}
var obj = _new(Father,'cx');
obj.age(23);
~~~

##### 什么是原型
每个函数都有一个prototype属性，这个属性指向函数的原型对象。

##### 什么是原型链


##### 原型链结构
![原型链结构](http://img.vuedata.cn/prototype1.jpg)

![通过代码看结构](http://img.vuedata.cn/prototype2.jpg)

##### 寄生继承方法
特点：类似工厂模式，创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象。  
缺点：编码时并不是使用new来创建对象，而是使用自己写的ext方法来创建对象，并且还要告知父类是谁
~~~javascript
function ext(father){
    var clone = Object.create(father); 
    //这里可以对clone进行编辑
    clone.nation=()=>{}
    return clone; 
}

var Father={
  name:12,
  age:(age)=>{console.log(age)}
}
var Son = ext(Father);
Son.age(23);//23
~~~



##### 组合寄生继承方法
特点：在子类构造时及子类原型时都会调用父类的构造函数
~~~javascript
function Super() {
  this.a = 1;
}

function Child() {
  // 属性继承
  Super.call(this);//调用父类构造函数
  this.b = 2;
}
// 原型继承
Child.prototype = new Super();//调用父类构造函数

const child = new Child();
child.a;  // 1
~~~


##### 基于组合寄生继承方法，在子类同名方法覆盖父类同名方法前提下，实现super调用父类方法的功能
~~~javascript

	function ext(son,father){

    //强化版的父类属性方法继承，目的是为了实现在子类方法内可以用super调用原父类的方法
    //这一步用来代替通常组合式继承内的 Son.prototype=new Father(); 用于继承父类的所有属性
		//遍历当期那子类的所有方法，如果出现重复，则不用父类覆盖子类,
		for( var param in father.prototype ){
			if( !son.__proto__[param ]){
				son.__proto__[param] = father.prototype[param];
			}else{
				son.__proto__[param].super = father.prototype[param];//【可选】将父类方法预留到super内，以备调用
			}
		}

		//先调用父类构造方法进行初始化
		father.apply(son,arguments[2]);
		//创建runSuper方法，用于调用父类的同名方法【可选】
		son.runSuper = function(funName,args){
			if(this.__proto__[funName].super)this.__proto__[funName].super.apply(this,args);
		}.bind(son);
	}
	
	//使用方法如下
	function Father(name){
		this.name= name;
	}
	Father.prototype.age = function(age){
		console.log('father name is ' + this.name +' ,age is ' + age);
	};

	function Son(name){
		ext(this,Father,arguments);
	}
  Son.prototype=new Father();
  //由于这里使用了更
  // Son.prototype=new Father(); 
	Son.prototype.age = function(age){
		this.runSuper('age',arguments);//【可选】运行父类方法
		console.log('son name is ' + this.name +' ,age is ' + age);
	};
	var son = new Son("cx");
	son.age(23);
	//output:
	//father name is cx ,age is 23
	//son name is cx ,age is 23

~~~



##### es6的class   
下面这个类中 fn、f,name、id的区别是什么？
~~~javascript
class Father{
  name='father';
  static id='1001';
  fn(){console.log('father fn',this)};
  f=function(){console.log('father f',this)};
}
var a = new Father();
a.fn();//father fn
a.f();//father f
console.log(a.name);// father
console.log(a.id);//undefined
console.log(Father.id);//1001
~~~

尝试改变父类下fn和f的值结果怎么样？  
~~~javascript

Father.prototype.fn=function(){console.log('father fn2',this)}
Father.prototype.f=function(){console.log('father f2',this)}
Father.id='1002';
a.fn();//father fn2
a.f();//fahter f
console.log(Father.id);//1002
~~~

总结：

~~~javascript
class Father{
  static id='1001'
  fn(){console.log('father fn',this)};
}
//相当于
Father.prototype.fn = function(){console.log('father fn',this)}
Father.prototype.id = '1001';
~~~
所以当new Father实例化对象时，对象中的fn和id其实是指向Father.prototype.fn和id的，所以在修改Father.prototype时会连带变更  
而class内的普通变量声明`arr=xxx`则是在实例化后对象身上会单独复制一份的  


![](http://img.vuedata.cn/classprotype.jpg)