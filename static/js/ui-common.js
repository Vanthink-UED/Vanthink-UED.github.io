/** 
**  2014-5-18 @Jack Pu  UI Common Lib
**/

function getTopLeftOfElement(element) {
    var top = 0;
    var left = 0;
    do {
      top += element.offsetTop;
      left += element.offsetLeft;
    } while(element = element.offsetParent);
    return {left: left, top: top};
}

function changePic(){
    var picArray = ["bg01.jpg","bg02.jpg","bg03.jpg","bg05.png","bg-alpha.png"];
    var img = document.getElementById("background");
    var url = "../img/" + picArray[parseInt(Math.random() * 5)];
    console.log(url);
    if(img){
      img.src = url; 
      img.onload = function(){
        render();
      }
    }else{
      $("#container2").css("background-image","url(" + url + ")");
    }
}
function reset() {
  window.top.location.reload(); 
}

$(document).ready(function(){
  Page.initSetVal();
   $("#container2").click(function(e){
      var offset = getTopLeftOfElement(this);
      if(top.location.href.indexOf("canvas") > -1){
         defaultOptions.coor.x = (e.pageX - offset.left).toFixed(3);
         defaultOptions.coor.y = (e.pageY  - offset.top).toFixed(3);
      }else{
         defaultOptions.coor.x = (((e.pageX - offset.left)  - 255) / 255 * 1.5).toFixed(3);
         defaultOptions.coor.y = (((255 - (e.pageY  - offset.top)) / 255 * 1.5)).toFixed(3);
      }
      $("#coor-x").val(defaultOptions.coor.x);
      $("#coor-y").val(defaultOptions.coor.y);  
      
  });

  $("#start").click(function(){
   		Page.init();
  }); 
});