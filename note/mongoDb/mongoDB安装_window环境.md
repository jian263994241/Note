#Mongo Db 安装

选择版本下载 

	C:\mongodb-win32-i386-[version] 
	Or ;
	C:\mongodb-win32-x86_64-[version]

开始安装 解压后 移动安装文件到 指定目录
	
	cd \
	move C:\mongodb-win32-* C:\mongodb

数据存放目录  `D:\test\mongodb`
	
	md data
	md data\db

>Note You may specify an alternate path for `\data\db` with the dbpath setting for mongod.exe, as in the following example:
`C:\mongodb\bin\mongod.exe --dbpath d:\test\mongodb\data`
If your path includes spaces, enclose the entire path in double quotations, for example:
`C:\mongodb\bin\mongod.exe --dbpath "d:\test\mongo db data"`

MongoDB 启动程序

	C:\mongodb\bin\mongod.exe

##注册windows服务

###系统配置
1.Create a specific directory for MongoDB log files:

	md C:\mongodb\log
	
2.Create a configuration file for the logpath option for MongoDB in the Command Prompt by issuing this command:
	
	echo logpath=C:\mongodb\log\mongo.log > C:\mongodb\mongod.cfg
	
###注册服务
	
1.注册 MongoDB service
	
	C:\mongodb\bin\mongod.exe --config C:\mongodb\mongod.cfg --install

2.启动 MongoDB service
	
	net start MongoDB
	
3.停止 MongoDB service

	net stop MongoDB

4.移除 MongoDB service

	C:\mongodb\bin\mongod.exe --remove