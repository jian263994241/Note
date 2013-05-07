## 创建以及切换分支
我的看法中，git最显著的有点就是他的版本分支(branch)和代码合并(merge)功能。版本分支允许你把release版本和development版本进行区分管理，同时辅助tag作为release标记，对正式版和开发版的管理和切换都非常的容易。而不得不提的是Merge功能，git存储的方式是元存储，她把没一个修改点都保留下来进行保存。当你需要把自己的修改和别人的修改进行合并的时候，使用merge命令，git会比较父节点之后所有的修改，标示出冲突的地方，自动合并没有发生冲突的地方。这里的冲突指的是，修改双方都对同一地方的代码进行了改动。

************************************************

在我们init一个项目之后，会自动创建一个master的分支，这是项目的主分支，一般来说，我们都会建立一个dev的分支作为代码的开发，当代码开发测试完毕要进行发布了，我们在用master的分支去合并dev的分支。

来看看是如何操作分支

### 查看分支
命令*git branch*可以查看本地分支，比如说我们查看express.js的开源代码中的branch

    user@APCNSHALB7004 /c/Michael/source/express (master)
    $ git branch
    * master

我在工作中比较常用的是*git branch -a*，可以查看本地及同步服务器端所有branch

    user@APCNSHALB7004 /c/Michael/source/express (master)
    $ git branch -a
    * master
      remotes/origin/1.x
      remotes/origin/2.x
      remotes/origin/HEAD -> origin/master
      remotes/origin/feature/render-etags
      remotes/origin/feature/send-etag
      remotes/origin/manpage
      remotes/origin/master
      remotes/origin/routes-as-middleware
      remotes/origin/view-lookup

在上面的例子中*remotes/origin*代表的是远端服务器origin仓库

### 创建本地分支
讲创建本地分支之前，讲讲*git checkout*命令。比如说本地有两个分支master和dev，我现在正在dev分支上进行开发，现在我想切换到master分支上去进行开发。那么就用*git checkout*来做

    user@APCNSHALB7004 /c/Michael/source/express (dev)
    $ git checkout master
    Switched to branch 'master'

    user@APCNSHALB7004 /c/Michael/source/express (master)
    $

注意到右边的(master)，她标示现在所处的分支名称。显然，我们已经切换回master分支了
    
使用*git checkout -b branch_name*的方法来创建新的分支，并且切换到新的分支上面来。比如说我现在在master目录上，想创建dev目录，那我就要这么做：

    user@APCNSHALB7004 /c/Michael/source/express (master)
    $ git checkout -b dev
    Switched to a new branch 'dev'

    user@APCNSHALB7004 /c/Michael/source/express (dev)
    $ git branch
    * dev
      master

现在我已经创建并且切换到dev分支上来了。当我们创建一个新的分支时，其实是把当前所在分支进行clone。比如这里，此时master和dev分支是相同的。

### 删除分支
既然可以创建本地分支就一定可以删除，用*git branch -D branch_name*来进行删除

    user@APCNSHALB7004 /c/Michael/source/express (master)
    $ git branch -D dev
    Deleted branch dev (was bb29da5).

    user@APCNSHALB7004 /c/Michael/source/express (master)
    $ git branch -a
    * master
      remotes/origin/1.x
      remotes/origin/2.x
      remotes/origin/HEAD -> origin/master
      remotes/origin/feature/render-etags
      remotes/origin/feature/send-etag
      remotes/origin/manpage
      remotes/origin/master
      remotes/origin/routes-as-middleware
      remotes/origin/view-lookup

这里要注意，比如说你想删除dev分支，那么你首先要切换到其他分支，比如master才能进行分支删除命令。