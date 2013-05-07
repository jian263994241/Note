## 同步数据
git一个重要的功能就是为了团队化工作服务，这就意味着你在修改一个文件的同时，别的同事可能也在修改这个文件。很有可能，在你工作的一小时里，服务器端的代码已经发生了翻天覆地的变化，那么如何去更新代码，如何merge你的修改到最新的版本里面去？这一节将讲述这方面内容。

*******************************************

### 同步本地仓库与服务器仓库代码
同步代码前，首先希望本地的代码--工作区的代码没有被修改过，所有修改应该已经被提交或者保存在stash中。这样不会存在比较冲突。关于如何clean代码或者暂时保存修改到stash会在后面叙述。

进入项目仓库，用*git pull*进行更新

    user@APCNSHALB7004 /c/Michael/source/express (master)
    $ git pull
    remote: Counting objects: 153, done.
    remote: Compressing objects: 100% (58/58), done.
    Receiving objects:  24% (31/129used 108 (delta 67)Receiving objects:  23% (30/129)
    Receiving objects: 100% (129/129), 15.49 KiB, done.
    Resolving deltas: 100% (88/88), completed with 19 local objects.
    From https://github.com/visionmedia/express
       bb29da5..db56361  master     -> origin/master
    From https://github.com/visionmedia/express
     * [new tag]         3.1.0      -> 3.1.0
    Updating bb29da5..db56361
    Fast-forward
     .travis.yml            |   3 +-
     History.md             |  11 ++++
     Readme.md              |   9 +--
     bin/express            |  28 ++++----
     lib/application.js     |   6 +-
     lib/express.js         |   2 +-
     lib/middleware.js      |   2 +-
     lib/request.js         |  34 ++++++----
     lib/response.js        | 100 +++++++++++++++++++----------
     lib/utils.js           |   4 +-
     lib/view.js            |   2 +-
     package.json           |  39 +++++++----
     test/app.engine.js     |  15 +++++
     test/req.subdomains.js |  50 +++++++++++++++
     test/res.location.js   | 171 +++++++++++++++++++++++++++++++++++++++++++++++++
     test/res.redirect.js   | 158 ---------------------------------------------
     test/res.set.js        |  21 ++++++
     17 files changed, 409 insertions(+), 246 deletions(-)
     create mode 100644 test/res.location.js

上面例子我在本地仓库更新express.js的代码，他给出了pull的内容和新增加的tag，更新的branch等等信息

### 合并代码
有一种很普遍的情况，master分支我们作为与服务器的更新通道，本地dev分支作为开发分支。当我们在master分支同步了服务器代码之后，我们需要将dev分支修改的代码合并到master分支里去，或者将master同步的代码合并到dev分支中去，合并操作在这里非常常用。

用*git merge*进行代码的合并

    user@APCNSHALB7004 /c/Michael/source/underscore (dev)
    $ git merge master
    Updating bf657be..252aa3c
    Fast-forward
     index.html            |  17 +-
     package.json          |   2 +-
     test/arrays.js        |   2 +-
     test/collections.js   |  16 +-
     test/functions.js     |   5 +-
     test/objects.js       |  13 +-
     test/vendor/qunit.css |  15 +-
     test/vendor/qunit.js  | 493 ++++++++++++++++++++++++++++++++++----------------
     test/vendor/runner.js | 173 ++++++++++--------
     underscore.js         |  25 ++-
     10 files changed, 507 insertions(+), 254 deletions(-)
    
在这个例子中merge非常的顺利，但是我们常常会遇到代码合并时发生冲突的情况。她是怎么产生的？如何来处理？>>>未完待续