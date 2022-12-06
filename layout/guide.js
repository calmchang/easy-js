
(function(){
  window.addEventListener('load',function(){
    let search = location.search.split('?');
    let searchReq={};
    search = search[1]||'';
    search = search.split('&');
    search = search||[];
    search.forEach(param=>{
      let item = param.split('=');
      searchReq[item[0]] = decodeURIComponent(item[1]);
    })
    if(searchReq.mode == 'quote'){
      let titles = document.querySelectorAll('h1');
      for(let title of titles){
        title.style.display='none';
      }
      return;
    }
    var match = location.href.match(/(\d+)[.]html/);
    var curIndex = +match[1];

    var dom = document.createElement('section');
    dom.className='guide';
    var html = '';
    if(curIndex>1){
      html+= `<button id='prev' class="prev">上一个</button>`
    }else{
      html+= `<button id='prev' class="prev disabled">上一个</button>`
    }
    if(curIndex<8){
      html+= `<button id='next' class="next">下一个</button>`
    }else{
      html+= `<button id='next' class="next disabled">下一个</button>`
    }
    dom.innerHTML = html;

    document.body.appendChild(dom);
    document.querySelector('#prev').addEventListener('click',()=>{
      let index =curIndex-1;
      if(index<=0)return;
      var url = location.href.replace(/(\d+)[.]html/,`${index}.html`);
      console.log(url);
      location.href=url;
    })  

    document.querySelector('#next').addEventListener('click',()=>{
      let index =curIndex+1;
      if(index>8)return;
      var url = location.href.replace(/(\d+)[.]html/,`${index}.html`);
      console.log(url);
      location.href=url;
    })

  })
})()