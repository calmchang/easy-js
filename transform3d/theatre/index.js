let theatre={
  dom:null,
  _perspective:800,
  _perspectiveX:50,
  _perspectiveY:50,
  lockRange:false,
  get perspective(){
    return this._perspective;
  },
  set perspective(value){
    value = value <0?0:value;
    value = value>10000?10000:value;
    this._perspective = value; 
    if(!theatre.log.perspective){
      theatre.log.perspective = document.querySelector('#log-perspective');
    }
    theatre.dom.style.perspective = theatre._perspective+'px';
    theatre.log.perspective.innerText = parseFloat(+value).toFixed(0);
  },
  get perspectiveX(){
    return this._perspectiveX;
  },
  set perspectiveX(value){
    const max=this.lockRange?100:500;
    const min=this.lockRange?0:-500;
    value = value > max?max:value;
    value = value < min?min:value;
    this._perspectiveX = value; 
    if(!theatre.log.perspectiveX){
      theatre.log.perspectiveX = document.querySelector('#log-perspective-x');
    }
    theatre.log.perspectiveX.innerText = parseFloat(+value).toFixed(0)+'%';
    theatre.dom.style.perspectiveOrigin =`${this._perspectiveX}% ${this._perspectiveY}%`;

  },
  get perspectiveY(){
    return this._perspectiveY;
  },
  set perspectiveY(value){
    const max=this.lockRange?100:500;
    const min=this.lockRange?0:-500;
    value = value > max?max:value;
    value = value < min?min:value;
    this._perspectiveY = value;

    if(!theatre.log.perspectiveY){
      theatre.log.perspectiveY = document.querySelector('#log-perspective-y');
    }
    theatre.log.perspectiveY.innerText = parseFloat(+value).toFixed(0)+'%';
    theatre.dom.style.perspectiveOrigin =`${this._perspectiveX}% ${this._perspectiveY}%`;
  },  
  log:{
    perspective:null,
    perspectiveX:null,
    perspectiveY:null
  }
};
function initTehatre(options){
  options = options||{};
  if(!theatre.dom){
    theatre.dom = document.querySelector('#theatre');
  }  
  theatre.lockRange = options.lockRange;    
  theatre.width = theatre.dom.clientWidth;
  theatre.height = theatre.dom.clientHeight;
  var hammertime = new Hammer(theatre.dom, {});
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on('pan',function(ev){
    theatre.perspectiveX  -= (ev.deltaX*6/theatre.width);
    theatre.perspectiveY  -= (ev.deltaY*3.5/theatre.height);
  })
  document.body.addEventListener('wheel',function(e){
    e.stopPropagation();
    e.preventDefault();
    theatre.perspective  +=(e.deltaY>0?20:-20);
  },{ passive: false })
  if(typeof options.vx != 'undefined'){
    theatre.perspectiveX = options.vx;
  }
  if(typeof options.vy != 'undefined'){
    theatre.perspectiveY = options.vy;
  }

}