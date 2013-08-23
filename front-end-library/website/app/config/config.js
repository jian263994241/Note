define(function(){

    return {
        baseUrl:'./app/',
        paths: {
            //core
            'text':'core/require-text.min',
            'backbone':'core/backbone.min',
            'underscore':'core/underscore.min',
            'jquery':'core/jquery.min',
            'doT':'core/doT.min',
            //url-q
            'helper':'helper',
            'v':'view',
            'c':'controller',
            'm':'model'
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
        deps:['jquery','underscore','backbone','doT'],
        urlArgs: "" +  (new Date()).getTime()
    };
});