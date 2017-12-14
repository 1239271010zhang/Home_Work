$(function(){
		if(!localStorage.getItem('userID')){
			window.location.href="sign_in.html";
		}
		//计算总价函数
		function setTotal(){ 
			var s = 0; 
			$("#goodList :checkbox").each(function(){
				if($(this).prop("checked")){
					s += parseInt($(this).parents('tr').next('tr').find('.number')[0].value)*parseFloat($(this).parents('tr').find('.price')[0].innerText.slice(1)); 
				}
			});
			$("#total").html(`￥`+s.toFixed(2)); 
		} 
		//购物车为空函数
		function emptyCar(){
			$('#page').css('background-color','#FFFFFF');
			$('#goodList').html(`
			<div style="text-align:center">
				<img style="height:100px;width:100px;" src="../images/car.jpg" />
				<h1 style="color:#696969">购物车空空如野,快去逛逛吧</h1>
				<div style="border:1px solid #696969;margin-top:10px">
					<a href="index.html" rel="external" data-role="button" style="color:#000">
						<h2>前往促销大卖场</h2>
					</a>
				</div>
			</div>`);
		}
		//全选&&反选&&删除框
			//全选
            $("#goodList").on('click','#selectAll',function(){  
                $("#goodList :checkbox").prop("checked",true);
                setTotal();
            });
			//取消选
            $("#goodList").on('click','#reverse',function(){  
                $("#goodList :checkbox").each(function(){
                	$(this).prop("checked",false);
                	setTotal();
                });
            });  
            //清空购物车
            $('#remove_all').click(function(){
	            $("#goodList :checkbox").each(function(){
					$.ajax({
						type:'get',
						url:'http://datainfo.duapp.com/shopdata/updatecar.php',
						dataType:'json',
						data:{
							userID:localStorage.getItem('userID'),
							goodsID:$(this).parents('tr').attr('goodID'),
							number:0,
						}
					});
				});
				emptyCar();
            })
            //删除单个商品
            $('#goodList').on('click','#remove',function(){
				$.ajax({
					type:'get',
					url:'http://datainfo.duapp.com/shopdata/updatecar.php',
					dataType:'json',
					data:{
						userID:localStorage.getItem('userID'),
						goodsID:$(this).parents('tr').siblings('tr').attr('goodID'),
						number:0,
					}
				});
				$(this).parents('tr').siblings('tr').remove();
				$(this).parents('tr').remove();
				setTotal();
          	});
          	//删除选中商品
          	$('#goodList').on('click','#remove_checked',function(){
          		$("#goodList :checkbox").each(function(){
          		 	if($(this).prop('checked')){
          		 		$.ajax({
							type:'get',
							url:'http://datainfo.duapp.com/shopdata/updatecar.php',
							dataType:'json',
							data:{
								userID:localStorage.getItem('userID'),
								goodsID:$(this).parents('tr').siblings('tr').attr('goodID'),
								number:0,
							}
						});
						$(this).parents('tr').siblings('tr').remove();
						$(this).parents('tr').remove();
						setTotal();
          		 	}
          		});
          		//获取购物车信息，如果数据为空，执行空车函数
          		$.ajax({
					type:'get',
					url:'http://datainfo.duapp.com/shopdata/getCar.php',
					dataType:'jsonp',
					data:{
						userID:localStorage.getItem('userID'),
					},
					success:function(data){
						if(data.length == undefined){
							emptyCar();
						}
					}
				});
          	})
          	//选中单个商品
          	$('#goodList').on('click','#checkbox',function(){
          		setTotal();
          	})
          	
			//购物车信息
			$.ajax({
				type:'get',
				url:'http://datainfo.duapp.com/shopdata/getCar.php',
				dataType:'jsonp',
				data:{
					userID:localStorage.getItem('userID'),
				},
				success:function(data){
					if(data.length !== undefined){
						$('#goodList').html(
							`<tr>
							<th colspan="3" align="left"><p>唯品国际</p></th>
							<th align="right" colspan="2">
							<a id="selectAll" style="text-decoration:none;color:#000">全选</a>
							<a id="reverse" style="text-decoration:none;color:#000">取消</a>
							</th>
							</tr>`)
					
						for(var i=0;i<data.length;i++){
							$('#goodList').html($('#goodList').html() + 
							`<tr goodID="`+data[i].goodsID+`">
							<td rowspan="2"><input type="checkbox" id='checkbox'/></td>
							<td rowspan="2" id="imgs"><img style="height:100%;width:100%" src="`+data[i].goodsListImg+`" /></td>
							<td colspan="2" style="vertical-align:top;width:170px">
							<p style="font-weight:bold">`+data[i].goodsName+`</p>
							<p style="color:#696969;font-size:smaller">UGG 施华洛世奇旗舰店</td>
							<td align="right" style="vertical-align:top"><p style="font-weight:bolder" class="price">￥`+data[i].price+`</p>
							<p style="color:#696969;font-size:small">折扣:`+data[i].discount+`</p>
							</td>
							</tr>
							<tr goodID="`+data[i].goodsID+`">
							<td style="vertical-align:bottom" colspan="3">
							<span>
							<input class="min" type="button" value="-" style="height:25px;width:20px;float:left"/>
							<input class="number" type="text" style="height:21px;width:50px;float:left" value="`+data[i].number+`" /> 
							<input class="add" type="button" value="+" style="height:25px;width:20px;float:left"/>
							</span>
							<img src="../images/gr0.jpg" id="remove"/>
							</td></tr>`)
						}
						$("#goodList").on('click','.add',function(){
							var t = $(this).parents('tr').find('.number')[0];
							t.value = (parseInt(t.value)+1); 
							setTotal(); 
							
							$.ajax({
								type:'get',
								url:'http://datainfo.duapp.com/shopdata/updatecar.php',
								dataType:'json',
								data:{
									userID:localStorage.getItem('userID'),
									goodsID:$(this).parents('tr').attr('goodID'),
									number:t.value,
								}
					        })
						});
							
						$("#goodList").on('click','.min',function(){ 
							var t = $(this).parents('tr').find('.number')[0];
							t.value = (parseInt(t.value)-1); 
							if(parseInt(t.value)<0){ 
								t.value = 0;
							} 
							setTotal();
							
							$.ajax({
								type:'get',
								url:'http://datainfo.duapp.com/shopdata/updatecar.php',
								dataType:'json',
								data:{
									userID:localStorage.getItem('userID'),
									goodsID:$(this).parents('tr').attr('goodID'),
									number:t.value,
								}
					        })
						});
						
						$('#goodList').html($('#goodList').html()+
						`<tr>
						<td colspan="4" style="border-top:1px solid #696969">总金额：<span id="total" style="color:red"></span></td>
						<td align="right" style="border-top:1px solid #696969"><a id="remove_checked" style="text-decoration:none;color:red;">删除</a></td></tr>`)
					}else{
						emptyCar();
					}
				}
			})
})