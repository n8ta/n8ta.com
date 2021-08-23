---
layout: post
title:  "The Permissions-Policy header still sucks; it's been 3 years"
date:   2021-08-23 10:00:00 +0800
categories: [http]
---

The HTTP header permissions policy (formerly feature-policy) controls what features the page can use. Eg. USB, accelerometer, battery, camera...

The most secure permissions policy header looks like this (apache config): 
<br/>Note: The `=()` is an empty list. It could contain things like `self`, `https://blah.com` to specify who can
use the feature

<code>
Header always set Permissions-Policy "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), gamepad=(), geolocation=(), gyroscope=(), layout-animations=(), legacy-image-formats=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), oversized-images=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), speaker-selection=(), sync-xhr=(), unoptimized-images=(), unsized-media=(), usb=(), vibrate=(), vr=(), screen-wake-lock=(), web-share=(), xr-spatial-tracking=()"
</code>

Yuck!

The worst part is this example will be obsolete once google shoves a new feature through w3c and we all need to disable the new
`intra-ocular-laser` feature.

Please give us a way to specify that the default is to deny the use of a feature.

<code>
Permissions-Policy: default()
</code>

Lo and behold my idea isn't original. Someone suggested the same thing 3 years ago.
I have no idea how these things are standardized but maybe upvoting the first post here will help:

[github.com/w3c/webappsec-permissions-policy/issues/189](https://github.com/w3c/webappsec-permissions-policy/issues/189)

There are lots of more complicated suggestions the comments. I don't personally see a need for them.
A good default of DENY and a whitelist of features you're actually using seems like a fine approach.

<code>
Permissions-Policy: default=(),accelerometer('self')
</code>

Feel free to shoot me an email if you think I'm wrong.

<br/><br/><br/>
<br/><br/><br/>


PS:

Yes Yes I know this is small potatoes and only even comes into play once someone manages to get malicious js running
on your page. But still, the fix is easy, let's do it.