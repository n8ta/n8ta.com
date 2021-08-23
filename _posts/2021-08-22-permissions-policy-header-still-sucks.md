---
layout: post
title:  "The Permissions-Policy header still sucks; it's been 3 years"
date:   2021-08-23 10:00:00 +0800
categories: [http]
---

The HTTP header permissions policy (formerly feature-policy) controls what "features" the page can use. Eg. USB, accelerometer, battery, camera...

The most secure permissions policy header looks like this:

<code> 
Feature-Policy: accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; camera 'none'; display-capture 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport 'none'; fullscreen 'none'; gamepad 'none'; geolocation 'none'; gyroscope 'none'; layout-animations 'none'; legacy-image-formats 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; navigation-override 'none'; oversized-images 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-get 'none'; speaker-selection 'none'; sync-xhr 'none'; unoptimized-images 'none'; unsized-media 'none'; usb 'none'; vibrate 'none'; vr 'none'; screen-wake-lock 'none'; web-share 'none'; xr-spatial-tracking 'none';
</code>

Yuck!

And it's not even teh complete. This example will be obsolete once google shoves a new feature through w3c and we all need to disable the new
`intra-ocular-laser` feature.

Please give us a

<code>
Feature-Policy: default 'none'
</code>

Lo and behold my idea isn't original. Someone suggested the same thing 3 years ago.
I have no idea how these things are standardized but maybe upvoting the first post here will help:

[github.com/w3c/webappsec-permissions-policy/issues/189](https://github.com/w3c/webappsec-permissions-policy/issues/189)

There are lots of more complicated suggestions the comments. I don't personally see a need for them.
A good default of DENY and a whitelist of features you're actually using seems like a fine approach.

<code>
Feature-Policy: default 'none'; accelerometer: 'self'
</code>

Feel free to shoot me an email if you think I'm wrong.

<br/><br/><br/>
<br/><br/><br/>


PS:

Yes Yes I know this is small potatoes but come on. I realized the problem the first time I setup this header.