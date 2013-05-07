## git clone复制git伺服器上项目代码
git的推广和应用与git在开源项目上发挥的作用密切相关。这里不得不提Github，当初连风投都没有想到，这样一个项目会为他们带来如此大的成功，今天，如果你的代码没有在github上开源，要么你是Apple，要么你就是傻B。

前不久有github被买火车票插件搞崩溃的事件，以此引发了黑客对于github的兴趣，最近对于github的DooS攻击非常多。当然这些都题外话。这里我们要讲的是，如何从像github这样的git代码伺服器去获取代码。

*********************************

这里以我们以Bootstrap为例：

### Step 1: 获取项目地址

访问bootstrap在github上的代码开源页面：[https://github.com/twitter/bootstrap](https://github.com/twitter/bootstrap)

页面正中有一个Git Read-Only的链接，复制这个链接，(https://github.com/twitter/bootstrap.git)。这个链接就是我们说的项目代码地址。

### Step 2: clone代码到本地

在本地电脑上面打开git bash，然后进入到你准备存放项目的目录中。

用git clone复制项目到本地

    git clone https://github.com/twitter/bootstrap.git

然后git就会在本地创建一个bootstrap的目录，将代码都复制到这个目录下面，这个过程可能会很长，这个根据具体的项目代码大小和网络情况而定。clone命令之后的界面反馈参考下面的内容：

    user@APCNSHALB7004 /c/Michael/test
    $ git clone https://github.com/twitter/bootstrap.git
    Cloning into 'bootstrap'...
    remote: Counting objects: 31691, done.
    remote: Compressing objects: 100% (11159/11159), done.
    remote: Total 31691 (delta 22360), reused 29354 (delta 20333)
    Receiving objects: 100% (31691/31691), 26.15 MiB | 40 KiB/s, done.
    Resolving deltas: 100% (22360/22360), done.

这里复制创建的目录是跟项目名称一致的，也可以通过命令制定目录

    git clone address targetFolder

    // 在这里就是，我们假设要复制到demo的文件夹中
    git clone https://github.com/twitter/bootstrap.git demo

然后就看到项目被复制到demo文件夹了

    user@APCNSHALB7004 /c/Michael/test
    $ git clone https://github.com/twitter/bootstrap.git demo
    Cloning into 'demo'...

关于git clone命令的一系列其他的参数请查看[官方文档](https://www.kernel.org/pub/software/scm/git/docs/git-clone.html)

推荐一个国内的git代码伺服器[gitcafe](https://gitcafe.com)，现在用的人不多，在内测阶段，私人项目也是完全免费的。我个人很喜欢，支持国产！

*********************************

### [补充内容]Git project address

在Github上的代码地址是经过处理的，如果是个人搭建的git server遵循ssh的登陆规则：

    username@host:/path/to/repository