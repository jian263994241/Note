	# Gitlab 客户端配置引导
*********************************

This is File written in Chinese. If you cannot read, please refer to this article <https://help.github.com/articles/generating-ssh-keys>.
Or just call me, Michael.Lee (leewind19841209@gmail.com)

### 1. 安装Git客户端

在Window下有几款Git客户端工具，我比较常用的是msysGit中的Git Bash， 可以用命令行进行操作。
但是询问了公司里面，大家对于命令行控制都不是很熟悉，那么可以尝试一下Git的可视化工具。具体请参考下面两篇文章：

[Windows下的git工具msysGit](http://wangheng.org/windows%E4%B8%8B%E7%9A%84git%E5%B7%A5%E5%85%B7msysgit.html)
[windows中使用Git工具连接GitHub(配置篇)](http://www.cnblogs.com/sorex/archive/2011/08/10/2132359.html)

### 2. 客户端生成SSH Key

**Step 1** 进入Git客户端之后，查看是否有.ssh目录

    cd ~/.ssh
    # Checks to see if there is a directory named ".ssh" in your user directory

**Step 2** 移除和备份现有的SSH key

    ls
    # Lists all the subdirectories in the current directory
    # config  id_rsa  id_rsa.pub  known_hosts

如果查看目录发现没有.pub文件请直接跳转到Step 3

    mkdir key_backup
    # Makes a subdirectory called "key_backup" in the current directory


    cp id_rsa* key_backup
    # Copies the id_rsa keypair into key_backup


    rm id_rsa*
    # Deletes the id_rsa keypair

**Step 3** 生成新的SSH Key

生成Key：

    ssh-keygen -t rsa -C "your_email@youremail.com"
    # Creates a new ssh key using the provided email

    # Generating public/private rsa key pair.
    # Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]

设置密码

    # Enter passphrase (empty for no passphrase): [Type a passphrase]
    # Enter same passphrase again: [Type passphrase again]

期望出现的结果

    Your identification has been saved in /c/Users/you/.ssh/id_rsa.
    # Your public key has been saved in /c/Users/you/.ssh/id_rsa.pub.
    # The key fingerprint is:
    # 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@youremail.com

**Step 4** 查看公钥

进入`C:\Users\(Username)\.ssh`，用txt打开id_rsa.pub，会看到类似下面的内容：

    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAoI6o/ODW3nJtU37V2oKbJF+v481Ol0LLKeYGq4iamiM6lFD73cyHFd/ztEc4gYwEpxWYPnHlkVugMjh1ym6LVesn6tiCbqTWjAnoin5v7ugBFZ5iGhcCyrh87MWZpTI2VqXeRhIh4QkBtJpLn701/YUse3W0p1IL1uNOFAdfasdfadfasdfasfdsafwgRq1YJpnbPjtYUBiGwNiMMxXoXGMElE0H9x/OnV+JzYLn0wFOCrakMoR9x7kJyW0sSwpzi/p70tbzSCziz9v9NpzkmBjBg+eOfHYA7TjZF/n8kqpMFcQP9uDa4lJIAtSfgZoJ6062kXeAIQ== chunmin.li@sh.leoburnett.com

将这些内容复制到剪贴板，后面需要添加到Gitlab账号中去


**Step 5** 将生成的Key添加到Gitlab你的账号中去

1. 登录gitlab<http://lbsvn01.hk.leoburnett.com:8080/>，输入用户名和密码进行登录
2. 在Dashboard中点击右上角Search框左边的人头(Your Profile),进入用户设置
3. 在(Your Profile)中点击SSH Keys
4. 点击'Add New'按钮，将Step 4中复制的内容，黏贴在这里，然后保存

**Step 6** 测试账号是否成功

用下面的命令对账号的设置进行测试

    ssh -T git@lbsvn01.hk.leoburnett.com

会看到类似如下的结果

    Enter passphrase for key '/c/Users/Danny/.ssh/id_rsa':
    hello chunmin_li_sh_leoburnett_com_1359712768, this is git@lbsvn01 running gitolite3 v3.2-gitlab-patched-0-g2d29cf7 on git 1.7.4.1

     R W    leewind/leewind-project-note
     R W    leewind/leo-project-gpc
     R W    testing

到这里所有的配置都做完了，关于Git命令如何时候，请查看git.md
另外非常推荐一篇简易的入门指南：<http://rogerdudler.github.com/git-guide/index.zh.html>


# Gitlab操作
*****************************

### 添加和配置Project

**Step 1** 创建Project

进入用户Dashboard之后，点击右上角搜索框左侧加号按钮(Create New Project)，输入Project名之后创建Project

**Step 2** init project

创建完Project之后，会出现项目引导页，按照其中内容进行配置

Try it！
