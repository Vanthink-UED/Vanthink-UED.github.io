;(function() {
	"use strict";

	var Page = (function(){
		
		var megBox = {
			status： false,
			msg: "",
			$el : $("")
		}
		var data = window.data;


		
		// 解析列表




		return{
			init: function() {
				var list = template('list',data);
				 
			},

			notion: function(){
				if(msgBox.status){
					msgBox
				}
			}
		}
	})();

});
