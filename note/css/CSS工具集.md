#CSS 工具集

##
 `CSS 的预处理器`

### LESS

>
>**什么是LESSCSS**
>LESSCSS是一种动态样式语言，属于CSS预处理语言的一种，它使用类似CSS的语法，为CSS的赋予了动态语言的特性，如变量、继承、运算、函数等，更方便CSS的编写和维护。
>LESSCSS可以在多种语言、环境中使用，包括浏览器端、桌面客户端、服务端。
> [DOCS](http://www.lesscss.net/article/home.html)

	#编译环境 javascript (前后端都可以,非常方便) 
	####
	#浏览器直接编译仅支持HTML5浏览器
	script:src > less.js
 	
	#手动编译  
	$ npm install lessc
	>lessc yourstyle.less ../css/outstyle.css -x
	
	#配合nodejs
	#dependencies "less-middleware": "*"
	var app = express();
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	

###Sylus 
>一款 CSS 的预处理器

>[DOCS](http://learnboost.github.io/stylus/)
	
	编译环境 nodejs
	
	#dependencies 'stylus':'*'
	
	$ npm install stylus
	### #1
	var css = require("stylus"), 
    str = require("fs").readFileSync("stylus.css", "utf8");
	
	css.render(str, { filename: "stylus.styl" }, function(err, css) {
	    if (err) throw err;
	    var http = require('http');
	    http.createServer(function (req, res) {
	        res.writeHead(200, {'Content-Type': 'text/css'});
	        res.end(css);
	    }).listen(1337, '127.0.0.1');
	    console.log('已经启动 http://127.0.0.1:1337/');
	});
	
	### #2
	var app = express();
	app.use(require('stylus').middleware(__dirname + '/public'));
	

###Sass
>编译环境 Ruby
>
>Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承等等特性。Sass 生成良好格式化的 CSS 代码，易于组织和维护。

>[DOCS](http://sass-lang.com/)