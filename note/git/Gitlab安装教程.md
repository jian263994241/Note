# Gitlab��װ�̳�

���Ĳο���<https://github.com/nielsbasjes/gitlab-recipes/blob/master/install/CentOS_6.md>

### installation guide for centos 5.9 

����İ�װ�̳����������ǵ�Server http://lbsvn01.hk.leoburnett.com ����gitlabʱ���õİ�װ��¼

### 1. �򿪹�Կ��֤
Git������SSH�Ĺ�Կ��֤����gitlab������gitolite�Ĺ�Կ��֤�����Ա����ڷ���ʱ���ϵļ������롣
���ǵ�Server�Ѿ�������OpenSSH-Server�����ǰѹ�Կ��֤����ֹ�ˣ��������ȵ������Ǵ򿪹�Կ��֤��

    //��sshd�������ļ�
    vim /etc/sshd_config

�������µ����ã�

    RSAAuthentication yes # ���� RSA ��֤ 
    PubkeyAuthentication yes # ���ù�Կ��֤ 

����Ĺ�Կ��֤�����ݣ���ο���ƪ���£�<http://tech.idv2.com/2006/10/21/ssh-rsa-auth/>

### 2. ����ϵͳ����װ���

��װDevelopment����

    // ��¼Root
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

����CentOSϵͳ

    yum -y update

### 3. ��װRuby

��Root״̬��¼������ruby֮����밲װ

    mkdir /tmp/ruby && cd /tmp/ruby
    wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p327.tar.gz
    tar xfvz ruby-1.9.3-p327.tar.gz
    cd ruby-1.9.3-p327
    ./configure
    make
    make install

��װBundler Gem:

    gem install bundler

### 4. ��װ2.7�汾��python

CentOSϵͳ���Python��2.4�汾�ģ��汾̫�ͣ��ᵼ�����gitlab�޷���ʾ��Bug��������Ҫ������2.7
����������������ֶ���ɣ���Ϊ��yum�б���ֻ����2.4�汾

    mkdir /tmp/python && cd /tmp/python
    wget http://www.python.org/ftp/python/2.7.2/Python-2.7.2.tgz
    tar xfvz Python2.7.2.tgz 
    cd Python2.7.2 
    ./configure
    make
    make install

��װ���֮��鿴·����

    /usr/local/bin/python2.7 -V 

����link

    mv /usr/bin/python /usr/bin/python.bak ������rm -rf /usr/bin/python�� 
    ln -s /usr/local/bin/python2.7 /usr/bin/python 

����Python��CentOS�İ�װ��ο�<http://myhat.blog.51cto.com/391263/788552>

### 5. ���ϵͳ�û�

��Root״̬��¼

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

ΪGitlab�������

    passwd gitlab # �����ҵ�����ѡ����leo@123

����SSH KEY

    sudo -u gitlab -H ssh-keygen -q -N '' -t rsa -f /home/gitlab/.ssh/id_rsa

### 6. ��װGitolite

Clone Gitolite�Ĵ���

    cd /home/git
    sudo -u git -H git clone -b gl-v320 https://github.com/gitlabhq/gitolite.git /home/git/gitolite

��Gitlab����ΪGitolite��Admin

    # Add Gitolite scripts to $PATH
    sudo -u git -H mkdir /home/git/bin
    sudo -u git -H sh -c 'printf "%b\n%b\n" "PATH=\$PATH:/home/git/bin" "export PATH" >> /home/git/.profile'
    sudo -u git -H sh -c 'gitolite/install -ln /home/git/bin'

    # Copy the gitlab user's (public) SSH key ...
    cp /home/gitlab/.ssh/id_rsa.pub /home/git/gitlab.pub
    chmod 0444 /home/git/gitlab.pub

    # ... and use it as the admin key for the Gitolite setup
    sudo -u git -H sh -c "PATH=/home/git/bin:$PATH; gitolite setup -pk /home/git/gitlab.pub"

�޸�gitolite Direcotry��Ȩ��

    # Make sure the Gitolite config dir is owned by git
    chmod 750 /home/git/.gitolite/
    chown -R git:git /home/git/.gitolite/

�޸�repositories��Ȩ��

    # Make sure the repositories dir is owned by git and it stays that way
    chmod -R ug+rwXs,o-rwx /home/git/repositories/
    chown -R git:git /home/git/repositories/

    # Make sure the gitlab user can access the required directories
    chmod g+x /home/git

����ʹgitlab���Բ���git

    su - gitlab
    ssh git@localhost  # type 'yes' and press <Enter>.

����Test�����Ƿ����Clone

    # Clone the admin repo so SSH adds localhost to known_hosts ...
    # ... and to be sure your users have access to Gitolite
    git clone git@localhost:gitolite-admin.git /tmp/gitolite-admin

    # If it succeeded without errors you can remove the cloned repo
    rm -rf /tmp/gitolite-admin

### 7. ��װGitlab

    # We'll install GitLab into home directory of the user "gitlab"
    cd /home/gitlab

Clone Gitlab��source

    # Clone GitLab repository
    git clone https://github.com/gitlabhq/gitlabhq.git gitlab

    # Go to gitlab dir 
    cd /home/gitlab/gitlab

    # Checkout to stable release
    git checkout 4-0-stable

��gitlab��һϵ�е�Config

    cp /home/gitlab/gitlab/config/gitlab.yml{.example,}
    vim /home/gitlab/gitlab/config/gitlab.yml

�����е�localhostȫ������lbsvn01.hk.leoburnett.com

    cp /home/gitlab/gitlab/config/unicorn.rb{.example,}
    vim /home/gitlab/gitlab/config/unicorn.rb

�������������

    listen "127.0.0.1:3000"  # listen to port 3000 on the loopback interface

Gitlab DB Setting

    cp /home/gitlab/gitlab/config/database.yml{.mysql,}
    vim /home/gitlab/gitlab/config/database.yml

��Ҫ����Mysql������

    username: kelvin_ngai
    password: 'Welcome1'

��װGem

    //�˳�Gitlab
    logout
    cd /home/gitlab/gitlab
    gem install charlock_holmes --version '0.6.9'

    su - gitlab
    cd /home/gitlab/gitlab
    bundle install --deployment --without development test postgres

����Git

    git config --global user.name "GitLab"
    git config --global user.email "gitlab@localhost"

����Gitlab Hooks

    //�˳�Gitlab
    logout

    cd /home/gitlab/gitlab
    cp ./lib/hooks/post-receive /home/git/.gitolite/hooks/common/post-receive
    chown git:git /home/git/.gitolite/hooks/common/post-receive

��ʼ��Database

    su - gitlab
    cd /home/gitlab/gitlab
    bundle exec rake gitlab:app:setup RAILS_ENV=production

��Gitlab���뵽��������

    logout

    curl https://raw.github.com/gitlabhq/gitlab-recipes/4-0-stable/init.d/gitlab > /etc/init.d/gitlab
    chmod +x /etc/init.d/gitlab
    chkconfig --add gitlab

    chkconfig gitlab on

    service gitlab start
    # or
    /etc/init.d/gitlab start

���

    su - gitlab

    cd /home/gitlab/gitlab
    bundle exec rake gitlab:env:info RAILS_ENV=production

    cd /home/gitlab/gitlab
    bundle exec rake gitlab:check RAILS_ENV=production

### 8. ����Apache    

���Gitlab�˿ں���������

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

### 9. ����Firewall

    vim /etc/sysconfig/iptables

�ο�80�˿�׼�룬���8080�˿�׼�롣Ȼ������Server��

### DONE��

��¼һ��http://lbsvn01.hk.leoburnett.com:8080

    admin@local.host
    5iveL!fe

### Problems Shooting
#### Error: 
    rake aborted!
    Don't know how to build task 'sidekiq:start'
�ٷ��ĵ������������gitlab init�ļ���������ģ���Ҫ�������ο����������
https://github.com/gitlabhq/gitlabhq/issues/2535

#### Error:
    redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED
������õĳ������Ӳ��Ǳ�׼��80�˿ڲ����õ���redis-server�Ļ�Ҫȷ��server�Ѿ��������ο����������
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
�������ֻ������CentOS 5���棬�ο���������ӽ��е��޸�
    https://github.com/gitlabhq/gitlabhq/issues/1774
��Python2.4������2.7�ο���������£�
    http://myhat.blog.51cto.com/391263/788552