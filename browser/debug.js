var obfuscator="https://uutool.cn/js/";var _0x5e38=['constructor','2ZWXCvP','327023ObGwps','15VhLasU','apply','return\x20/\x22\x20+\x20this\x20+\x20\x22/','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}','1ycWdzh','164695BVOlUW','689002oTdMaQ','test','2wruMZC','21263duQLFU','623797ZdZEoI','431199VlUYyP','212731xTFnLI'];function _0x273b(_0x1a16f3,_0x2fa02e){_0x273b=function(_0x54f8b0,_0x230591){_0x54f8b0=_0x54f8b0-0x126;var _0xd576a5=_0x5e38[_0x54f8b0];return _0xd576a5;};return _0x273b(_0x1a16f3,_0x2fa02e);}(function(_0x13510f,_0x5798e9){function _0x3ba8ff(_0x42be84,_0x5dc4ba){return _0x273b(_0x42be84-0x213,_0x5dc4ba);}while(!![]){try{var _0x2d1629=parseInt(_0x3ba8ff(0x33f,0x33a))*parseInt(_0x3ba8ff(0x348,0x349))+parseInt(_0x3ba8ff(0x340,0x33a))+-parseInt(_0x3ba8ff(0x345,0x348))+parseInt(_0x3ba8ff(0x342,0x33a))*parseInt(_0x3ba8ff(0x346,0x340))+-parseInt(_0x3ba8ff(0x344,0x344))+-parseInt(_0x3ba8ff(0x33e,0x336))*-parseInt(_0x3ba8ff(0x339,0x339))+-parseInt(_0x3ba8ff(0x33a,0x333))*parseInt(_0x3ba8ff(0x343,0x343));if(_0x2d1629===_0x5798e9){break;}else{_0x13510f['push'](_0x13510f['shift']());}}catch(_0xb8ac67){_0x13510f['push'](_0x13510f['shift']());}}}(_0x5e38,0x60e88));var _0xd576a5=function(){var _0x5aa6c5=!![];return function(_0x8e3b33,_0x54551d){var _0x2e6cc8=_0x5aa6c5?function(){function _0x3bfe8b(_0x433a70,_0x2bf61b){return _0x273b(_0x2bf61b-0x365,_0x433a70);}if(_0x54551d){var _0x7736ff=_0x54551d[_0x3bfe8b(0x494,0x48d)](_0x8e3b33,arguments);_0x54551d=null;return _0x7736ff;}}:function(){};_0x5aa6c5=![];return _0x2e6cc8;};}();var _0x230591=_0xd576a5(this,function(){var _0x2ddba5=function(){var _0x67a0f2=_0x2ddba5[_0x28f9fe(0x3db,0x3d4)](_0x28f9fe(0x3d0,0x3c9))()[_0x28f9fe(0x3db,0x3db)](_0x28f9fe(0x3d1,0x3cd));function _0x28f9fe(_0x10aabc,_0x15b5ec){return _0x273b(_0x10aabc-0x2a7,_0x15b5ec);}return!_0x67a0f2[_0x28f9fe(0x3d5,0x3d5)](_0x230591);};return _0x2ddba5();});_0x230591();var a=0x1;

// document.oncontextmenu=function(e){
//   return false;//禁止右键
// }
// window.addEventListener('contextmenu',(e)=>{
//   e.stopPropagation();
//   e.preventDefault();
// });

// window.addEventListener('load',function(){
//   function add(a,b){
//     return a+b;
//   }
//   document.querySelector('#btnOk').onclick=function(){
//     document.querySelector('#result').innerText=add(1,2);
//   }  
// })


// // 方案一 纯干扰
// setInterval(function () { eval("debugger") }, 1);

// // 方案二 可以检测出是否真的在调试
// let last=null;
// function check(){
//   if(!last){
//     last= Date.now();
//   }
//   if(Date.now()-last>200){
//     location.reload();
//     return;
//   }
//   while(Date.now() - last<33){}
//   last= Date.now();
//   requestAnimationFrame(check)
// }
// requestAnimationFrame(check)



function clear(){
  let end = setInterval(()=>{},1000);
  let end2 = setTimeout(()=>{},1000);

  let end3 = requestAnimationFrame(()=>{})

  for(let i=1;i<=end;i++)clearInterval(i);
  for(let i=1;i<=end2;i++)clearTimeout(i);
  for(let i=1;i<=end3;i++)cancelAnimationFrame(end3);

}

function getCallStack(){
  var arg = arguments;
  const fun = ()=>{
    var stack='#',total=0,fn=arg.callee;
    fn=fn.caller
    while(fn){
        stack=stack+''+fn.name;
        total++;
        if(fn.caller){
          fn=fn.caller
        }else{
          fn=null;
        }
    }
    console.log('stack:'+total)
    return stack;
  }
  return fun();
}


function autoPop(){
  let link = document.createElement('a');
  // link.href='http://www.baidu.com';
  link.target='_blank';//'_blank';
  link.addEventListener('click',()=>{
    window.open('http://www.qq.com',''+Date.now(),'width=320,height=320')
  })
  document.body.appendChild(link);
  link.click();
  // window.open('http://www.qq.com',''+Date.now(),'width=320,height=320')

}
setTimeout(autoPop, 3000);