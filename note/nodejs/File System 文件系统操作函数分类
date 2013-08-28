#nodejs File System 文件系统操作函数分类
----
文件系统操作相关的函数挺多的。首先可以分为两大类。

一类是异步+回调的。 一类是同步的。

在这里只对异步的进行整理，同步的只需要在函数名称后面加上Sync即可

1. 首先是一类最常规的读写函数，函数名称和形式，应该是起源于C语言的。


		fs.open(文件路径,读写标识,[文件mode值,666],回调函数(err,文件句柄fd));          
		fs.read(文件句柄fd,被写入的buffer,offset,length,position,回调函数(err, bytesRead, buffer));          
		fs.write(文件句柄fd,被读取的buffer,offset,length,position,回调函数(err,bytesWritten,buffer));          
		fs.close(文件句柄,回调函数)          
		fs.truncate(文件句柄,截断长度,回调函数);          
		fs.fsync(文件句柄,回调函数);

2. 直接对文件进行读写的，用起来比较方便。


		fs.readFile(文件名,编码,回调函数(err,data));       
		fs.writeFile(文件名,数据,编码,回调函数(err));       
		fs.appendFile(文件名,数据,编码,回调函数(err));

3. 其它常用文件操作


		判断文件是否存在      
		fs.exists(文件路径,callback(是否存在));      
		重命名      
		fs.rename(旧文件名,新文件名,回调函数);      
		文件所有者变更      
		fs.chown(文件名,uid,gid,回调函数);
		fs.fchown(文件句柄fd,uid,gid,回调函数);
		fs.lchown(链接路径,uid,gid,回调函数);      
		文件权限变更      
		fs.chmod(文件名,mode,回调函数);
		fs.fchmod(文件句柄,mode,回调函数);
		fs.lchmod(链接路径,mode,回调函数);      
		文件信息      
		fs.stat(文件路径,回调函数(err.fs.Stats对象));
		fs.fstat(文件句柄fd,回调函数(err.fs.Stats对象));
		fs.lstat(链接路径，回调函数(err.fs.Stats对象));      
		文件时间      
		fs.utimes(文件路径,访问时间,新建时间,回调函数);
		fs.futimes(文件句柄,访问时间,新建时间,回调函数);      
		监视文件      
		fs.watchFile(文件名,[options],listener_callback(当前文件的stats,改变前的stats));      
		fs.unwatchFile(文件名);
4. 目录操作

		fs.mkdir(路径,权限mode/777,回调函数);    
		fs.rmdir(路径,回调函数);    
		fs.readdir(路径,回调函数(err,fileNameArray));
5. 链接文件操作

		创建一个链接   
		fs.link(srcpath, dstpath, [callback])   
		fs.symlink(destination, path, [type], [callback])   
		读取链接指向的路径   
		fs.readlink(path, [callback(err,linkstr)])   
fs.unlink(path,[callback]);
