## 简单的开始
这几篇的git的教程是公司内容用来帮助刚刚使用git的同学们能快速的进行学习进而应用在自己的项目中。很简单的内容，木有高深的东西，(因为本身我自己的水平也不咋的)。

*********************************


### 推荐Tutorial
如果你的英文阅读OK的话，推荐一篇文章[Top 10 Git Tutorials for Begineers](http://sixrevisions.com/resources/git-tutorials-beginners/)，里面列举了10个最好的Git教程
，有几篇个人很推荐。

然后github有一个官方的类似任务游戏的[教程](http://try.github.com/levels/1/challenges/1)，你也可以试试看，很有意思！

我个人最喜欢的一个[中文入门教程](http://rogerdudler.github.com/git-guide/index.zh.html)，你可以看到好多人评论是 **牛B** ，确实牛B。推荐！

*********************************

### git客户端的安装
在Linux和Mac设备上面，大部分的系统都默认安装了Git，所以这里不列举如何在Linux环境下安装Git。Git在Linux下的安装可以直接使用想apt-get、yum这样的安装工具直接安装。

团队里开发大部分都是在Window上进行的，所以我们这里着重讲讲怎么在window下面配置Git。

在window环境下面，git软件，我个人非常推荐**msysgit**，我是个google fans，而这个是伟大的google团队开发的一款产品。这里是现在的官方网址：[msysgit](http://msysgit.github.com/)

安装很简单，step by step就好了，有一点要注意的是，我建议在安装时选择bash，个人不是很建议使用可视化的工具，真的是打命令习惯了~~

*********************************

### 创建本地仓库

好了，开始吧！让我们来创建一个本地目录

###  Step 1: 创建仓库文件夹

我们需要为仓库建立一个文件夹，所有的仓库文件和git记录都会保存在这个文件夹里面。打开git bash，用mkdir命令建立文件夹

    user@APCNSHALB7004 /c/Michael/test
    $ mkdir tutorial

###  Step 2: 创建Git项目仓库

进入刚刚创建的目录，用git init创建git项目仓库

    user@APCNSHALB7004 /c/Michael/test
    $ cd tutorial/

    user@APCNSHALB7004 /c/Michael/test/tutorial
    $ git init
    Initialized empty Git repository in c:/Michael/test/tutorial/.git/

这时候可以看到，bash已经提示创建了一个空的git仓库，这个时候你会在目录里面看到一个.git的文件夹

    user@APCNSHALB7004 /c/Michael/test/tutorial (master)
    $ ls -a
    .  ..  .git

对了，这个目录就是存放git修改记录的。git和svn最大的区别就是元存储，她是对每个修改点进行保存，而svn是对每个修改的文件进行保存，所以git需要的存储量远小于svn。
