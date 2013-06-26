({
    appDir: "../",
    baseUrl: "./scripts",
    dir: "../../pack-build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "none",

    paths: {
        "jquery": "libs/jquery.min",
        "text":"libs/require-text.min",
        'backbone':'libs/backbone.min',
        'underscore':'libs/underscore.min',
        'doT':'libs/doT.min',
        //utils
        'carouFredSel':'utils/jquery.carouFredSel.min',
        //url-q
        'libs':'libs',
        'utils':'utils',
        'css':'../public/css',
        'tpl':'../public/tpl/index'
    },
    deps:['jquery','underscore','backbone','doT'],
    modules: [
        //Optimize the application files. jQuery is not 
        //included since it is already in require-jquery.js
        {
            name: "main"
        }
    ],
    packages: [ "demo1" ]
})
