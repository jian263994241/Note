define(function(require){

    var IndexView = Backbone.View.extend({
        el:'body',
        template:'',
        initialize:function(){
            this.template = require('text!v/layout.html');
        },
        render:function(model){
            this.$el.append(this.template);

        }
    });



    var App = new IndexView;
    App.render();

//    var progress = require('m/progress-user');
//    progress.complete = function(){
//        App.render();
//        $('#hello').fadeOut();
//    };
//    progress.demo();
});