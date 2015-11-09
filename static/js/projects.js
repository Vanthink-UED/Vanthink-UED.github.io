
var GAS_PJAX = new Pjax();
var contentIndicator;
var imageIndicator;

$(document).ready(function() {
	
	var pjaxContainer = "pjax-container";
	var pjaxContents = "contents";
	var transitionEnd = getTransitionEndType();
	var nextPageURL = "";
	var pjaxPush = false;
	var wd = ScrollProperties.wd;
	var kd = ScrollProperties.kd;
	var t = document.getElementById("images"); // Target
	var p = t.getElementsByTagName("ul")[0];   // Parent
	var c = p.getElementsByTagName("li");      // Children
	var IndImgW, IndImgK;
	
	IndImgW = new Image();
	IndImgK = new Image();
	IndImgW.src = "/common/images/indicator_w.png";
	IndImgK.src = "/common/images/indicator_k.png";
	
	// Pjax callback
	var onloadStart = function() {
		if (contentScroller) {
			contentScroller.reset();
			contentScroller.stop();
		}
		GAS_PJAX.push("", nextPageURL, pjaxPush);
		document.getElementById("global-footer").style.opacity = 0;
	}
	
	var onloadAjaxContent = function(data) {
		replaceSideImages.build(data, sideImageOnLoadComplete);
	}
	
	var onReady = function(data) {
		$("#" + pjaxContents + " a[target!='_blank']").not("a[href*='#']").click(onClickHandler);
		document.getElementById(pjaxContainer).style.height = "auto";
		$("#header-wrapper").attr("class", "show");
		currentPageHighlight("#gnav-main", 1);
		currentPageHighlight("#gnav-main ul", 2);
	}
	
	var onloadComplete = function() {
		if (imageScroller) imageScroller.resize();
		if (contentScroller) contentScroller.start();
		document.getElementById(pjaxContainer).style.opacity = 1;
		document.getElementById("global-footer").style.opacity = 1;
		contentIndicator.hide();
		$("a[href*='/en/']").click(pageFadeOut);
	}
	
	var onPopstate = function(url) {
		pjaxPush = false;
		nextPageURL = url;
		document.getElementById(pjaxContainer).style.height = document.getElementById(pjaxContainer).offsetHeight  + "px";
		document.getElementById(pjaxContainer).style.opacity = 0;
		
		if (GAS_PJAX.isLoading()) {
			GAS_PJAX.cancel();
			replaceSideImages.cancel();
		}
	}
	
	var onCancel = function() {
		onloadStart();
	}
	
	var sideImageOnLoadComplete = function() {
		imageIndicator.hide();
		if (imageScroller) {
			imageScroller.resize();
			// 鍓嶅洖銈備粖鍥炪倐閫氬父銈枫儶銉笺偤銇倝鍒濇湡鍖栥仐銇亜
			if (replaceSideImages.getNextImagesType() === "default" && replaceSideImages.getPrevImagesType() === "default") {
				// 銈裤偆銉堛儷銇屻亗銈嬨仾銈夈儠銈с兗銉夈偄銈︺儓
				if (document.getElementById("catch")) {
					// Nothing here.
				}
			} else {
				imageScroller.init();
			}
		}
	}
	
	
	
	// Pjax trigger
	function onClickHandler(e) {
		pjaxPush = true;
		nextPageURL = this.getAttribute("href");
		document.getElementById(pjaxContainer).style.height = document.getElementById(pjaxContainer).offsetHeight  + "px";
		document.getElementById(pjaxContainer).style.opacity = 0;
		if (e.preventDefault) e.preventDefault();
	}
	
	function onResize() {
		var wh = document.documentElement.clientHeight || document.body.clientHeight;
		var images = document.getElementById("images");
		if (imageScroller) imageScroller.resize();
		if (UA.device === "other") {
			images.style.height = wh + document.getElementsByTagName("body")[0].offsetHeight + "px";
		} else {
			images.style.height = $("#contents-wrapper").height() + $("#header-wrapper").height() + "px";
		}
	}
	
	function pageFadeOut(e) {
		var t = this;
		e.preventDefault();
		$("body").fadeOut(300, function() {
			window.location.href = $(t).attr("href");
		});
	}
	
	
	
	// Global navigation
	(function() {
		var $uls = $("#gnav-main, #gnav-sub, #gnav-lang, #gnav-sns");
		$uls.find("ul").css({visibility: "hidden", opacity: 0});
		$uls.children("li").on({
			"mouseover" : function() {
				$ul = $(this).find("ul");
				if ($ul) {
					var y = $(this).children("a").height();
					$ul.css({
						visibility: "visible",
						left: ($(this).width() >> 1) - ($ul.width() >> 1) + "px",
						top: y + "px"
					}).stop().animate({ opacity: 1 }, 100, "linear");
				}
			},
			"mouseout" : function() {
				$ul = $(this).find("ul");
				if ($ul) {
					$ul.stop().animate({ opacity: 0 }, 100, "linear", function() {
						$ul.css("visibility","hidden");
					});
				}
			}
		});
		
		$("#wrapper").mousewheel(function(e, delta, dx, dy) {
			var flag;
			dy > 0 ? flag = "show" : flag = "hide";
			document.getElementById("header-wrapper").setAttribute("class", flag);
			return false;
		});
		
		$("#header-wrapper").on({
			"mouseenter" : function() {
				$("#header-wrapper").attr("class", "show");
			}
		});
		
	})();
	
	
	
	// Reserve window
	(function() {
		var d = new Date();
		
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var nextYear = year + 1;
		
		$("#yearSelect").val(year);
		$("#monthSelect").val(month);
		$("#daySelect").val(day);
		$("#yearSelect").append("<option>" + year +"</option><option>" + nextYear +"</option>");
		
		$("#search-button").click(function() {
			
			var ys = $("#yearSelect").val();
			var ms = $("#monthSelect").val();
			var ds = $("#daySelect").val();
			var ss = $("#staySelect").val();
			var ps = $("#personSelect").val();
			
			if (ss === "-") ss = 1;
			if (ps === "-") ps = 2;
			
			$(this).find("a").attr({
				href: "https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=61190&hcod2=001&hidmode=select&mode=seek&hidSELECTARRYMD=" + ys + "/" + ms + "/" + ds + "&hidSELECTHAKSU=" + ss + "&hidSELECTadult=" + ps + ""
			});
		});
		
		
		
		// Select elements.
		var reserveBox = document.getElementById("reserve-box");
		var selectbuttons = reserveBox.getElementsByTagName("select");
		var duplicateSelectBtns = new Array();
		var l = selectbuttons.length;
		
		var DuplicateSelectValue = function(selectElm) {
			var t, change;
			t = this;
			t.select = typeof selectElm === "string" ? document.getElementById(selectElm) : selectElm;
			t.txtContainer = (function(selectElm, elementType) {
				var select, parent, elm;
				select = selectElm;
				parent = select.parentNode;
				elm = document.createElement("p");
				elm.setAttribute("class", "pseudo-selectbox");
				select.style.filter = "alpha(opacity=0)";
				select.style.opacity = 0;
				parent.insertBefore(elm, select);
				return elm;
			})(t.select);
			
			t.txtNode = document.createTextNode("");
			t.txtNode.nodeValue = t.select.value;
			t.txtContainer.appendChild(t.txtNode);
			
			change = function(e) {
				t.txtNode.nodeValue = e.target.value;
			}
			
			if (t.select.addEventListener) {
				t.select.addEventListener("change", change, false);
				
			} else if (t.select.attachEvent) {
				t.select.attachEvent("onchange", change);
			} else {
				t.select.onchange = change;
			}
			return t.txtContainer;
		}
		
		for (var i = 0; i < l; i++) {
			duplicateSelectBtns[i] = new DuplicateSelectValue(selectbuttons[i].getAttribute("id"));
		}
		
		
		
		// Modal window
		$('a[rel*=leanModal]').leanModal({
			top : 300,
			overlay : 0.7,
			closeButton: ".modal-close"
		});
		
		$('a[rel*=leanModal]').click(function() {
			var inner = $("#reserve-box li .pseudo-selectbox");
			var len = inner.length;
			var w = new Array();
			
			for (var i = 0; i < len ; i++) {
				w[i] = inner.eq(i).outerWidth();
				$("#reserve-box li select").eq(i).css("width", w[i] + "px");
			}
		});
		
	})();
	
	
	
	$(window).load(function() {
		
		if (history.pushState) {
			
			imageIndicator = new Indicator("indW", IndImgW.src, "#images");
			imageIndicator.init();
			
			contentIndicator = new Indicator("indK", IndImgK.src, "#wrapper", "#pjax-container");
			contentIndicator.init();
			
			document.getElementById(pjaxContainer).addEventListener(transitionEnd, function(e) {
				if (e.propertyName === "opacity" && parseInt($(this).css("opacity")) === 0) {
					contentIndicator.show();
					onloadStart();
				}
			}, false);
			
			$("#global-footer a, a[target!='_blank']").not("#gnav-lang a, a[href*='#'], a.no-pjax").click(onClickHandler);
			GAS_PJAX.init(pjaxContainer, pjaxContents, onloadComplete, onReady, onloadAjaxContent, onPopstate, onCancel);
		}
		
		$("a[href*='/en/']").click(pageFadeOut);
		
		replaceSideImages = new ReplaceSideImages(t, p);
		
		imageScroller = new ImageScroller(p, c, [wd, kd]);
		imageScroller.init();
		imageScroller.start();
		
		if (UA.device === "other") {
			
			contentScroller = new ContentScroller([wd, kd]);
			contentScroller.start();
			
			$(window).scroll(function(e) {
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
				e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
				return false;
			});
			
			$("#wrapper").mousewheel(function(e, delta, dx, dy) {
				d = delta;
				if (UA.os === "mac") d = delta * 10;
				
				contentScroller.onMouseWheel(wd, d);
				imageScroller.onMouseWheel(wd, d);
				
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
				e.stopPropagation();
				return false;
			});
			
			var shiftkeyDown = false;
			
			document.onkeyup = null;
			document.onkeyup = function(e) {
				var k = e ? e.keyCode : e.which;
				// Shift key
				if (k === 16) {
					shiftkeyDown = false;
				}
			}
			
			document.onkeydown = null;
			document.onkeydown = function(e) {
				var cy = contentScroller.y();
				var h = document.getElementById("header-wrapper");
				var k = e ? e.keyCode : e.which
				var y;
				
				// Shift key
				if (k === 16) {
					shiftkeyDown = true;
					return false;
				}
				
				// Space key & Other navigation keys
				if (k >= 32 && k <= 36) {
					// Page-up key & Space + Shift key
					if (k === 33 || k === 32 & shiftkeyDown) {
						f = "show";
						y = cy - $(window).height() + $(h).height();
						
					// Page-down key & Space key
					} else if (k === 34 || k === 32) {
						f = "hide";
						y = cy + $(window).height() - $(h).height();
						
					// End key
					} else if (k === 35) { 
						f = "hide";
						y = $(document).height();
						
					// Home key
					} else if (k === 36) {
						f = "show";
						y = -1;
					}
					if (y === 0) y = -1;
					h.setAttribute("class", f);
					contentScroller.y(y);
					imageScroller.y(y);
					return false;
					
				// Cursor control (arrow) keys
				} else if (k >= 37 && k <= 40) {
					// Up arrow key
					if (k === 38) {
						y = 1;
						
					// Down arrow key
					} else if (k === 40) {
						y = -1;
					}
					contentScroller.onMouseWheel(kd, y);
					imageScroller.onMouseWheel(kd, y);
					return false;
				}
			}
			
		} else {
			document.getElementsByTagName("body")[0].setAttribute("class", "multi-touch-device");
		}
		
		if (document.getElementById("catch")) {
			var def = $("#catch").css("-moz-transition");
			$("#catch").css({
				webkitTransition: "none",
				transition: "none",
			})
			$("#catch").css("opacity", 0).delay(1000).animate({opacity: 1}, 2000, function(){
				$("#catch").css({
					webkitTransition: "none",
					transition: "none",
				})
			});
		}
		onResize();
	});
	
	onResize();
	$(window).resize(onResize);
	currentPageHighlight("#gnav-main", 1);
	currentPageHighlight("#gnav-main ul", 2);
});