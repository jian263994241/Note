###创建文件

mkdir +文件夹名字

touch +文件名字

rm -fr 删除文件

###更改文件权限

chmod 

	你可以在linux终端先输入ls -al,可以看到如:
	   -rwx-r--r-- (一共10个参数)
	第一个跟参数跟chmod无关,先不管.
	2-4参数:属于user
	5-7参数:属于group
	8-10参数:属于others
	接下来就简单了:r==>可读 w==>可写 x==>可执行搜索
	               r=4      w=2      x=1