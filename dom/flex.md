

##### flex-shrink
用于控制当前DOM在需要被压缩空间时，按照什么比例来压缩，`默认为1`

`flex-shrink:0` 当前DOM将不会被弹性盒子收缩空间(当flex认为当前DOM需要被压缩的时候，将无视压缩)

##### flex-grow
与flex-shrink相反，它是控制在空间需要被弹开时的分配比例，`默认为0`

##### flex-basis
当设置了flex-basis则元素本身设置的width或height就无效了，flex-basis是用来取代元素的width,height来描述元素所占空间大小的，至于是取代width还是height则根据flex盒子的方向决定