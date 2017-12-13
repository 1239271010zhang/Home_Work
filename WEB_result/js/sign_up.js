$(function(){
		$('#btn').click(function(){
			var p1 = document.getElementById('p1');
			var p2 = document.getElementById('p2');
			p1.innerHTML = "";
			p2.innerHTML = "";
			if($('#uid').val() !== ""){	
				if($('#psw1').val() === $('#psw2').val()){
					$.ajax({
						type:'get',
						url:'http://datainfo.duapp.com/shopdata/userinfo.php',  
						data:{
							status:'register',
							userID:$('#uid').val(),
							password:$('#psw1').val()
						},
						success:function(info){
							switch(info){
								case '0':
									p1.innerHTML = '用户名已存在';
									break;
								case '2':
									p1.innerHTML = '数据库错误';
									break;
								case '1':
									window.location.href = 'sign_in.html';
							}
						}
					})
				}else{
					p2.innerHTML = '密码不一致';
				}
			}else{
				p1.innerHTML = '用户名不能为空';
			}
		})
})