
function addLegendToPage(groups){
    for(var k in groups){
        var html = [];
        for(var i = 0; i < groups[k].length; i++){
            html.push("<li><strong>" + groups[k][i]['position'] + ".</strong> " + groups[k][i]['clue'] + "</li>");
        }
        document.getElementById(k).innerHTML = html.join("\n");
    }
}
var Page = (function(){
    var wordData = [];
    
    var limitWordNum = 10;
    
    return {
        init: function() {
            this.bind();
        },
        
        bind: function() {
            var me = this; 
            $('.btn-get-word').on('click',function() {
                $('.loading-mask').show();
                var limitWordNum = $('.js-max-number').val() || 10;
                var limitWordLength = $('.js-max-number').val() || 19;
                var url = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength='+ limitWordLength  +'&limit=' + limitWordNum + '&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
                $.getJSON(url,function(data){
                    wordData = [];
                    $('.loading-mask').hide();
                    me.setWordData(data)
                })
            });
            
            $('.btn-gen-cw').on('click',function() {
                me.generateWordCross();
            })
        },
        
        setWordData: function(data) {
            
            data.forEach(function(item){
                if(!/[\s\-\.]+/.test(item['word']) && item['word'].length<=10){
                 wordData.push(item['word'].toLowerCase());
                }
            })
            
            $('.js-word-list').val(wordData.join('\n'));
        },
        
        generateWordCross: function() {
            var wordData = $('.js-word-list').val().split('\n');
            if(wordData.length==0){
                return alert('请输入单词一行一个');
            }
            var words = ["dog", "cat", "bat", "elephant", "kangaroo"];
            var clues = ["Man's best friend", "Likes to chase mice", "Flying mammal", "Has a trunk", "Large marsupial"];
            
            // Create crossword object with the words and clues
            var cw = new Crossword(wordData, wordData);

            // create the crossword grid (try to make it have a 1:1 width to height ratio in 10 tries)
            var tries = 100;
            var grid = cw.getSquareGrid(tries);
            
            // report a problem with the words in the crossword
            if(grid == null){
                var bad_words = cw.getBadWords();
                var str = [];
                for(var i = 0; i < bad_words.length; i++){
                    str.push(bad_words[i].word);
                }
                alert("Shoot! A grid could not be created with these words:\n" + str.join("\n"));
                return;
            }

            // turn the crossword grid into HTML
            var show_answers = true;
            document.getElementById("crossword").innerHTML = CrosswordUtils.toHtml(grid, show_answers);

            // make a nice legend for the clues
            var legend = cw.getLegend(grid);
            //addLegendToPage(legend);   
        
        }
    }
}());

$(function() {
    Page.init();   
   
    
});