
require(['config/config'],function(conf){
    conf['packages'] = ['controllers/demo1'];
    conf['callback'] = function(){
        require(['c/a']);
    };
    requirejs.config(conf);
});
