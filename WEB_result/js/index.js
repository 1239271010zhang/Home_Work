$(function(){
		if(!localStorage.getItem('login')){
			window.location.href="sign_in_swiper.html";
		}
		$('#mbx').click(function(){
			if(!localStorage.getItem('userID')){
				window.location.href="sign_in.html";
			}
		})
//		获取导航栏分类
		$(function(){
			$.ajax({
				type:'get',
				url:'http://datainfo.duapp.com/shopdata/getclass.php',
				dataType:'json',
				success:function(data){
					for(var i=0;i<7;i++){
						$('#classList').html($('#classList').html()+
						`<li classID=`+data[i].classID+`>
						<p>`+data[i].className+`</p>
						</li>`)
					}
					$('.wrapper').navbarscroll();
//		导航栏商品列表					 	
					$('#classList>li').on('click',function(){
						var classid = this.getAttribute('classID');
						$.ajax({
							type:'get',
							url:'http://datainfo.duapp.com/shopdata/getGoods.php',
							dataType:'jsonp',
							data:{
								classID:classid,
							},
							success:function(data){
								$('#goodList').html("");
								if(data.length !== undefined){
									for(var i=0;i<data.length;i++){
										$('#goodList').html($('#goodList').html()+
										`<li goodId=`+data[i].goodsID+`>
										<div id="good_imgs"><img src="`+data[i].goodsListImg+`"></div>
										<p>`+data[i].goodsName.slice(0,9)+`</P>
										<p style="color:red">`+`￥`+data[i].price+`</p>
										</li>`);
									}
									
									$('#goodList>li').on('click',function(){
										window.location.href = 'index_info.html#' + this.getAttribute('goodId');
									})
								}else{
									$('#goodList').html("<h1>亲，你搜的宝贝卖没了，洗洗睡吧。<h1>");
								}
							}
						})
					});
				}
			})
		});
//		获取结束	

//		文字轮播图
		$(function(){
			var box = document.getElementById("box");
			var box1 = document.getElementById("box1");
			var box2 = document.getElementById("box2");
			box2.innerHTML = box1.innerHTML;
			function move(){
				if(box.scrollLeft - box2.offsetWidth >= 0){
					box.scrollLeft -= box1.offsetWidth;
				}
				else{
					box.scrollLeft++;
				}
			}
			var timer = setInterval(move,20);
		});
//		文字轮播结束

//轮播图展示
		var mySwiper = new Swiper('.swiper-container',{
			loop:true,
	    	pagination: '.swiper-pagination',
	    	autoplay:2000
	  	})
		
//		获取焦点
		$('#sc').click(function(){
			$('#input_search').focus();
		})
//		搜索商品
		$('#input_search').bind('input', function(){
			if($('#input_search').val() !== ""){
				$.ajax({
					type:'get',
					url:'http://datainfo.duapp.com/shopdata/selectGoodes.php',
					dataType:'jsonp',
					data:{
						selectText:$('#input_search').val(),
					},
					success:function(data){
						$('#goodList').html("");
						if(data.length !== undefined){
							for(var i=0;i<data.length;i++){
								$('#goodList').html($('#goodList').html()+
								`<li goodId=`+data[i].goodsID+`>
								<div id="good_imgs"><img src="`+data[i].goodsListImg+`"></div>
								<p>`+data[i].goodsName.slice(0,9)+`</P>
								<p style="color:red">`+`￥`+data[i].price+`</p>
								</li>`)
							}
							$('#goodList>li').on('click',function(){
								window.location.href = 'index_info.html#' + this.getAttribute('goodId');
							})
						}else{
							$('#goodList').html("<h1>亲，你搜的宝贝卖没了，洗洗睡吧。</h1>")
						}
					}
				})
			}else{
				$('#goodList').html("");
				$(function(){
					$.ajax({
						type:'get',
						url:'http://datainfo.duapp.com/shopdata/getGoods.php',
						dataType:'jsonp',
						success:function(data){
							for(var i=0;i<data.length;i++){
								$('#goodList').html($('#goodList').html()+
								`<li goodId=`+data[i].goodsID+`>
								<div id="good_imgs"><img src="`+data[i].goodsListImg+`"></div>
								<p>`+data[i].goodsName.slice(0,9)+`</P>
								<p style="color:red">`+`￥`+data[i].price+`</p>
								</li>`)
							}
							$('#goodList>li').on('click',function(){
								window.location.href = 'index_info.html#' + this.getAttribute('goodId');
							})
						}
					})
				});
			}
		})
//		搜索商品结束

//		获取热搜商品列表
			$(function(){
				$.ajax({
					type:'get',
					url:'http://datainfo.duapp.com/shopdata/getGoods.php',
					dataType:'jsonp',
					success:function(data){
						for(var i=0;i<data.length;i++){
							$('#goodList').html($('#goodList').html()+
							`<li goodId=`+data[i].goodsID+`>
							<div id="good_imgs"><img src="`+data[i].goodsListImg+`"></div>
							<p>`+data[i].goodsName.slice(0,9)+`</P>
							<p style="color:red">`+`￥`+data[i].price+`</p>
							</li>`);
							}
							
						$('#goodList>li').on('click',function(){
							window.location.href = 'index_info.html#' + this.getAttribute('goodId');
						})
					}
				})
			});
//		获取热搜结束
})