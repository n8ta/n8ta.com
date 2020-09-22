---
layout: post
title:  "5 Easy Ways to Secure Wordpress"
date:   2019-05-06 06:20:00 +0700
categories: [Wordpress]
---

Wordpress powers something like 25% of the internet. This means that there are approximately a jazillion bots out there trolling wordpress sites for vulnerabilities. 

Here are 5 easy things you can do to secure your installation.

### 1. Use an SSL certificate

SSL certificates are what make secure HTTP possible (that nice green padlock thing ya?). You're going to need one to run a website on  the modern web. Luckily I have a guide for you:
<a href='/ssl/2019/05/02/free-ssl-certs.html'>Free automatically renewing SSL certificates</a>

As for setting up those certificates with your webserver after you obtain them checkout <a href='https://www.digicert.com/csr-ssl-installation/apache-openssl.htm'>part II to this guide.</a>

Certs are configured at the webserver level not the application level so you're going to be dividing into apache/nginx/? whatever web server you run.

### 2. Disable xmlrpc
xmlrpc is a way for different applications to communicate with your wordpress site. I won't go into it here but unless you're active using it, it should be turned off. It allows for much easier automated attacks of your site.

You can easily disable it with a plugin, here are a few:
<a href='https://wordpress.org/plugins/disable-xml-rpc/'>disable-xml-rpc</a>
<a href='https://wordpress.org/plugins/remove-xmlrpc-pingback-ping/'>remove-xmlrpc-pingback</a>
<a href=https://wordpress.org/plugins/search/xml-rpc/'>And many more...</a>

Alternatively if you're running apache you can use the .htaccess file in your root directory by adding:

{% highlight apache %}
<Files xmlrpc.php>
    order allow,deny
    deny from all
</Files>
{% endhighlight %}

### 3. Changing the default wp-login.php

There are plenty of bots checking for a /wp-login.php path and then hitting it with user/pass guesses until something sticks. The easiest way to avoid this is changing the default login path.

I use the plugin <a href='https://wordpress.org/plugins/better-wp-security/'>iTheme's Security</a>.

To setup the plugin simply install as you normally would, open the plugin from the left panel, select advanced, select "Hide the Backend", then "Enable this Feature", and select your new login path. Save. Now you will login by going to mysite.com/custom-slug instead of mysite.com/custom-slug. This change will also forward anyone who attempts to reach /wp-admin to /404.
### 4. Update!
That's all. Update your Wordpress core installation (and to a lesser extent plugins) whenever a new version comes out.

### 5. Regular Automated Backups

Everyone's lazy and backing up by hand is simply not going to happen. So let's automate out backups just in case. I find myself using backups mostly to fix my own mistakes but they are also helpful if a malicious actor takes over your website. They allow you to easily redeploy an exact copy of your site elsewhere.

I use <a href='https://wordpress.org/plugins/all-in-one-wp-migration/'>All-in-One WP Migration</a>. It exports your entire site (themes, plugins, media, posts, comments, everything) into a single file you can download. 

(Premium) Even better than downloading it manually you can configure it to backup to S3, Google Drive, Box, and a few dozen other places. That way you can have daily, weekly, monthly, or whenever backups. I also run manual backups before I update plugins or wordpress itself to provide an easy way to rollback any issues quickly.  This is part of the premium plugin which costs $100. Well worth it in my view. I have this deployed on all of my wp sites running regular backups to gdrive.

