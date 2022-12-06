
(function(){
  window.addEventListener('load',function(){

    var articleList= document.querySelector('article');
    if(!articleList){
      articleList = document.querySelector('#body')
    }
    var remove = document.createElement('div');
    var add = document.createElement('div');
    remove.className='box remove';
    add.className = 'box add';
    add.id = 'add';

    remove.innerText='-';
    remove.id='remove';
    add.innerText='+';

    articleList.appendChild(remove);
    articleList.appendChild(add);

    document.querySelector('#remove').addEventListener('click',()=>{
      if(articleList.children.length<=2)return;
      articleList.removeChild(articleList.children[0]);
    })  

    document.querySelector('#add').addEventListener('click',()=>{
      var box = document.createElement('div');
      box.className='box';
      box.innerText = articleList.children.length+1;
      let insertDom = articleList.children[articleList.children.length-2];
      articleList.insertBefore(box,insertDom);
    })

  })
})()