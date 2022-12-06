
(function(){
  function resize(dom){
    if(!dom)return;
    if(['drag','domSize'].includes(dom.className))return;
    
    if(dom.children&&dom.children.length>0){
      for(let item of dom.children){
        resize(item);
      }
    }
    if(['background'].includes(dom.className))return;
    let rect = dom.getBoundingClientRect();
    let domSize;
    if(dom.children&&dom.children.length>0){
      for(let item of dom.children){
        if(item.className=='domSize'){
          domSize = item;
          break;
        }
      }
    }
    if(!domSize){
      domSize = document.createElement('span');
      domSize.className = 'domSize';
      dom.appendChild(domSize);
    }
    domSize.innerText = `${(+rect.width).toFixed(0)}x${(+rect.height).toFixed(0)}`;
  }
  window.addEventListener('load',function(){
    var body= document.querySelector('#body');
    resize(body);

    // var mutationObserver = new MutationObserver(function (mutationRecoards, observer) {
    //   resize(body);
    //   console.log('属性变更刷新')
    // });
    // mutationObserver.observe(body, {
    //   attributes: false,
    //   characterData: false,
    //   childList: true,
    //   subtree: false,
    //   attributeOldValue: false,
    //   characterDataOldValue: false
    // });
   

    const resizeObserver = new ResizeObserver(entries => {
      resize(body);
    })
    resizeObserver.observe(body);

    window.domsize = ()=>{resize(body);}
  })
})()