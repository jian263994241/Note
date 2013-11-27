###3).配置NODE_HOME 

	vi /etc/profile 

　　#在export PATH USER 。。。一行的上面添加如下内容，并将NODE_HOME/bin设置到系统path中 

	#set for nodejs 
	export NODE_HOME=/usr/local/node
	export PATH=$NODE_HOME/bin:$PATH 

####保存退出后执行如下命令，使刚才的配置生效 

	source /etc/profile
###执行node -h命令验证设置成功