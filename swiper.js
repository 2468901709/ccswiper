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

.swiper{
	width: 632px;
	height: 320px;
	position: relative;
	margin: 0 auto;
}

.swiper .imglist .imgItem{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background-position: center;
	background-size: cover;
	transition: opacity 0.8s;
	opacity: 0;
}
/* 千万不要.active,因为class="imgItem active"前一个会覆盖后一个,根本就不执行opacity :0; */
/* 所以要让他既要imgItem又要active的时候opacity:1 */
.swiper .imglist .imgItem.active{
	opacity: 1;
}


.swiper .btn .forward{
	width: 50px;
	height: 50px;
	color: #FFFFFF;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	right: 0;
	top: calc(50% - 25px);
	text-align: center;
	line-height: 50px;
	font-size: 50px;
	/* 显示鼠标手 */
	cursor: pointer;
}
.swiper .btn .back{
	width: 50px;
	height: 50px;
	color: #FFFFFF;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	left: 0;
	top: calc(50% - 25px);
	text-align: center;
	line-height: 50px;
	font-size: 50px;
	/* 显示鼠标手 */
	cursor: pointer;
}

.circleList{
	width: 100%;
	height: 10px;
	position: absolute;
	bottom: 20px;
	left: 0;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 20px;
	box-sizing: border-box;	
}
.swiper .circleList .circle{
	width: 10px;
	height: 10px;
	border: 1px solid #ccc;
	background-color: #999;
	margin: 0 5px;
	box-sizing: border-box;
	border-radius: 4px;
}
.swiper .circleList .circle.active{
	background-color: #FFF;
}

`
document.body.appendChild(style);

function CcSwiper(options){
	var swiperElemt = document.querySelector(options.el); 
	//添加一个swiper的类名
	swiperElemt.classList.add("swiper");
	// 设定宽高
	swiperElemt.style.width = options.width+"px";
	swiperElemt.style.height = options.height+"px";
	
	
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
	forward.innerHTML = ">";
	btn.appendChild(forward);
	// 后退
	var back = document.createElement("div");
	back.className = "back";
	back.innerHTML = "<";
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