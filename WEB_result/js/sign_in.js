$(function(){	
		if(!localStorage.getItem('login')){
			window.location.href="sign_in_swiper.html";
		}
		$('#btn').click(function(){
			var p = document.getElementById('p1');
			p.innerHTML = "";
			
			$.ajax({
				type:'get',    //post
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',  
				dataType:'json',
				data:{
					status:'login',
					userID:$('#uid').val(),
					password:$('#psw').val()
				},
				success:function(info){
					switch(info){
						case 0:
							p.innerHTML = '用户名不存在';
							break;
						case 2:
							p.innerHTML = '账号密码不一致';
							break;
					}
					if(info['userID'] === $('#uid').val() && $('#uid').val() !== ""){
						localStorage.setItem('login','true');
						localStorage.removeItem('userID');
						localStorage.setItem('userID',$('#uid').val());
						window.location.href = 'index.html';
					}
				}
			})
		})
})	