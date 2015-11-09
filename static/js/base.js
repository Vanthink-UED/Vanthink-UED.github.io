/** onekit ui
**  20141118
**/

;(function () {
	var core = {
		date: '20141118',
		version: '1.01',
		desc: 'support loading messge'

	};

	core.Loading = (function(){
		var $loader = $('#loading');
		var defaultOptions = {
			text:'Loading'
		}
		return {
			show: function(args) {
				var that = this;
				if(args.text){
					$loader.text(args.text).show();
					window.setTimeout(function(){
						that.hide();
					},args.time || 3000)
				}
			},
			hide: function(){
				$loader.html(defaultOptions.text)
				$loader.hide();

			}
		}
	}());


	core.popupBox = (function(){
		var $popLayer = $('#popLayer');
	})();



	window.OneKit = core;
})();