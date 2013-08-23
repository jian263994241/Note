define(['jquery','helper/progress'],function($){
    return {
        demo:function(){
            _this = this;
            $('#progress_bar .ui-progress .ui-label').hide();
            // Set initial value
            $('#progress_bar .ui-progress').css('width', '3%');

            // Simulate some progress
            $('#progress_bar .ui-progress').animateProgress(43, function() {
                $(this).animateProgress(79, function() {
                    setTimeout(function() {
                        $('#progress_bar .ui-progress').animateProgress(100, function() {
                            _this.complete();
                        });
                    }, 2000);
                });
            });
        },
        complete:function(){}
    }
})