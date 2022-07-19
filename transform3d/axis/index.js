

function initAxis(dom){
  if(!dom)return;
  dom.innerHTML+=`
<div class="axis">
  <div class="axis-x"></div>
  <div class="axis-y"></div>
  <div class="axis-z"></div>
</div>`;
}

function axisActive(name){
  let axis = document.querySelector('.axis');
  if(axis){
    axis.setAttribute('active',name);
  }
}