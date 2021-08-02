---
layout: post
title:  "Worst code I saw this week"
date:   2021-07-29 10:00:00 +0700
categories: [cli]
---

Part of my startup work this week as base64 encoding a credentials and dumping it in a config file. Here's 
how the docs suggested I do that:

```javascript
node -e "require('readline').createInterface({input:process.stdin,output:process.stdout, historySize:0})
    .question('PAT> ',p => { b64=Buffer.from(p.trim()).toString('base64'); console.log(b64); process.exit(); })"
```

The code itself is fine. I assume. I don't known. I haven't used node.

It's not bad code. It's just the completely wrong tool. node is someone's hammer and they've banged in against the base64 nail. 
Please consider using old boring tools (sorry gnu coreutils I mean this in the best way)

1. They're great
2. They're very fast
3. <strong>They're already installed</strong> <small>(maybe less so on windows sorry)</small>

```shell
echo "WHAT YOU WANT ENCODED" > tmp
base64 tmp
rm tmp
```

How much faster? Here it is in node:
```javascript
time echo "WHAT YOU WANT ENCODED" | 
    node -e "require('readline').createInterface({input:process.stdin,output:process.stdout, historySize:0}).question('PAT> ',p => { b64=Buffer.from(p.trim()).toString('base64'); console.log(b64); process.exit(); })"
________________________________________________________
Executed in   65.69 millis    fish           external
usr time   43.59 millis  167.00 micros   43.42 millis
sys time   17.24 millis  830.00 micros   16.41 millis
```

And in gnu coreutil's base64

```shell
time echo "WHAT YOU WANT ENCODED" > tmpp && base64 tmpp && rm tmpp
________________________________________________________
Executed in    1.06 millis    fish           external
   usr time   28.00 micros   28.00 micros    0.00 micros
   sys time  978.00 micros  978.00 micros    0.00 micros
```

That's 65x. 

Oh and what about size on disk?

```shell
du -h /usr/local/bin/node
 45M	/usr/local/bin/node
du -h /usr/bin/base64
 16K	/usr/bin/base64
```

Obviously it doesn't matter for a one-off encoding but the principle is important. 
Use the simplest too you can. Your favorite tool isn't the best tool.