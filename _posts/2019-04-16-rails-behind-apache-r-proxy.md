---
layout: post
title:  "Running rails behind apache with a reverse proxy"
date:   2019-04-16 06:20:00 +0700
categories: [Rails, Apache]
---

I suspect many people don't have this problem but I ran into it so I thought I'd document it. In order to minimize my AWS bill I wanted to run a website built in rails (this one!) on the same AWS instance that was already running apache. So if you need to do the same here's what you do:

Run your rails app on a port other than port 80, anything works even if it's not exposed to the public. The traffic will flow like this:

<pre>
User -> Port (80) -> Apache -> Port (xyz) --> Rails
</pre>

First you'll need to install the necessary apache modules
{% highlight bash %}
a2enmod proxy proxy_ajp proxy_http rewrite deflate headers proxy_balancer proxy_connect proxy_html
{% endhighlight %}
Then, add a virtual host in your /etc/apache2/sites-enabled/something-something.conf file or wherever you specify your virtual hosts.
It should look like this:

{% highlight apache %}

<VirtualHost *:80> 
     ProxyPreserve
    Host On 
    Redirect permanent / https://www.n8ta.com/ # Forward to https 
    ServerName site.com 
    ServerAlias www.site.com 
</VirtualHost> # and a second for ssl, 
<VirtualHost *:443> 
     ProxyPreserveHost On 
     ProxyPass / http://0.0.0.0:3000/ # apache --> rails connection is not secured as it's local to the machine 
     ProxyPassReverse / http://0.0.0.0:3000/ 
     ServerName site.com 
     ServerAlias www.site.com 
     SSLEngine on 
     SSLCertificateFile /path/to/a.crt 
     SSLCertificateKeyFile /path/to/a.key 
</VirtualHost>

{% endhighlight %}

Restart apache with

{% highlight bash %}
service apache2 restart
{% endhighlight %}
or whatever tool you use to manage services.

And you're golden, you now have a rails app and an apache server running simultaneously. 