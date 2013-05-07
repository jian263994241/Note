## 提交修改到服务器
提交修改是一个比较重要的步骤，所有的修改只有提交了才能被别人看到和同步，对于团队化的工作非常的有用。

****************************************

### 提交本地的分支修改内容到对应的服务器分支
用*git push*进行代码的提交，常用的命令格式是*git push server_name local_branch_name:server_branch_name*，先来看下面的例子

    user@APCNSHALB7004 /c/Michael/project/leewind-project-note (master)
    $ git push origin master:master
    Enter passphrase for key '/c/Users/Danny/.ssh/id_rsa':
    Counting objects: 40, done.
    Delta compression using up to 2 threads.
    Compressing objects: 100% (32/32), done.
    Writing objects: 100% (35/35), 6.69 KiB, done.
    Total 35 (delta 11), reused 0 (delta 0)
    To git@lbsvn01.hk.leoburnett.com:leewind/leewind-project-note.git
       59fe8a4..7d49d56  master -> master

这里的内容比较多一些。这里的server name是origin，我们第一次clone的时候会自动把当时的server定义为origin，如果我们要自己添加server的记录进来需要用*git remote add*的命令。比如说这里我需要添加一个server name叫gitcafe

    user@APCNSHALB7004 /c/Michael/project/leewind-project-note (master)
    $ git remote add gitcafe git@gitcafe.com:leewind/leewind-project-note.git

这时候我们用*git branch -a*可以看到

    user@APCNSHALB7004 /c/Michael/project/leewind-project-note (master)
    $ git branch -a
    * master
      remotes/gitcafe/master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master

我们有两个服务端，一个是origin，一个是gitcafe，然后默认的是origin/master

### 在服务端创建分支
这里我想在服务器端创建一个dev的branch，很简单还是用push的方法，如果没有对应的服务器分支，她会自己创建的。

    user@APCNSHALB7004 /c/Michael/project/leewind-project-note (master)
    $ git push gitcafe master:dev
    Enter passphrase for key '/c/Users/Danny/.ssh/id_rsa':
    Total 0 (delta 0), reused 0 (delta 0)
    To git@gitcafe.com:leewind/leewind-project-note.git
     * [new branch]      master -> dev

    user@APCNSHALB7004 /c/Michael/project/leewind-project-note (master)
    $ git branch -a
    * master
      remotes/gitcafe/dev
      remotes/gitcafe/master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master

### 删除服务端分支
以前我常常搞错提交，然后每次都被老板骂，后来我就学会了这个删除分支的方法。偷偷告诉你，别人我不告诉他

比如说在服务端，我有两个分支dev和master，想删除dev分支怎么办？很简单把空的分支提交给要删除的分支

    user@APCNSHALB7004 /c/Michael/project/leewind-project-note (master)
    $ git push gitcafe :dev
    Enter passphrase for key '/c/Users/Danny/.ssh/id_rsa':
    To git@gitcafe.com:leewind/leewind-project-note.git
     - [deleted]         dev

    user@APCNSHALB7004 /c/Michael/project/leewind-project-note (master)
    $ git branch -a
    * master
      remotes/gitcafe/master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master