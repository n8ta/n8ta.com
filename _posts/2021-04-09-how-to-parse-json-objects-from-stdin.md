---
layout: post 
title:  "How to parse a series of json objects from stdin or another string in python3"
date:   2021-04-09 10:00:00 +0700
categories: [python3,python,json]
---

If you need to handle a series of JSON objects (NOT a JSON array) from stdin or some other stream you'll need to use a
less common method of parsing json than pythons `json.loads(str)`

Let's say your input looks like this {% highlight json %} {"somekey": 5,  "more": [1,2,3]} 5
"a string"
{"somekey2":
123,} {% endhighlight %}

You need to parse a variety of json objects but you don't know how many there will be. We're going to
use [raw_decode](https://docs.python.org/3/library/json.html#json.JSONDecoder.raw_decode) from python3's json
implementation.

<table border="2" cellpadding="10">
<thead>
    <th></th>
    <th><code>loads</code></th>
    <th><code>raw_decode</code></th>
</thead>
<tbody>
<tr>
    <td>Accepts</td>
    <td>str</td>
    <td>str</td>
</tr>
<tr>
    <td>Returns</td>
    <td>parsed json</td>
    <td>parsed json<br/>index the json object ended at</td>
</tr>
<tr>
    <td>Extra chars at the end?</td>
    <td><code>json.decoder.JSONDecodeError</code></td>
    <td>No</td>
</tr>
</tbody>
</table>

{% highlight python 3%}
from json import JSONDecoder
import sys
# All objects we find
json_found = []  
# raw_decode expects byte1 to be part of a JSON, so remove whitespace from left
stdin = sys.stdin.read().lstrip()
decoder = JSONDecoder()

while len(stdin) > 0:

    # parsed_json, number of bytes used
    parsed_json, consumed = decoder.raw_decode(stdin)
    # Remove bytes that were consumed in this object ^ 
    stdin = stdin[consumed:]
    # Save this parsed object
    json_found.append(parsed_json)
    # Remove any whitespace before the next JSON object
    stdin = stdin.lstrip()

print(json_found)
{% endhighlight %}

So let's try it out

```shell
echo "{\"content\": 5}4" | python3 run
> [{'content': 5}, 4]
```

[LGTM](https://www.dictionary.com/e/acronyms/lgtm/)