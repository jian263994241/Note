>forever是管理Node.js程序后台运行的工具，相信学习Node.js的同学都知道forever了。在命令行终端中用forever管理Node.js很简单，但在线上服务器中使forever开机后自动启动程序就有些难度了，起码官方文档没有相关说明。

其实我以前做过类似尝试：centos系统启动后，让forever自动运行，并写了一篇文章记录《阿里云主机Nginx下配置NodeJS、Express和Forever》。我确信当时是成功的，但今天我照样操作却失败了，服务器重启后jsGen就是没跑起来。直到现在，终于解决，先贴上脚本：

	#!/bin/bash
	# chkconfig: 345 88 08
	# description: Forever for Node.js

	DEAMON=/var/www/nodejs/gpc/src/app.js
	LOG=/var/www/nodejs/mylogs/forever.log
	PID=/root/.forever/pids/forever.pid
	
	export PATH=$PATH:/usr/local/node/v0.10.21/bin
	export NODE_PATH=$NODE_PATH:/usr/local/node/v0.10.21/bin/node_modules
	
	node=node
	forever=forever
	
	case "$1" in
	    start)
	        $forever start -l $LOG --pidFile $PID -a $DEAMON
	        ;;
	    stop)
	        $forever stop --pidFile $PID $DEAMON
	        ;;
	    stopall)
	        $forever stopall --pidFile $PID
	        ;;
	    restartall)
	        $forever restartall --pidFile $PID
	        ;;
	    reload|restart)
	        $forever restart -l $LOG --pidFile $PID -a $DEAMON
	        ;;
	    list)
	        $forever list
	        ;;
	    *)
	        echo "Usage: /etc.init.d/node {start|stop|restart|reload|stopall|restartall|list}"
	        exit 1
	        ;;
	esac

这个脚本就是jsGen目录下的forever文件，脚本中的相关路径是AngularJS中文社区服务器软件路径。

启用该脚本的命令如下（假设已经git clone jsGen）：

	cd jsgen
	cp forever /etc/init.d/forever
	chmod 755 /etc/init.d/forever
	chkconfig --add forever

	chkconfig forever on

reboot服务器试试，jsGen终于自动跑起来了。为什么以前可以的方法现在不行了呢？我也不太清楚。。。这次出问题的关键是：centos系统启动后自动运行该脚本时大概没有找到forever命令，所以上面脚本中最关键的地方是：

	export PATH=$PATH:/usr/bin/node/bin
	forever=forever
然后脚本中运行的是$forever。centos系统就这样解决了。