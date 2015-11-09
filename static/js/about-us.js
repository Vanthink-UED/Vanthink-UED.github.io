

/**earth**/

EarthApp = function(){
	Sim.App.call(this);
}
//子类Sim.App
EarthApp.prototype = new Sim.App();
//自定义初始化过程
EarthApp.prototype.init = function(param){
	//调用父类初始化场景
	Sim.App.prototype.init.call(this,param);

	// 创建地球
	var earth = new Earth();
	earth.init();
	this.addObject(earth);

	var stars = new Stars();
	stars.init(200);
	this.addObject(stars);	
}

//

Earth = function(){
	Sim.Object.call(this);
}

Earth.prototype = new Sim.Object();

Earth.prototype.init = function(){
	// 创建地球体并且添加纹理
	var earthmap = "../static/img/earth06.jpg";
	var geometry = new THREE.SphereGeometry(1.2,32,32);
	var texture = THREE.ImageUtils.loadTexture(earthmap);
	var material = new THREE.MeshBasicMaterial({map:texture});
	var mesh = new THREE.Mesh(geometry,material);

	// 稍微倾斜一下
	mesh.rotation.z = Earth.TILT;


	//把对象传递给框架

	this.setObject3D(mesh);
	this.object3D.position.x = 0;
}

Earth.prototype.update = function(){
	// 让地球动起来
	this.object3D.rotation.y += Earth.ROTATION_Y;

}	

Earth.ROTATION_Y = 0.0025;
Earth.TILT = 0.41;
/**end earth**/
/** ParticlesSystem**/
var Stars = function(){
	Sim.Object.call(this);	
}
Stars.prototype = new Sim.Object();
Stars.prototype.init = function(minDistance){
	// 创建容纳粒子系统的群组
	var starsGroup = new THREE.Object3D();
	var i;
	var starsGeometry = new THREE.Geometry();

	// 创建随机粒子系统位置坐标

	for(i=0; i<Stars.NVERTICES; i++){
		var vector = new THREE.Vector3(
			(Math.random() * 2 - 1) * minDistance,
			(Math.random() * 2 - 1) * minDistance,
			(Math.random() * 2 - 1) * minDistance
		);

		if (vector.length() < minDistance) {
			vector = vector.setLength(minDistance);
		}

		starsGeometry.vertices.push( new THREE.Vertex(vector) );
	}

	//创建恒星的尺寸和颜色

	var starsMaterials = [];
	for(i = 0; i < Stars.NMATERIALS; i++){
		starsMaterials.push(
			new THREE.ParticleBasicMaterial({ 
				color: 0x101010 * (i+1),
				size: i%2 + 1,
				sizeAttenuation: false
			})
		);

	}

	// 创建若干个粒子系统，以圆形围绕的方式，覆盖整个天空
	for( i = 0; i < Stars.NPARTICLESYSTEM; i ++){
		var stars = new THREE.ParticleSystem(
			starsGeometry, starsMaterials[i % Stars.NMATERIALS]
		)
		stars.rotation.y = i/(Math.PI * 2);

		starsGroup.add( stars );
	}

	this.setObject3D(starsGroup);

}
Stars.NVERTICES = 1200;
Stars.NMATERIALS = 8;
Stars.NPARTICLESYSTEM = 24;



/** end Particlessystem**/


// 初始化
var renderer = null;
var scene = null;
var camera = null;
var mesh = null;


/** end webgl **/





$(document).ready(function() {
		var container = document.getElementById("three-js");
		var app = new EarthApp();
		app.init({ container: container });
		app.run();

		$(".js-join-us").click(function(){
			$("#three-js").hide();
			$(".doc-hd").hide();
			$(".doc-bd").show();
		});

		var ajaxUrl = "../data/about-us.php";
		$.getJSON(ajaxUrl, function(result){
			
			if(result.success){
				console.log(result.data);
				var html = template("list",{list:result.data});
				document.getElementById('list-container').innerHTML = html;
				$("#list-container li").click(function(){
					top.location.href = $(this).attr("data-url");
				})
			}
		});



	}
);