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
//				console.log(data[0].goodsBenUrl)
//				for(var i=0;i<data[0].goodsBenUrl.split(',').length;i++){
//					console.log(data[0].goodsBenUrl.slice(1,-1).split(',')[i].slice(1,-1))
//				}
				$('#head').html($('#head').html()+
				`<p>`+data[0].goodsName.slice(0,8)+`...`+`</p>`)
				
				$('#info').html($('#info').html()+
				`<li goodId=`+goodId+`>
				<img src="`+data[0].goodsListImg+`">
				<p style="font-size: larger; ">`+data[0].goodsName+`</p>
				<p style="height:10px"></p>
				<p style="color: #696969">`+data[0].detail.slice(5)+`</p>
				<p style="color:red">`+`￥`+data[0].price+`</p>
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