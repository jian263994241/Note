define(function(require,exports,module){
    require('snowfall');

    function flower(){
        var flower_path = '/Public/Asserts/images/flower/';
        $('#snowContainer').snowfall({image :[flower_path+"bloomsom2.png",flower_path+"bloomsom3.png",flower_path+"bloomsom4.png",flower_path+"bloomsom5.png",flower_path+"bloomsom6.png",flower_path+"bloomsom7.png",flower_path+"bloomsom8.png"], minSize: 60, maxSize:120, flakeCount:20});
    }
    flower();
    exports = flower;
});
