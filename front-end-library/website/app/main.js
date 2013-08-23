
require(['config/config'],function(conf){
    conf['packages'] = ['controllers/demo1'];
    conf['callback'] = function(){
        require(['c/main']);
    };
    requirejs.config(conf);
});
