
(function(){

  function drag(){
    this.controlDom=null;
    this.width=0;
    this.height=0;
    this.location_down={x:0,y:0};
    this.state = 'up';
  };

  drag.prototype.init=function(controlDom,domDrag){
    this.controlDom=controlDom;

    this.width = this.controlDom.cilentWidth;
    this.height = this.controlDom.clientHeight;

    if(!domDrag){
      domDrag = document.createElement('div');
      domDrag.id='drag';
      domDrag.className='drag';
      domDrag.innerText = 'drag';
      controlDom.appendChild(domDrag);
    }

    let self=this;
    document.body.addEventListener('mousedown',(e)=>{
      if(e.target&&e.target.id=='drag'){
        self.width = self.controlDom.clientWidth;
        self.height = self.controlDom.clientHeight;
        self.state='down';
        self.location_down.x = e.x;
        self.location_down.y = e.y;
      }
    });
    document.body.addEventListener('mousemove',(e)=>{
      if(self.state=='down'){
        let width = e.x - self.location_down.x;
        let height = e.y - self.location_down.y;

        self.controlDom.style.width = self.width + width + 'px';
        self.controlDom.style.height = self.height + height + 'px';
      }
    });
    document.body.addEventListener('mouseup',(e)=>{
      if(self.state=='down'){
        let width = e.x - self.location_down.x;
        let height = e.y - self.location_down.y;
        self.controlDom.style.width = self.width + width + 'px';
        self.controlDom.style.height = self.height + height + 'px';
      }
      self.state='up';
    });
  }

  window.Drag = drag;

  window.addEventListener('load',()=>{
    let temp = new window.Drag();
    let controlDom = document.querySelector('#body')
    temp.init(controlDom);
  })
})(window)