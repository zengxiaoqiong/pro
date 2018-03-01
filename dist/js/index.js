var m1 = angular.module("pro",["ionic"]);

//配置路由
m1.config(function($stateProvider){
		$stateProvider.state("index",{
			url:"/index",
			templateUrl:"temp/idxCon.html"
		}).state("classify",{
			url:"/classify",
			templateUrl:"temp/classify.html",
			controller:"classify"
		}).state("cart",{
			url:"/cart",
			templateUrl:"temp/cart.html",
			controller:"cart"
		}).state("community",{
			url:"/community",
			templateUrl:"temp/community.html"
		}).state("my",{
			url:"/my",
			templateUrl:"temp/my.html",
			controller:"my"
		}).state("login",{
			url:"/login",
			templateUrl:"temp/login.html",
			controller:"login"
		}).state("detail",{
			url:"/classify/detail/:id",
			templateUrl:"temp/detail.html",
			controller:"detail"
		})
	})
//首页index
m1.controller("demo",function($scope,$state){
	$state.go("index"); //设置默认首页
	$scope.myActiveSlide = 0;
	//下拉刷新
	$scope.doRefresh = function() {
//		alert(1)
	     $scope.$broadcast('scroll.refreshComplete');
	};
})

//分类
m1.controller("classify",function($scope,$state,$http,$stateParams){
	//下拉刷新
	$scope.doRefresh = function() {
	     $scope.$broadcast('scroll.refreshComplete');
	};
	$http({
		dataType:"json",
		method:"get",
		url:"package/cakeList.json"
	}).success(function(data){
		$scope.thisData = data.goods;
	})
	
	//点击加入购物车
	$scope.addToCart = function(){
		var id = this.data.product_id;
		console.log(id)
		$scope.zhezhao = {
			"display":"block"
		};
		$scope.close = function(){
			$scope.zhezhao = {
				"display":"none"
			}
		};
		$http({
			method:"get",
			dataType:"json",
			url:"package/cakeList.json"
		}).success(function(data){
			var thisData = data.goods;
			console.log(thisData)
			for(var i=0;i<thisData.length;i++){
				if(thisData[i].product_id==id){
					$scope.data = thisData[i];
				}
			}
		})
		
		//确定加入
		$scope.addToCartSure = function($event){
			console.log(this)
			//保存当前id
			var ids = localStorage.getItem("ids")?JSON.parse(localStorage.getItem("ids")):[];
			//当前id存入ids数组中
			var id_num = {
				id:id,
				num:1,
				name:this.data.name,
				price:this.data.price,
				en_name:this.data.en_name,
				spec:this.data.spec,
				imgSrc:this.data.imgSrc
			}
			//判断当前选购的商品之前是否选购过
			var index = isExist(id_num.id,ids)
			if(index==-1){
				ids.push(id_num)
			}else{
				ids[index].num++;
			}
			
			function isExist(id, ids) {
				for (var i = 0, len = ids.length; i < len; i++) {
					if(ids[i].id == id)
						return i;
				}
				return -1;
			}

			
			localStorage.setItem("ids",JSON.stringify(ids));
			$scope.zhezhao = {
				"display":"none"
			}
		}
	}
})


//详情
m1.controller("detail",function($scope,$http,$stateParams){
	$http({
		method:"get",
		url:"package/cakeList.json"
	}).success(function(data){
		var thisData = data.goods;
		for(var i=0;i<thisData.length;i++){
			if(thisData[i].product_id==$stateParams.id){
				$scope.data = thisData[i];
			}
		}
	})
	//点击加入购物车
	$scope.addToCart=function(){
		var id = ($stateParams.id)
		var ids = localStorage.getItem("ids")?JSON.parse(localStorage.getItem("ids")):[];
//		ids.push(id);
		console.log(this,this.data)
		var id_num = {
			id:id,
			num:1,
			name:this.data.name,
			price:this.data.price,
			en_name:this.data.en_name,
			spec:this.data.spec,
			imgSrc:this.data.imgSrc
		}
		//判断当前选购的商品之前是否选购过
			var index = isExist(id_num.id,ids)
			if(index==-1){
				ids.push(id_num)
			}else{
				ids[index].num++;
			}
			
			function isExist(id, ids) {
				for (var i = 0, len = ids.length; i < len; i++) {
					if(ids[i].id == id)
						return i;
				}
				return -1;
			}

		localStorage.setItem("ids",JSON.stringify(ids));
		alert("加入成功")
	}
})


//购物车
m1.controller("cart",function($scope,$http,$state,$timeout){
	$timeout(function(){
		//获取当前localstorge ids
		 $scope.ids = JSON.parse(localStorage.getItem("ids"));
		 var ids = JSON.parse(localStorage.getItem("ids"));
		 console.log(ids[0],ids[0].num);
		//点击加或减
		$scope.remove = function($event){
			for(var i=0;i<ids.length;i++){
				if(ids[i].num==1){
					console.log(ids[i].num)
					ids[i].num == 1;
				}else{
					ids[i].num++;
				}
			}
		}
	},10)
	
	
	
//	$scope.datas = [];
//	$http({
//		method:"get",
//		url:"src/package/cakeList.json",
//		params:{ids}
//	}).success(function(data){
//		var thisData = data.goods;
//		console.log(thisData)
//		for(var i=0;i<thisData.length;i++){
//			for(var j=0;j<ids.length;j++){
//				if(thisData[i].product_id==ids[j].id){
//					$scope.datas.push(thisData[i]);
//				}
//			}
//		}
//		
//	})
    
})


//我的
//判断是否有用户登录,
m1.controller("my",function($scope){
	//获取user
	var user = JSON.parse(localStorage.getItem("user"));
	if(user){
		$scope.userTop = true;
	}else{
		$scope.loginTop = true
	}
})


//登录
m1.controller("login",function($scope,$http,$state){
	$scope.header = false;
	$scope.footer = false;
	
	//点击登录
	$scope._login = function(){
		var tel = $scope.tel;
		var pwd = $scope.pwd;
		var pwd1 = $scope.pwd1;
		console.log(tel,pwd,pwd1)
		if(!tel||!pwd||!pwd1){
			alert("请输入完整");
		}else{
			var user = getUser(tel,pwd);
			console.log(user)
			registerData(user);
		}
	}
	function getUser(tel,pwd){
		var user = {
			tel:tel,
			password:pwd
		}
		return user;
	}
	function registerData(user){
		$http({
			method:"post",
			url:"http://stuapi.ysd3g.com/api/CreateUser",
			params:{
				tel:user.tel,
				pwd:user.password,
				email:'996998126@qq.com',
				mte:"111",
				token:"aa4ccde8-3b85-476d-b68b-7f78f72e74d1"
			}
			}).success(function(data){
				localStorage.setItem("user",JSON.stringify(tel));
				$state.go("index");
			})
	}
	
})














