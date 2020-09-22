---
layout: post
title:  "Free SSL Certificates with Let's Encrypt"
date:   2019-05-03 06:20:00 +0700
categories: [SSL]
---

SSL certificates can cost anywhere from $12-$100s of dollars a year, and since you can now get them for free I don't see a great reason to buy them.

In this guide I'm going to be assuming that you have your own web server setup that you can figure to look in an arbitrary directory for SSL certs / keys. I'm also going to be assuming you've purchased a domain name and added an A record (or similar) pointing at your ip.

We're going to setup automatically renewing SSL certificates with Lego a cli get certs, and cron to automatically run lego.

I'm going to be doing this on a basic aws linux instance running Amazon Linux V2, which uses the yum package manager. Things should be fairly similar running Ubuntu/Debian.
### Step 1 - Install the lego binary
Pick your os and architecture and copy the link from this page: <a href='https://github.com/go-acme/lego/releases'>https://github.com/go-acme/lego/releases</a> Then download it, untar it, and move it to your directory of binaries.
{% highlight bash %}
wget FILL_THIS_IN.tar.gz
tar -xvf lego_vX.Y.Z_OS_###.tar.gz
sudo mv lego /usr/bin
{% endhighlight %}

### Step 2 - Setup folders and renewal script
Next head to wherever you want your certs installed, for me that'll be /etc/certs. 
{% highlight bash %}
sudo -s
mkdir /etc/certs
cd /etc/certs/
touch renew.sh
echo "service apache2 stop; lego --email='your-email@servicecom' --domains='www.your_domain.com' --domains='your_domain.com' --path='/etc/certs' renew; service apache2 start;" >> renew.sh
{% endhighlight %}


You'll need to fill in your email and domain. You can add as many --domains='something.com' as you like. I just did the www subdomain and root. You'll also need to change the call to service to whatever service manager you use to turn your webserver off and on (lego temporarily uses port 80 to get certificates so you need to free the port).
### Step 3 - Make the script executable and run it from cron
{% highlight bash %}
chmod +x renew.sh
crontab -e
{% endhighlight %}
crontab will open up an interactive window, in there add :
{% highlight crons %}
0 0 1 * * /etc/certs/renew.sh 2> /dev/null
{% endhighlight %}

This will run the /etc/certs/renew.sh script once a month so they will not expire.

Finally run the same command once with run instead of renew at the end (manually)  and you're all set
{% highlight bash %}
sudo lego --email='your-email@servicecom' --domains='www.your_domain.com' --domains='your_domain.com' --path='/etc/certs<strong>run</strong>
{% endhighlight %}

And you're all set. You should see two new folders:
accounts and certificates in /etc/certs.~~~~