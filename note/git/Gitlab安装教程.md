 # Gitlab安装教程

本文参考了<https://github.com/nielsbasjes/gitlab-recipes/blob/master/install/CentOS_6.md>

### installation guide for centos 5.9 

这里的安装教程是我在我们的Server http://lbsvn01.hk.leoburnett.com 布置gitlab时采用的安装记录

### 1. 打开公钥认证
Git采用了SSH的公钥认证，在gitlab上配置gitolite的公钥认证，可以避免在访问时不断的键入密码。
我们的Server已经配置了OpenSSH-Server，但是把公钥认证给禁止了，所以首先的任务是打开公钥认证。

    //打开sshd的配置文件
    vim /etc/ssh/sshd_config

开启如下的配置：

    RSAAuthentication yes # 启用 RSA 认证 
    PubkeyAuthentication yes # 启用公钥认证 

具体的公钥认证的内容，请参考这篇文章：<http://tech.idv2.com/2006/10/21/ssh-rsa-auth/>

### 2. 配置系统，安装类库

安装Development工具

    // 登录Root
    sudo su
    yum -y groupinstall 'Development Tools'

'Additional Development'

    yum -y install vim-enhanced httpd readline readline-devel ncurses-devel gdbm-devel glibc-devel \
                   tcl-devel openssl-devel curl-devel expat-devel db4-devel byacc \
                   sqlite-devel gcc-c++ libyaml libyaml-devel libffi libffi-devel \
                   libxml2 libxml2-devel libxslt libxslt-devel libicu libicu-devel \
                   system-config-firewall-tui python-devel redis sudo mysql-server wget \
                   mysql-devel crontabs logwatch logrotate sendmail-cf qtwebkit qtwebkit-devel \
                   perl-Time-HiRes

更新CentOS系统

    yum -y update

### 3. 安装Ruby

以Root状态登录，下载ruby之后编译安装

    mkdir /tmp/ruby && cd /tmp/ruby
    wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p327.tar.gz
    tar xfvz ruby-1.9.3-p327.tar.gz
    cd ruby-1.9.3-p327
    ./configure
    make
    make install

安装Bundler Gem:

    gem install bundler

### 4. 安装2.7版本的python

CentOS系统里的Python是2.4版本的，版本太低，会导致最后gitlab无法显示的Bug，所以需要升级到2.7
这里的升级必须是手动完成，因为在yum列表里只允许2.4版本

    mkdir /tmp/python && cd /tmp/python
    wget http://www.python.org/ftp/python/2.7.2/Python-2.7.2.tgz
    tar xfvz Python2.7.2.tgz 
    cd Python2.7.2 
    ./configure
    make
    make install

安装完成之后查看路径：

    /usr/local/bin/python2.7 -V 

建立link

    mv /usr/bin/python /usr/bin/python.bak （或者rm -rf /usr/bin/python） 
    ln -s /usr/local/bin/python2.7 /usr/bin/python 

关于Python在CentOS的安装请参考<http://myhat.blog.51cto.com/391263/788552>

### 5. 添加系统用户

以Root状态登录

    adduser \
      --system \
      --shell /bin/bash \
      --comment 'Git Version Control' \
      --create-home \
      --home-dir /home/git \
      git

    adduser \
      --shell /bin/bash \
      --comment 'GitLab user' \
      --create-home \
      --home-dir /home/gitlab \
      gitlab

    usermod -a -G git gitlab 

为Gitlab添加密码

    passwd gitlab # 这里我的密码选择了leo@123

生成SSH KEY

    sudo -u gitlab -H ssh-keygen -q -N '' -t rsa -f /home/gitlab/.ssh/id_rsa

### 6. 安装Gitolite

Clone Gitolite的代码

    cd /home/git
    sudo -u git -H git clone -b gl-v320 https://github.com/gitlabhq/gitolite.git /home/git/gitolite

将Gitlab设置为Gitolite的Admin

    # Add Gitolite scripts to $PATH
    sudo -u git -H mkdir /home/git/bin
    sudo -u git -H sh -c 'printf "%b\n%b\n" "PATH=\$PATH:/home/git/bin" "export PATH" >> /home/git/.profile'
    sudo -u git -H sh -c 'gitolite/install -ln /home/git/bin'

    # Copy the gitlab user's (public) SSH key ...
    cp /home/gitlab/.ssh/id_rsa.pub /home/git/gitlab.pub
    chmod 0444 /home/git/gitlab.pub

    # ... and use it as the admin key for the Gitolite setup
    sudo -u git -H sh -c "PATH=/home/git/bin:$PATH; gitolite setup -pk /home/git/gitlab.pub"

修改gitolite Direcotry的权限

    # Make sure the Gitolite config dir is owned by git
    chmod 750 /home/git/.gitolite/
    chown -R git:git /home/git/.gitolite/

修改repositories的权限

    # Make sure the repositories dir is owned by git and it stays that way
    chmod -R ug+rwXs,o-rwx /home/git/repositories/
    chown -R git:git /home/git/repositories/

    # Make sure the gitlab user can access the required directories
    chmod g+x /home/git

配置使gitlab可以操作git

    su - gitlab
    ssh git@localhost  # type 'yes' and press <Enter>.

做个Test看看是否可以Clone

    # Clone the admin repo so SSH adds localhost to known_hosts ...
    # ... and to be sure your users have access to Gitolite
    git clone git@localhost:gitolite-admin.git /tmp/gitolite-admin

    # If it succeeded without errors you can remove the cloned repo
    rm -rf /tmp/gitolite-admin

### 7. 安装Gitlab

    # We'll install GitLab into home directory of the user "gitlab"
    cd /home/gitlab

Clone Gitlab的source

    # Clone GitLab repository
    git clone https://github.com/gitlabhq/gitlabhq.git gitlab

    # Go to gitlab dir 
    cd /home/gitlab/gitlab

    # Checkout to stable release
    git checkout 4-0-stable

对gitlab做一系列的Config

    cp /home/gitlab/gitlab/config/gitlab.yml{.example,}
    vim /home/gitlab/gitlab/config/gitlab.yml

把所有的localhost全部换成lbsvn01.hk.leoburnett.com

    cp /home/gitlab/gitlab/config/unicorn.rb{.example,}
    vim /home/gitlab/gitlab/config/unicorn.rb

加入下面的配置

    listen "127.0.0.1:3000"  # listen to port 3000 on the loopback interface

Gitlab DB Setting

    cp /home/gitlab/gitlab/config/database.yml{.mysql,}
    vim /home/gitlab/gitlab/config/database.yml

需要根据Mysql来配置

    username: kelvin_ngai
    password: 'Welcome1'

安装Gem

    //退出Gitlab
    logout
    cd /home/gitlab/gitlab
    gem install charlock_holmes --version '0.6.9'

    su - gitlab
    cd /home/gitlab/gitlab
    bundle install --deployment --without development test postgres

配置Git

    git config --global user.name "GitLab"
    git config --global user.email "gitlab@localhost"

设置Gitlab Hooks

    //退出Gitlab
    logout

    cd /home/gitlab/gitlab
    cp ./lib/hooks/post-receive /home/git/.gitolite/hooks/common/post-receive
    chown git:git /home/git/.gitolite/hooks/common/post-receive

初始化Database

    su - gitlab
    cd /home/gitlab/gitlab
    bundle exec rake gitlab:app:setup RAILS_ENV=production

将Gitlab加入到开机启动

    logout

    curl https://raw.github.com/gitlabhq/gitlab-recipes/4-0-stable/init.d/gitlab > /etc/init.d/gitlab
    chmod +x /etc/init.d/gitlab
    chkconfig --add gitlab

    chkconfig gitlab on

    service gitlab start
    # or
    /etc/init.d/gitlab start

检查

    su - gitlab

    cd /home/gitlab/gitlab
    bundle exec rake gitlab:env:info RAILS_ENV=production

    cd /home/gitlab/gitlab
    bundle exec rake gitlab:check RAILS_ENV=production

### 8. 配置Apache    

添加Gitlab端口和虚拟主机

    vim /etc/httpd/conf.d/gitlab.conf

    <VirtualHost *:8080>
      ServerName git.example.org
      ProxyRequests Off
        <Proxy *>
           Order deny,allow
           Allow from all
        </Proxy>
        ProxyPreserveHost On
        ProxyPass / http://localhost:3000/
        ProxyPassReverse / http://localhost:3000/
    </VirtualHost>

### 9. 配置Firewall

    vim /etc/sysconfig/iptables

参考80端口准入，添加8080端口准入。然后重启Server。

### DONE！

登录一下http://lbsvn01.hk.leoburnett.com:8080

    admin@local.host
    5iveL!fe

### Problems Shooting
#### Error: 
    rake aborted!
    Don't know how to build task 'sidekiq:start'
官方文档里面给出来的gitlab init文件是有问题的，需要修正，参考下面的链接
https://github.com/gitlabhq/gitlabhq/issues/2535

#### Error:
    redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED
如果设置的出口链接不是标准的80端口并且用的是redis-server的话要确保server已经起来，参考下面的链接
http://stackoverflow.com/questions/8754304/redis-connection-to-127-0-0-16379-failed-connect-econnrefused

#### Error:
    ActionView::Template::Error (Failed to get header.):
        9:   .file_content.code
        10:     - unless blob.empty?
        11:       %div{class: user_color_scheme_class}
        12:         = raw blob.colorize(formatter: :gitlab)
        13:     - else
        14:       %p.nothing_here_message Empty file
        app/models/tree.rb:5:in `colorize'
    app/views/tree/blob/_text.html.haml:12:in `_app_views_tree_blob__text_html_haml__1063309510_90180980'
    app/views/tree/_blob.html.haml:9:in `_app_views_tree__blob_html_haml__119734296_85276730'
    app/views/tree/_tree.html.haml:15:in `_app_views_tree__tree_html_haml__378628332_84882990'
    app/views/tree/show.js.haml:3:in `_app_views_tree_show_js_haml___475206472_100979370'
这个问题只出现在CentOS 5里面，参考下面的链接进行的修改
    https://github.com/gitlabhq/gitlabhq/issues/1774
把Python2.4升级到2.7参考下面的文章：
    http://myhat.blog.51cto.com/391263/788552