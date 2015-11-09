var Share = (function(){
	var title = encodeURI($(".title a").text());
	var url = top.location.href;
	var img = $(".entry img")[0];
	var des = encodeURI($('meta[name="description"]').attr("content"));
	var src = img? img.src :  "http://www.freleap.com/static/img/default-share.jpg";

	
	return {
		init:function(){
			var that = this;
			$(".weibo").on("click",function(e){
				e.preventDefault();
				that.shareToWeibo();
				
			});
			$(".qzone").on("click",function(e){
				e.preventDefault();
				that.shareToQzone();
			});
			$(".wechat").on("click",function(e){
				e.preventDefault();
				that.shareToWechat();
			});

		},

		shareToWeibo: function(){
			var links = "http://service.weibo.com/share/share.php";
			links += "?url=" + url;
			links += "&title=" + title;
			links += "&appkey=1671626741"; 
			links += "&searchPic=false";
			links += "&pic=" + src;
			window.open(links);

		},

		shareToQzone: function() {
			var links = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
			links += "?url=" + "http://www.freleap.com";
			links += "&title=" + title;
			links += "&summary=" + des;
			links += "&pics=" + src;
			links += "&site=" + "Freleap.Blog";
			window.open(links);

		},

		shareToWechat: function() {
			
			if (typeof WeixinJSBridge == "undefined") {
				$('#pop-layer').show();
			} else {
				WeixinJSBridge.invoke('shareTimeline', {
				"title": title,
				"link": url,
				"desc": desc,
				"img_url": src
				});
			}
		}
	}

}());

$(function() {
	$("#toggle-menu").click(function(){
				
		if($(this).attr("class").indexOf("hidden") > 0){
			$(".top-menu").slideDown("slow");
			$(this).addClass("toggle-menu-visible").removeClass("toggle-menu-hidden");
		}else{
			$(".top-menu").slideUp(400);
			$(this).addClass("toggle-menu-hidden").removeClass("toggle-menu-visible");
		}
	});

	$('#pop-layer .close-btn').on('click',function(e){
		e.preventDefault();
		$('#pop-layer').hide();
	});
	var thingInfoHtml = location.href;
	$("#wechat-code").qrcode({
		text:thingInfoHtml,
		width:240,
		height:240
	});

	Share.init();




	



});