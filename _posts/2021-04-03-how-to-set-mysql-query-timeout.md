---
layout: post
title:  "How to setup a query timeout for mysql 5.7 on Ubuntu 18.04"
date:   2021-04-03 10:00:00 +0700
categories: [ethics]
---

- Warning: This can cause long running `mysqldump` commands to stop too soon.

Open up `/etc/mysql/mysql.conf.d/mysqld.cnf` and add a `max_execution_time` line to the mysqld section
{% highlight yaml %}
# /etc/mysql/mysql.conf.d/mysqld.cnf

[mysqld]
# 
# * Basic Settings
#
user            = mysql
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
port            = 3306
basedir         = /usr
datadir         = /var/lib/mysql
tmpdir          = /tmp
lc-messages-dir = /usr/share/mysql
skip-external-locking
max_execution_time = 30000 <---- 30s
{% endhighlight %}

In general this file is loaded because
`/etc/mysql/my.cnf` includes it. 

`/etc/mysql/conf.d/` is client settings 

`/etc/mysql/mysql.conf.d/` is server settings (like timeout).
{% highlight yaml %}
# /etc/mysql/my.cnf

# The MySQL database server configuration file.
#
# ...
#
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/ <---
{% endhighlight %}

I like this because occassionally some user will come up with an API request that triggers a query which takes hours and this will lockup the whole
server until I fix it manually.