//config
requirejs.config({
    baseUrl:'./scripts',
    paths: {
        //libs
        'text':'libs/require-text.min',
        'backbone':'libs/backbone.min',
        'underscore':'libs/underscore.min',
        'jquery':'libs/jquery.min',
        'doT':'libs/doT.min',
        //utils
        'carouFredSel':'utils/jquery.carouFredSel.min',
        //url-q
        'libs':'libs',
        'utils':'utils',
        'css':'../public/css',
        'tpl':'../public/tpl/index'
    },
    shim:{
        'backbone':{
            deps: ['jquery'],
            exports: 'Backbone'
        }
    },
    plugins:{
        text:{
            env: 'rhino',
            useXhr:function(url, protocol, hostname, port){
            }
        }
    },
    urlArgs: "" +  (new Date()).getTime(),

    deps:['jquery','underscore','backbone','doT'],
    callback:requireCallback,
    packages:['demo1']
});

function requireCallback(){
    require(['demo1']);
}

