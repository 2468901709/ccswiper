# 程诚轮播插件
## 使用方式
1. 引入swiper.js

  ```html
  <script src="swiper.js" type="text/javascript" charset="utf-8"></script>
  ```

2. 创建轮播，配置参数

  ```javascript
  var ccSwiper = new CcSwiper({
  				// 配置选择器在哪个元素上生成轮播
  				el:" #swiper",
  				// 设置图片列表
  				imgsList:["image/p1.png","image/p2.jpg","image/p3.jpg"],
  				// 设置轮播图的宽高
  				width: 632,
  				height: 320
  			})
  ```

  