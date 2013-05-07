## git工作流
你的本地仓库由 git 维护的三棵“树”组成。

第一个是你的 工作目录，它持有实际文件；

第二个是 缓存区（Index），它像个缓存区域，临时保存你的改动；

最后是 HEAD，指向你最近一次提交后的结果。

![git working tree](http://rogerdudler.github.com/git-guide/img/trees.png)

这里的叙述和图片摘录自[http://rogerdudler.github.com/git-guide/index.zh.html](http://rogerdudler.github.com/git-guide/index.zh.html)

这里的意思就是说，你在工作目录中对文件进行编辑，这些改动只存在在工作目录。当你用git add命令之后，你可以把文件添加到缓存区。缓存区和工作目录的修改都不是真正意义上被保存，用git reset可以直接清除掉所有的修改。所以需要用commit将修改打包提交到HEAD里。这就是一次完整修改的过程。

***************************

基于上面的介绍，我们来做修改添加，这一章涉及到的命令比较多。

### Step 1: 修改文件
进入我们在教程1中创建的仓库，然后添加一个文件。比如说我们在这里添加一个README.md的文件，添加完之后，用 *git status* 可以查看工作区的修改

    user@APCNSHALB7004 /c/Michael/test/tutorial (master)
    $ git status
    # On branch master
    #
    # Initial commit
    #
    # Untracked files:
    #   (use "git add <file>..." to include in what will be committed)
    #
    #       README.md
    nothing added to commit but untracked files present (use "git add" to track)

在这里可以看到README.md的文件被修改过了，但是修改的文件仍然停留在工作区

### Step 2: 添加文件
现在需要把工作区修改的文件添加到缓存区，使用 *git add* 命令

    user@APCNSHALB7004 /c/Michael/test/tutorial (master)
    $ git add README.md

    user@APCNSHALB7004 /c/Michael/test/tutorial (master)
    $ git status
    # On branch master
    #
    # Initial commit
    #
    # Changes to be committed:
    #   (use "git rm --cached <file>..." to unstage)
    #
    #       new file:   README.md
    #

这里我是添加了一个文件README.md，如果你有很多文件进行了修改可以用

    git add .

*.* 代表了当前目录下所有被修改的文件

### Step 3: commit修改
现在文件已经到了缓存区了，然后我们需要把对修改做commit。commit的意义是说，本次修改我修改了哪些文件，我为什么要做这些修改。

    user@APCNSHALB7004 /c/Michael/test/tutorial (master)
    $ git commit -m "[init]generate readme.md"
    [master (root-commit) 763e081] [init]generate readme.md
     0 files changed
     create mode 100644 README.md

*git commit -m "[init]generate readme.md"* 命令中 *-m* 代表了所有被提交到缓存区修改的文件，一般我们也会用 *-am* 她显示性的标示了对所有修改文件。后面冒号中间的文字是commit记录，描述我们这里做了什么修改。

这时候我们在用 *git status*` 已经看不到被修改的文件了。修改的文件已经被提交到本地记录了

    user@APCNSHALB7004 /c/Michael/test/tutorial (master)
    $ git status
    # On branch master
    nothing to commit, working directory clean

### Step 4: 查看修改
修改提交本地仓库之后，我们可以用 *git log*` 去查看提交的修改

    user@APCNSHALB7004 /c/Michael/test/tutorial (master)
    $ git log
    commit 763e0814975cb4fb4c4aa10950f8d69bd644beb3
    Author: Michael.Lee <chunmin.li@sh.leoburnett.com>
    Date:   Mon Mar 11 14:19:26 2013 +0800

        [init]generate readme.md

