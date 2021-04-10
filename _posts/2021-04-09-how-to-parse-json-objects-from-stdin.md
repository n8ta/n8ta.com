---
layout: post
title:  "How to parse a series of json objects from stdin (or other string) in python3"
date:   2021-03-09 10:00:00 +0700
categories: [python3,python,json]
---

If you need to handle a series of JSON objects (NOT a JSON array) from stdin or some other stream you'll need to use a less 
common method of parsing json than pythons `json.loads(str)`

Let's say your input looks like this
{% highlight json %}
{"somekey": 5,  "more": [1,2,3]}
5
"a string"
{"somekey2": 
  123,}
{% endhighlight %}

You need to parse a variety of json objects but you don't know how many there will be.
We're going to use [raw_decode](https://docs.python.org/3/library/json.html#json.JSONDecoder.raw_decode) from python3's json
implementation.

| |Loads|Raw Decode|
|----|----|----|
|Accepts|str|str or stream|
|Returns|parsed json|parsed json<br/>index the json object ended at
|Throws error on extra bytes|json.decoder.JSONDecodeError: Extra data|No|

{% highlight python 3%}
import json

json_found = [] # All objects we find
stdin = sys.stdin.read().lstrip() # raw_decode expects byte1 to be part of a JSON object
decoder = JSONDecoder() 
while len(stdin) > 0: 
    unmarshalled, consumed = decoder.raw_decode(stdin) # parsed_json, number of bytes used
    stdin = stdin[consumed:] # Remove the parsed bytes from the string to move forward in the string
    found.append(unmarshalled) # Save this parsed object
    stdin = stdin.lstrip() # Remove any whitespace before the next JSON object

{% endhighlight %}
