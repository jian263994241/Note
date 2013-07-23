
require(['config/config'],function(conf){
    conf['packages'] = ['controllers/demo1'];
    conf['callback'] = function(){
        require(['controllers/demo1']);
    };
    requirejs.config(conf);
});
