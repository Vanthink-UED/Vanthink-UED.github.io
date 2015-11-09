
$(function () {




    var contains = $(".screen-item");
   
    var list = [];
    var tabs = $(".tabs li");
    var list = [];
    contains.each(function(i) {
      list.push({
        Tab: $(tabs[i]),
        Content: $(this)
      });
    });

    H.Scroll.Init($("#page"), list);

    var animateEnd = false;
      $(".screen-first .anim-2").fadeIn(500,function(){
       $(".screen-first .anim-3").animate({"margin-left":"-750px","bottom":"0", "opacity":"show"},350);
       $(".screen-first .anim-4").animate({"margin-left":"-120px","top":"-30" ,"opacity":"show"},350,function(){
         $(".screen-first .anim-1").fadeIn(350);
       }); 
      });

    var h =$("body").height();

    $("#page").scroll(function(){
    if(animateEnd ){
      return;
    }
    var sTop;
    var el = $("#page")[0];
    if (el.scrollTop == 0 || document.documentElement.scrollTop == 0) {
        sTop = el.scrollTop + document.documentElement.scrollTop;
    } else {
        sTop = el.scrollTop;
    }
    if(sTop >= h ){
      $(".ani-phone-one").stop(true,true);
      $(".ani-type-one").stop(true,true);
    }
    if(sTop > 2*h ){
      $(".ani-phone-two").stop(true,true);
      $(".ani-voice-two").stop(true,true);
      $(".ani-type-two").stop(true,true);
    }
    if(sTop > 3*h ){
      $(".ani-hand-three").stop(true,true);
      $(".ani-bg-three").stop(true,true);
      $(".ani-type-three").stop(true,true);
    }
    
    if(sTop >= h && sTop < 2*h){
      console.log(h);
      $(".screen-second .anim-3").animate({"top":"80px", "opacity":"show"},350,function(){
        $(".screen-second .anim-4").animate({"top":"-45px", "opacity":"show"},450, function(){
          $(".screen-second .anim-7").animate({"top":"230px", "opacity":"show"},350);
          $(".screen-second .anim-6").animate({"top":"80px", "opacity":"show"},350);
        }); 
         $(".screen-second .anim-5").animate({"top":"145px", "opacity":"show"},450);
         $(".screen-second .anim-8").animate({"top":"210px", "opacity":"show"},450);
      });
      
    }else if(sTop >= 3*h && sTop < 4*h ){
      $(".ani-land-four").animate({"top":"51px","opacity":"show"},450);
      $(".ani-rocket-four").animate({"top":"116px","opacity":"show"},450,function(){
        $(".ani-type-four").animate({"margin-right":"30px","opacity":"show"},250);
      });

    }
  });
    


      

});











 
