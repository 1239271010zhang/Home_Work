$(function(){
//		显示商品详细
		var goodId = window.location.hash.slice(1);
		$.ajax({
			type:'get',
			url:'http://datainfo.duapp.com/shopdata/getGoods.php',
			dataType:'jsonp',
			data:{
				goodsID:goodId,
			},
			success:function(data){
				//在头部打印商品名称
				$('#head').html($('#head').html()+
				`<p>`+data[0].goodsName.slice(0,8)+`...`+`</p>`)
				//商品轮播图
				if(goodId == 12){
					var imgs = JSON.parse(data[0].goodsBenUrl);
					for(var i=0;i<3;i++){
						$('.swiper-wrapper').html($('.swiper-wrapper').html()+
						`<div class="swiper-slide">
						<div id="good_imgs"><img src="`+imgs[i]+`" alt="商品图" /></div>
						</div>`)
					}
				}else{
					var imgs = JSON.parse(data[0]['imgsUrl']);
					for(var i=0;i<3;i++){
						$('.swiper-wrapper').html($('.swiper-wrapper').html()+
						`<div class="swiper-slide">
						<div id="good_imgs"><img src="`+imgs[i]+`" alt="商品图" /></div>
						</div>`)
					}
				}
				//实现滑动效果
				var mySwiper = new Swiper('.swiper-container',{
					loop:true,
	    			pagination: '.swiper-pagination',
//	    			autoplay:2000
	  			})    
	  			//图片大时，隐藏部分；图片小时，拉伸
//	  			window.onload = function(){
//					var nimg = new Image(),w,h;
//					var heights = []; 
//					for(var i=0;i<imgs.length;i++){
//						nimg.src = imgs[i];
//						h = nimg.height;
//						w = nimg.width;
//						heights.push(h)
//					}
//					console.log(heights)
//					if(heights[1] <= 300){
//						$('.swiper-wrapper').html("");
//						for(var i=0;i<3;i++){
//							$('.swiper-wrapper').html($('.swiper-wrapper').html()+
//							`<div class="swiper-slide">
//							<div id="good_imgs"><img src="`+imgs[i]+`" alt="商品图" style="height:100%"/></div>
//							</div>`)
//						}
//					}
//				}
				//在图片下边打印商品信息
				$('#info').html($('#info').html()+
				`<li goodId=`+goodId+`>
				<p style="font-size: larger; ">`+data[0].goodsName+`</p>
				<p style="height:10px"></p>
				<p style="color: #696969">`+data[0].detail.slice(5)+`</p>
				<p style="height:10px"></p>
				<spanp style="font-weight:bolder;color:red">`+`￥`+data[0].price+`</spanp>
				<span style="color:#696969;margin-left:10px">限时折扣:`+data[0].discount+`</span>
				</li>`)
			}
		});
//		商品详细结束

//		更新购物车
		var p = document.getElementById('p');
		$('#btn').click(function(){
			if($('#inp').val() !== ""){
				$.ajax({
					type:'get',
					url:'http://datainfo.duapp.com/shopdata/updatecar.php',
					dataType:'json',
					data:{
						userID:localStorage.getItem('userID'),
						goodsID:goodId,
						number:$('#inp').val(),
					},
					success:function(data){
						switch(data){
							case 0:
								p.innerHTML = '';
								p.innerHTML = '添加购物车失败,请重新添加';
								break;
							case 1:
								p.innerHTML = '';
								p.innerHTML = '添加购物车成功';
								break;
						}
					}
				})
			}else{
				p.innerHTML = '请输入购买数量';
			}
		})
})