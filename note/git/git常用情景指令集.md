<meta name="description" content="提供了简单的git指令 应对不同工作情景">
<meta name="keywords" content="git,git pull,git push,git merge">



*********************************

### 代码修改提交

    // 添加所有修改文件
    git add .

    // or
    // 我一般都是常用git add .把所有修改文件都加进来，但是有时候不是所有的修改文件我都需要添加的！可能只有特定的文件需要添加修改
    git add path/to/file // 指定需要添加的文件

    // git add完了之后代码就进入了缓存区，要对它做commit
    git commit -m "log"

    // 完成了之后提交代码到Server
    git push origin local_branch:server_branch

这里我非常非常推荐2点：

1. 每次的修改少一点，提交修改或者commit频繁一点，这样即使出错了，代码回滚的幅度就会小，找到问题的速度就会快！
2. commit之后要添加log，这个log不要随便写，写清楚你这次提交干了什么事情，和你一起工作的人一看log马上就能明白了！支持中文输入！

*********************************

### 删除和添加服务器端分支

    //添加分支很简单，直接push一个本地的branch到server，server会自动创建一个新的branch，或者你在提交时可以指定要服务器端要创建的branch名称
    git push origin local_branch:server_branch  //这里origin指的是远端服务器的名称

    //删除分支，它的思想就是将本地的一个空分支传上去，清掉服务器上的一个分支
    git push origin :server_branch

*********************************

### 同步代码
基于小组开发，同步代码是非常重要的工作！切记，每次提交之前先做同步代码的工作

    //从origin服务器server_branch同步代码到本地local_branch
    git pull origin local_branch:server_branch

*********************************

### 合并代码
尽管说可以在Server上进行代码的合并，但是非常非常不推荐，这样容易出现冲突，在服务器端去修改就不方便了。推荐在本地做。

    git merge branch_name

我说一下一般的做法：我们会在本地创建两个branch，一个是master，一个是dev。master分支上的代码是用来和服务器同步的。dev分支上的代码则是用来进行修改和开发的。

每次在dev分支开发完了，准备上传代码了需要有这样的步骤

1. 在dev分支上面做git add和commit指令
2. 切换到master分支上，这时候要清楚服务器端其他的开发同志可能已经提交了代码，我们需要做代码同步，做git pull
3. 合并你的修改到master分支上去，用git merge命令
4. 如果有冲突处理冲突，没有冲突，提交代码，git push

*********************************