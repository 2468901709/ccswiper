// options
// {
	// el:" #swiper";
	// imgsList:["image/p1.png","image/p2.jpg","image/p3.jpg"];
// }

// 追加样式
var style = document.createElement("style");
style.innerHTML = `
*{
	margin: 0;
	padding: 0;
}

body{
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.main{
	width: 100%;
	height: 600px;
	background-color: #edf0f0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.swiper{
	width: 772px;
	height: 320px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.swiper .imglist{
	width: 632px;
	height: 320px;
	position: absolute;
	left: 70px;
	top: 0;
}
.swiper .imglist .imgItem{
	width: 632px;
	height: 320px;
	position: absolute;
	left: 0;
	top: 0;
	background-position: center;
	background-size: 100% 100%;
	transition: opacity 0.8s;
	border-radius: 10px;
	opacity: 0;
}

.swiper .imglist .imgItem.active{
	opacity: 1;
}


.swiper .btn .forward{
	width: 50px;
	height: 50px;
	position: absolute;
	right: 0;
	top: calc(50% - 25px);
	/* 显示鼠标手 */
	cursor: pointer;
	border-radius: 50%;
}
.btn:hover .forward{
	background-color: rgba(0,0,0,0.2);
}
.btn:hover .back{
	background-color: rgba(0,0,0,0.2);
}
.btn:hover .forward path{
	stroke: #FFFFFF;
}
.btn:hover .back path{
	stroke: #FFFFFF;
}

.swiper .btn .back{
	width: 50px;
	height: 50px;
	position: absolute;
	left: 0;
	top: calc(50% - 25px);
	/* 显示鼠标手 */
	cursor: pointer;
	border-radius: 50%;
}

.icon-fw{
	stroke: grey;
	stroke-width: 3;
	stroke-linejoin: round; 
	stroke-lineCap: round;  
	fill: none;
}

.circleList{
	width: 100%;
	height: 10px;
	position: absolute;
	bottom: -30px;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	box-sizing: border-box;	
	cursor: pointer;
}
.swiper .circleList .circle{
	width: 40px;
	height: 5px;
	/* border: 1px solid #ccc; */
	background-color: #999;
	margin: 0 5px;
	box-sizing: border-box;
	border-radius: 30px;
	opacity: 0.5;
}
.swiper .circleList .circle.active{
	background-color: lightseagreen;
}


`
document.body.appendChild(style);

function CcSwiper(options){
	var main = document.querySelector(options.el); 
	//添加一个swiper的类名
	main.classList.add("main");
	// 设定宽高
	main.style.width = options.width+"%";
	main.style.height = options.height+"px";
	
	var swiperElemt = document.createElement("div");
	swiperElemt.className = "swiper";
	main.appendChild(swiperElemt);
	
	// 默认索引值从0开始
	var index = 0;
	
	// 创建图片列表
	var imgList = document.createElement("div");
	imgList.className = "imglist";
	
	// 小圆点
	var circleList = document.createElement("div");
	circleList.className = "circleList";
	
	
	// 根据配置生成图片,小圆点
	options.imgsList.forEach(function(item,i){
		// 图片
		var imgItem = document.createElement("div");
		imgItem.className = i == index ? "imgItem active":"imgItem";
		imgItem.style.backgroundImage = "url("+item+")";
		imgList.appendChild(imgItem);
		
		// 小圆点
		var circle = document.createElement("div");
		circle.className = i == index ? "circle active":"circle";
		circle.setAttribute("data-index",i);  
		circleList.appendChild(circle);
	})

	// 按钮样式
	var btn = document.createElement("div");
	btn.className = "btn";
	// 前进
	var forward = document.createElement("div");
	forward.className = "forward";
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width","50");
	svg.setAttribute("height","50");
	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path1.setAttribute("d","M20 15 L32 25 Z");
	path1.setAttribute("class","icon-fw");
	path2.setAttribute("d","M32 25 L20 35 Z");
	path2.setAttribute("class","icon-fw");
	svg.appendChild(path1);
	svg.appendChild(path2);
	forward.appendChild(svg);
	btn.appendChild(forward);
	// 后退
	var back = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	back.setAttribute("class","back");
	back.setAttribute("width","50");
	back.setAttribute("height","50");
	var path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	var path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path3.setAttribute("d","M30 15 L18 25 Z");
	path3.setAttribute("class","icon-fw");
	path4.setAttribute("d","M18 25 L30 35 Z");
	path4.setAttribute("class","icon-fw");
	back.appendChild(path3);
	back.appendChild(path4);
	btn.appendChild(back);
	swiperElemt.appendChild(imgList);
	swiperElemt.appendChild(btn);
	swiperElemt.appendChild(circleList);
	
	// 写各部分元素事件
	var imgsArr = document.querySelectorAll(".imgItem");
	//节阀流，防止过快点击
	isClick = true;
	// 前进
	forward.onclick = function(){
		if(isClick){
			isClick = false;
			setTimeout(function(){
				isClick = true;
			},800);
			imgsArr[index].classList.remove("active");
			circles[index].classList.remove("active");
			index ++;
			if(index >= imgsArr.length){
				index = 0;
			}
			imgsArr[index].classList.add("active");
			circles[index].classList.add("active");
		}
	}
	// 后退
	back.onclick = function(){
		if(isClick){
			isClick = false;
			setTimeout(function(){
				isClick = true;
			},800);
			imgsArr[index].classList.remove("active");
			circles[index].classList.remove("active");
			index --;
			if(index < 0){
				index = imgsArr.length-1;
			}
			imgsArr[index].classList.add("active");
			circles[index].classList.add("active");
		}
	}
	
	// 小圆点
	var circles = document.querySelectorAll(".circle");
	// 事件委托
	circleList.onclick = function(e){
		
		if(e.target.className == "circle"){
			if(isClick){
				isClick = false;
				setTimeout(function(){
					isClick = true;
				},400);
				imgsArr[index].classList.remove("active");
				circles[index].classList.remove("active");
				// e.target获取事件触发元素对象
				index = parseInt(e.target.dataset.index);
				imgsArr[index].classList.add("active");
				circles[index].classList.add("active");
			}
		}
	}
	
	// 设置自动播放
	var intervalId = setInterval(function(){
		forward.click();
	},2000);
	
	// 鼠标移动进入轮播图，停止自动播放
	swiperElemt.onmouseenter = function(){
		clearInterval(intervalId);
	}
	swiperElemt.onmouseleave = function(){
		intervalId = setInterval(function(){
			forward.click();
		},2000);
	}
}
