---
layout: post
title:  "Investigating Bad Certificates (Let's Encrypt Downtime)"
date:   2020-03-01 09:00:00 +0700
categories: [Rails,Security]
---
```apache-conf
AH01909: localhost:443:0 server certificate does NOT include an ID which matches the server name
AH02562: Failed to configure certificate n8ta.com:443:0 (with chain), check /path/to/certificates/n8ta.com.crt
SSL Library Error: error:0906D06C:PEM routines:PEM_read_bio:no start line (Expecting: TRUSTED CERTIFICATE) -- Bad file contents or format - or even just a forgotten SSLCertificateKeyFile?
SSL Library Error: error:140DC009:SSL routines:SSL_CTX_use_certificate_chain_file:PEM lib
```

> tl;dr: if you're using Let's Encrypt and your certificates were scheduled to renewed  (cron in my case) they probably failed to renew and now contain a json error message instead of a cert. openssl is very fairly throwing an error when asked to parse json. 

This morning I discovered apache had failed to start and got some vague messages from the apache error log (above). Something was wrong with 
my certs. To verify openssl was up to date I tried:
```bash
> apt-get update && apt-get upgrade
...
W: GPG error: https://oss-binaries.phusionpassenger.com/apt/passenger xenial Release: 
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 561F9B9CAC40B2F7
...
```
I had a few outdated keys so I updated those
```bash
> sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
```
After that `apt-get update && apt-get upgrade` ran successfully. I restart apache. Still dead in the water same error.
Taking a look at the certs themselves I see:

```bash
> openssl x509 -in n8ta.com.crt
unable to load certificate
139967348754072:error:0906D06C:PEM routines:PEM_read_bio:no start line:pem_lib.c:708:Expecting: TRUSTED CERTIFICATE
```
Hmm so the cert is invalid for some reason. Let's take a look at it manually:

```bash
> cat n8ta.com.crt
{
  "type": "urn:acme:error:serverInternal",
  "detail": "The service is down for maintenance or had an internal error. Check https://letsencrypt.status.io/ for more details."
}
```

That's not a ceritifcate! Let's Encrpyt went down when my cron job to renew certs was running and my certs get filled with json error messages. Ran the script to renew certs and all was well. 
If you're looking for a good solution for free certificates checkout my guide on Let's Encrypt and L(ets)E(ncrypt)GO.
