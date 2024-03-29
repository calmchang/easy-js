[TOC]

### 环境搭建
1. unity官网可以下载unity工具
2. 安装vscode
3. 根据unity官网文档内的vscode环境搭建步骤进行搭建
4. vscode需要安装的插件
  * C# 
  * unity code snippets
5. vscode用户配置  
  `"omnisharp.useModernNet": false,`

### 碰撞(Collider)
* 让物体和世界产生碰撞有几个必要条件：
	* 1.必须给对象添加钢体(RigidBody)，可在`Component -> Physics`菜单内添加。
	* 2.必须给对象添加碰撞盒(Collider)，可在`Component -> Physics`菜单内添加。  
		* 碰撞盒分为：矩形(Box)、胶囊形(Capsule)、球形(Sphere)、等等

* 如果添加后仍然可以穿越地面/物体，可以检查：
	* 1.`Capsule Collider` 属性设置区内，`is Trigger`不应该打钩。
	* 2.对象的碰撞框应该和对象体积相符合（如果过大，在快速移动的时候就可以直接穿透对象）

### 脚本(Script)

### 地形(Terrain)

### 几何体(Shape)

### 光源(Light)

### 摄像机(Camera)

### 角色(BodyController)


### 视角坐标
* 把物体视角调整到当前scene区内看到的一样。
	* 1.先在scene内调整到你要的位置和视角
	* 2.`Hierarchy`内选中你要调整的物体
	* 3.`菜单栏`GameObject` -> `Align with View`
	
* 坐标系
	* 如果将场景调到TOP视角（从正上方往下看），那么XYZ轴分别对应
		* X轴是从左往右，控制场景左右（类似2D内的X轴）
		* Z轴为从下往上，控制场景上下（类似2D内的Y轴）
		* Y轴为从里到外，控制场景高度（地面到天空之间的距离）

	* 旋转Rotation规则
		* X轴旋转时：正数为沿着X轴向上翻转，负数为向下
		* Y轴旋转时：正数为沿着Y轴向左翻转，负数为向右
		* Z轴旋转时：正数为沿着Z轴向左翻转，负数为向右




### 编辑器快捷键
* 按住`鼠标右键`，然后按`W/S/A/D`可以控制镜头前后左右移动，`Q/E`可以控制镜头升高降低高度。
* `Q/W/E/R/T`分别代表左上角5个基本工具（镜头移动、物体移动、旋转、缩放、物体形状操作） 
* `F`可以快速将镜头定位到当前选中的对象。

### 优化
* 给不会发生移动的对象勾选 `Static` 属性，以便引擎优化。

